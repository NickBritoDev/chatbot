import dayjs from 'dayjs'

const formatDataHoraChat = (d) => {
  return dayjs(d).format(' DD/MM/YYYY HH:mm:ss')
}

export default formatDataHoraChat
