let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (forceRestart || !number){
    number = parseInt((Math.random() * 100), 10)
  }
  console.log('getNumber: '+number)
  return number
}

export default getNumber
