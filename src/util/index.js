export function overlap(x1, x2, y1, y2, detectEqual) {
  if (detectEqual) {
    return x1 <= y2 && y1 <= x2;
  }
  return x1 < y2 && y1 < x2;
}

export function isOverlap(lecture, filledTimes) {
  if (!filledTimes) return false;

  for (let i = 0; i < filledTimes.length; i += 1) {
    if (!lecture.times) continue;  // eslint-disable-line no-continue

    const t0 = filledTimes[i];

    for (let j = 0; j < lecture.times.length; j += 1) {
      const t1 = lecture.times[j];
      if (
        t0.weekday === t1.weekday &&
        overlap(t0.timeBegin, t0.timeEnd, t1.timeBegin, t1.timeEnd)
      ) {
        return true;
      }
    }
  }
  return false;
}
