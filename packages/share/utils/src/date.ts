import dayjs from 'dayjs'

export function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD')
}

export function formatDateTime(date: string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
