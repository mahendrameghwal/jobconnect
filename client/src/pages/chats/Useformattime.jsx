import React from 'react';
import { DateTime } from 'luxon';

const TimeAgo = ({ timestamp }) => {
  const now = DateTime.now();
  const dateTime = DateTime.fromISO(timestamp);
  const diff = now.diff(dateTime, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']);

  if (diff.years > 0) {
    return <span>{diff.years} y ago</span>;
  } else if (diff.months > 0) {
    return <span>{diff.months} mo ago</span>;
  } else if (diff.days > 0) {
    return <span>{diff.days} d ago</span>;
  } else if (diff.hours > 0) {
    return <span>{diff.hours} h ago</span>;
  } else if (diff.minutes > 0) {
    return <span>{diff.minutes} m ago</span>;
  } else {
    return <span>Just now</span>;
  }
};

export default TimeAgo;