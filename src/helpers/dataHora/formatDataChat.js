import dayjs from 'dayjs'

const formatDataChat = (d) => {
  return dayjs(d).format(' HH:mm')
}

export default formatDataChat
