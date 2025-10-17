import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useListCandidateInterviewsQuery } from '../../../../app/api/InterviewApi';

export default function CandidateInterviews() {
  const { data: all = [], isFetching } = useListCandidateInterviewsQuery('all');
  const [expandedId, setExpandedId] = useState(null);

  const now = new Date();
  const { upcoming, current, past } = useMemo(() => {
    const u = []; const c = []; const p = [];
    all.forEach((iv) => {
      const start = new Date(iv.scheduledStart);
      const end = new Date(iv.scheduledEnd);
      if (start <= now && end >= now) c.push(iv);
      else if (start > now) u.push(iv);
      else p.push(iv);
    });
    u.sort((a,b) => new Date(a.scheduledStart) - new Date(b.scheduledStart));
    c.sort((a,b) => new Date(a.scheduledStart) - new Date(b.scheduledStart));
    p.sort((a,b) => new Date(b.scheduledStart) - new Date(a.scheduledStart));
    return { upcoming: u, current: c, past: p };
  }, [all]);

  return (
    <div className="rounded-md border p-3 dark:border-gray-700 dark:bg-gray-900/30">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold dark:text-white">My Interviews</h3>
        {isFetching && <span className="text-xs dark:text-gray-300">Loading…</span>}
      </div>

      {[...current, ...upcoming].length === 0 && (
        <p className="text-sm dark:text-gray-300">No upcoming interviews.</p>
      )}

      {[...current, ...upcoming].map((iv) => (
        <div key={iv._id} className="mb-2 rounded border p-2 dark:border-gray-700">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="text-sm dark:text-gray-100">
                <span className="font-medium">{iv.title}</span>
                {iv.job?.title && <span className="opacity-80"> • {iv.job.title}</span>}
                <span className="opacity-80"> • Round {iv.round || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                {iv.meetingPlatform === 'google_meet' ? (
                  <img
                    src="https://www.gstatic.com/meet/google_meet_primary_horizontal_2020q4_logo_be3f8c43950bd1e313525ada2ce0df44.svg"
                    alt="Google Meet"
                    title="Google Meet"
                    className="h-5"
                  />
                ) : (
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'56\' height=\'16\' viewBox=\'0 0 56 16\'><rect rx=\'3\' ry=\'3\' width=\'56\' height=\'16\' fill=\'#e5e7eb\'/><path d=\'M14 4h-2.5c-.83 0-1.5.67-1.5 1.5v5c0 .83.67 1.5 1.5 1.5H14c.83 0 1.5-.67 1.5-1.5v-5C15.5 4.67 14.83 4 14 4zm-2.5 6.5v-4h2.5v4H11.5zM18 6l3 2-3 2V6z\' fill=\'#6b7280\'/><text x=\'24\' y=\'11\' font-size=\'8\' fill=\'#374151\' font-family=\'Arial, Helvetica, sans-serif\'>Meeting</text></svg>')}`}
                    alt="Meeting"
                    title="Meeting"
                    className="h-5"
                  />
                )}
                {iv.meetingLink && (
                  <a href={iv.meetingLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">Join</a>
                )}
              </div>
            </div>
            <div className="text-xs dark:text-gray-300">
              {format(new Date(iv.scheduledStart), 'dd MMM yyyy, HH:mm')} – {format(new Date(iv.scheduledEnd), 'HH:mm')} ({iv.timezone || 'UTC'})
            </div>
          </div>
        </div>
      ))}

      <div className="mt-3">
        <h4 className="mb-1 text-sm font-semibold dark:text-white">Past Interviews</h4>
        {past.length === 0 && <p className="text-sm dark:text-gray-300">No past interviews.</p>}
        <ul className="space-y-2">
          {past.map((iv) => {
            const isOpen = expandedId === iv._id;
            return (
              <li key={iv._id} className="rounded border dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : iv._id)}
                  className="flex w-full items-center justify-between bg-gray-50 px-2 py-1 text-left text-sm dark:bg-gray-900/40 dark:text-gray-100"
                >
                  <span className="flex items-center gap-2">
                    {iv.meetingPlatform === 'google_meet' ? (
                      <img
                        src="https://www.gstatic.com/meet/google_meet_primary_horizontal_2020q4_logo_be3f8c43950bd1e313525ada2ce0df44.svg"
                        alt="Google Meet"
                        title="Google Meet"
                        className="h-4"
                      />
                    ) : (
                      <img
                        src={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'56\' height=\'16\' viewBox=\'0 0 56 16\'><rect rx=\'3\' ry=\'3\' width=\'56\' height=\'16\' fill=\'#e5e7eb\'/><path d=\'M14 4h-2.5c-.83 0-1.5.67-1.5 1.5v5c0 .83.67 1.5 1.5 1.5H14c.83 0 1.5-.67 1.5-1.5v-5C15.5 4.67 14.83 4 14 4zm-2.5 6.5v-4h2.5v4H11.5zM18 6l3 2-3 2V6z\' fill=\'#6b7280\'/><text x=\'24\' y=\'11\' font-size=\'8\' fill=\'#374151\' font-family=\'Arial, Helvetica, sans-serif\'>Meeting</text></svg>')}`}
                        alt="Meeting"
                        title="Meeting"
                        className="h-4"
                      />
                    )}
                    <span className="font-medium">{iv.title}</span>
                    {iv.job?.title && <span className="opacity-80"> • {iv.job.title}</span>}
                    <span className="opacity-80"> • Round {iv.round || 1}</span>
                    <span className="opacity-80"> • {format(new Date(iv.scheduledStart), 'dd MMM yyyy')}</span>
                  </span>
                  <span className="text-xs text-blue-600">{isOpen ? 'Hide' : 'Show'}</span>
                </button>
                {isOpen && (
                  <div className="px-3 py-2 text-xs dark:text-gray-200">
                    <div>Date: {format(new Date(iv.scheduledStart), 'dd MMM yyyy, HH:mm')} – {format(new Date(iv.scheduledEnd), 'HH:mm')} ({iv.timezone || 'UTC'})</div>
                    {Array.isArray(iv.evaluations) && iv.evaluations.length > 0 && (
                      <div className="mt-2 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="text-left">
                            <tr className="text-gray-600 dark:text-gray-300">
                              <th className="py-1 pr-2">Skill</th>
                              <th className="py-1 pr-2">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {iv.evaluations.map((ev, idx) => (
                              <tr key={idx} className="border-t dark:border-gray-700">
                                <td className="py-1 pr-2">{ev?.skill || '-'}</td>
                                <td className="py-1 pr-2">{typeof ev?.score === 'number' ? ev.score : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {/* Feedback intentionally hidden for candidates */}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
