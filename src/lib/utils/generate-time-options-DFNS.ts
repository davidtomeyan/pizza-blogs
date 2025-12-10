import { eachMinuteOfInterval, format, parse, startOfDay } from 'date-fns';

export function generateTimeOptionsDFNS(
  start = '00:00',
  end = '23:59',
  step = 15,
) {
  const base = startOfDay(new Date());
  const s = parse(start, 'HH:mm', base);
  const e = parse(end, 'HH:mm', base);
  return eachMinuteOfInterval(
    {
      start: s,
      end: e,
    },
    {
      step,
    },
  ).map((d) => {
    const hhmm = format(d, 'HH:mm');
    return {
      label: hhmm,
      value: hhmm,
    };
  });
}
