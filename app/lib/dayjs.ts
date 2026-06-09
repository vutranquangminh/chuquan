/**
 * Central dayjs configuration.
 *
 * opilot-pm extends dayjs plugins (utc, timezone, isoWeek, weekOfYear) per
 * file and passes the timezone explicitly. We centralise that here so the rest
 * of the app imports a single, already-configured dayjs instance.
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);

export const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh';

dayjs.tz.setDefault(DEFAULT_TIMEZONE);

export default dayjs;
