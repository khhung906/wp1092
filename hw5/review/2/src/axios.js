import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

// TIMEOUT < 100 => server not responding
// TIMEOUT > 10000 and Close server => server not connected
const TIMEOUT = 150
instance.defaults.timeout = TIMEOUT

const errorHandler = (error) => {
  if (error.code === 'ECONNABORTED') {
    return 'server not responding'
  }
  else if (error.message === 'Network Error') {
    return 'server not connected'
  }
  else return 'Unknown Error'
}

const startGame = async () => {
  // const {
  //   data: { msg }
  // } = 
  return await instance.post('/start')
  .then(res => res.data.msg )
  .catch(error => {alert(errorHandler(error))} )

  // return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  // try {
  // const  {
  //   data: { msg }
  // } = 
  return await instance.get('/guess', { params: { number } })
    .then(res => res.data.msg )
    .catch(error => errorHandler(error) )
}

const restart = async () => {
  // const {
  //   data: { msg }
  // } = 
  return await instance.post('/restart')
  .then(res => res.data.msg )
  .catch(error => {alert(errorHandler(error))} )
  // return msg
}

export { startGame, guess, restart }
