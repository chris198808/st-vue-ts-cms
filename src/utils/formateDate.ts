import dayjs from 'dayjs'
// 默认情况下，Day.js 会把时间解析成本地时间。
// 如果想使用 UTC 时间，您可以调用 dayjs.utc() 而不是 dayjs()。
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUTCDate(
  date: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs.utc(date).format(format)
}
