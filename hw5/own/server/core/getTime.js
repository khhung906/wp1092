const getTime = () => {
  let date = new Date()
  let datestring = date.getFullYear()+'-'
  
  if(date.getMonth() <= 9){
      datestring += '0'
  }
  datestring += date.getMonth()+'-' 
  if(date.getDate() <= 9){
      datestring += '0'
  }
  datestring += date.getDate()+'-'
    
  if(date.getHours() <= 9){
      datestring += '0'
  }
  datestring += date.getHours()+'-'
    
  if(date.getMinutes() <= 9){
      datestring += '0'
  }
  datestring += date.getMinutes()
  return datestring
}

export default getTime