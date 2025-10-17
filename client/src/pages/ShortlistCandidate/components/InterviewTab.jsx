import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useListInterviewsQuery, useUpdateInterviewMutation } from '../../../../app/api/InterviewApi';
import { useCurrentUserQuery, useLazyGetGoogleAuthUrlQuery } from '../../../../app/api/authApi';
import useColorMode from '../../../../hooks/useColorMode';

export default function InterviewTab() {
  const [scope, setScope] = useState('upcoming');
  const { data: interviews = [], isFetching, refetch } = useListInterviewsQuery(scope);
  const { data: currentUser } = useCurrentUserQuery();
  const [triggerGoogleUrl] = useLazyGetGoogleAuthUrlQuery();
  const isGoogleConnected = !!(currentUser && currentUser.googleRefreshToken);
  const [calendarId, setCalendarId] = useState('');
  const [view, setView] = useState('DAY'); // DAY | WEEK | MONTH | AGENDA | YEAR
  const [baseDate, setBaseDate] = useState(() => new Date());
  const [colorMode] = useColorMode();
  const [editing, setEditing] = useState({ open: false, interview: null });
  const [updateInterview] = useUpdateInterviewMutation();
  const [evals, setEvals] = useState([]);
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Automatically use the logged-in user's email as Calendar ID
    if (currentUser?.email) {
      setCalendarId(currentUser.email);
    }
  }, [currentUser?.email]);

  const sorted = useMemo(() => {
    const copy = Array.isArray(interviews) ? [...interviews] : [];
    return copy.sort((a, b) => new Date(a.scheduledStart) - new Date(b.scheduledStart));
  }, [interviews]);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatYmd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
  };

  const computeDatesParam = () => {
    // Google embed supports dates=YYYYMMDD/YYYYMMDD
    const d = new Date(baseDate);
    if (view === 'DAY') {
      const start = formatYmd(d);
      const end = formatYmd(d);
      return `${start}/${end}`;
    }
    if (view === 'WEEK') {
      const day = d.getDay();
      const mondayOffset = (day + 6) % 7; // 0 for Monday
      const start = new Date(d);
      start.setDate(d.getDate() - mondayOffset);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${formatYmd(start)}/${formatYmd(end)}`;
    }
    if (view === 'MONTH') {
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      return `${formatYmd(start)}/${formatYmd(end)}`;
    }
    if (view === 'YEAR') {
      const start = new Date(d.getFullYear(), 0, 1);
      const end = new Date(d.getFullYear(), 11, 31);
      return `${formatYmd(start)}/${formatYmd(end)}`;
    }
    // AGENDA fallback uses month range by default
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return `${formatYmd(start)}/${formatYmd(end)}`;
  };

  const iframeSrc = () => {
    const base = 'https://calendar.google.com/calendar/embed';
    const params = new URLSearchParams();
    params.set('showTitle', '0');
    params.set('showDate', '1');
    params.set('showPrint', '0');
    params.set('showTabs', '0');
    params.set('showCalendars', '0');
    params.set('ctz', tz);
    params.set('src', calendarId);
    // console removed
    // Basic dark styling hints via Google params
    if (colorMode === 'dark') {
      params.set('bgcolor', '%231c1f26');
      params.set('color', '%23ffffff');
    }
    if (view === 'AGENDA' || view === 'YEAR') {
      params.set('mode', 'AGENDA');
      params.set('dates', computeDatesParam());
    } else if (view === 'DAY') {
      params.set('mode', 'DAY');
      params.set('dates', computeDatesParam());
    } else if (view === 'WEEK') {
      params.set('mode', 'WEEK');
      params.set('dates', computeDatesParam());
    } else if (view === 'MONTH') {
      params.set('mode', 'MONTH');
      params.set('dates', computeDatesParam());
    }
    return `${base}?${params.toString()}`;
  };

  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm dark:text-gray-200">View</label>
          <select
            className="rounded border p-1 text-sm dark:bg-gray-900 dark:text-white"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="current">Current</option>
            <option value="past">Past</option>
            <option value="all">All</option>
          </select>
          <label className="ml-3 text-sm dark:text-white">Calendar</label>
          <select
            className="rounded border p-1 text-sm dark:bg-gray-900 dark:text-white"
            value={view}
            onChange={(e) => setView(e.target.value)}
            title="Google Calendar view"
          >
            <option value="DAY">Day (all hours)</option>
            <option value="WEEK">Week</option>
            <option value="MONTH">Month</option>
            <option value="AGENDA">Agenda</option>
            <option value="YEAR">Year (agenda range)</option>
          </select>
          <input
            type="date"
            className="rounded border p-1 text-sm dark:bg-gray-900 dark:text-white"
            value={format(baseDate, 'yyyy-MM-dd')}
            onChange={(e) => setBaseDate(new Date(e.target.value))}
            title="Anchor date"
          />
        </div>
        <button
          onClick={() => refetch()}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          disabled={isFetching}
        >
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </button>
        {!isGoogleConnected && (
          <button
            onClick={async ()=>{
              try {
                const res = await triggerGoogleUrl('org').unwrap();
                if (res?.url) window.location.href = res.url;
              } catch (_) {}
            }}
            className="rounded bg-green-700 px-3 py-1 text-sm text-white ml-2"
          >
            Connect Google Calendar
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded border dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900/30 dark:text-white">
            <tr>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Candidate</th>
              <th className="px-2 py-2">Job</th>
              <th className="px-2 py-2">Start</th>
              <th className="px-2 py-2">End</th>
              <th className="px-2 py-2">Round</th>
              <th className="px-2 py-2">Meeting</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td className="px-2 py-3 dark:text-white" colSpan={7}>No interviews</td>
              </tr>
            )}
            {sorted.map((iv) => (
              <tr key={iv._id} className="border-t dark:border-gray-700">
                <td className="px-2 py-2 dark:text-white">{iv.title}</td>
                <td className="px-2 py-2 dark:text-white">{iv.candidate?.fullname || '-'}</td>
                <td className="px-2 py-2 dark:text-white">{iv.job?.title || '-'}</td>
                <td className="px-2 py-2 dark:text-white">{format(new Date(iv.scheduledStart), 'dd MMM yyyy, HH:mm')}</td>
                <td className="px-2 py-2 dark:text-white">{format(new Date(iv.scheduledEnd), 'dd MMM yyyy, HH:mm')}</td>
                <td className="px-2 py-2 dark:text-white">{iv.round || 1}</td>
                <td className="px-2 py-2">
                  {iv.meetingLink ? (
                    <a href={iv.meetingLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Join</a>
                  ) : (
                    <span className="dark:text-white">—</span>
                  )}
                </td>
                <td className="px-2 py-2 dark:text-white">{iv.status || 'scheduled'}</td>
                <td className="px-2 py-2">
                  {iv.status !== 'completed' ? (
                    <button
                      className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                      onClick={() => {
                        setEditing({ open: true, interview: iv });
                        setEvals(Array.isArray(iv.evaluations) ? iv.evaluations.map(e => ({
                          skill: e.skill || '', score: e.score ?? '', feedback: e.feedback || ''
                        })) : []);
                        setNotes(iv.notes || '');
                        setFeedback(iv.feedback || '');
                      }}
                    >Complete</button>
                  ) : (
                    <span className="text-xs dark:text-white">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3">
        {calendarId ? (
          <div className={colorMode === 'dark' ? 'bg-[#2c3038] p-1 rounded' : 'bg-[#f1f5f9]'}>
            <iframe
              title="Google Calendar"
              src={iframeSrc()}
              className="h-[700px] w-full rounded border dark:border-gray-700"
              frameBorder="0"
              scrolling="no"
              style={colorMode === 'dark' ? { filter: 'invert(1) hue-rotate(180deg)', backgroundColor: '#0f172a' } : { backgroundColor: '#f1f5f9' }}
            />
          </div>
        ) : (
          <p className="text-sm dark:text-white">Sign in to load your Google Calendar.</p>
        )}
      </div>

      {/* Remove Quick Add; events are created automatically on schedule */}

      {editing.open && editing.interview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-md bg-white p-3 shadow dark:bg-gray-800">
            <h3 className="mb-2 text-base font-semibold dark:text-white">Complete Interview: {editing.interview.title}</h3>
            <div className="mt-2">
              <p className="mb-1 text-sm font-semibold dark:text-white">Evaluations</p>
              {evals.map((ev, idx) => (
                <div key={idx} className="mb-2 grid grid-cols-3 gap-2 max-sm:grid-cols-1">
                  <input value={ev.skill} onChange={(e)=>{const c=[...evals]; c[idx] = { ...c[idx], skill: e.target.value }; setEvals(c);}} placeholder="Skill" className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
                  <input type="number" min="0" max="10" value={ev.score} onChange={(e)=>{const c=[...evals]; c[idx] = { ...c[idx], score: Number(e.target.value) }; setEvals(c);}} placeholder="Score" className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
                  <input value={ev.feedback} onChange={(e)=>{const c=[...evals]; c[idx] = { ...c[idx], feedback: e.target.value }; setEvals(c);}} placeholder="Feedback" className="rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
                </div>
              ))}
              <button type="button" onClick={()=> setEvals([...evals, { skill:'', criteria:'', parameter:'', score:'', feedback:'' }])} className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 dark:text-gray-100">Add evaluation</button>
            </div>
            <div className="mt-3">
              <label className="block text-sm dark:text-gray-200">Notes</label>
              <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={2} className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
              <label className="mt-2 block text-sm dark:text-gray-200">Overall feedback</label>
              <textarea value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows={2} className="w-full rounded border p-1 dark:bg-gray-900 dark:text-gray-100" />
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button type="button" onClick={()=> setEditing({ open: false, interview: null })} className="rounded bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700 dark:text-gray-200">Cancel</button>
              <button
                type="button"
                className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
                onClick={async ()=>{
                  const update = {
                    status: 'completed',
                    notes,
                    feedback,
                    evaluations: evals.filter(e=>e.skill),
                  };
                  try {
                    await updateInterview({ id: editing.interview._id, update }).unwrap();
                    setEditing({ open: false, interview: null });
                    setEvals([]); setNotes(''); setFeedback('');
                    refetch();
                  } catch (e) {}
                }}
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


