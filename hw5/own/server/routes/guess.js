import express from 'express'
import getNumber from '../core/getNumber'
import getTime from '../core/getTime'

const router = express.Router()

//write log files yyyy-mm-dd-hh-mm.log
const fs = require('fs');
let options = {
   flags: 'a', // 
   encoding: 'utf8', // utf8编码
}
let stderr = fs.createWriteStream('./server/log/'+getTime()+'.log', options);

let logger = new console.Console(stderr);

//fs.writeFile('./a.log', '', function (err) {
//   if(err){
//       console.log(err);
//   }
//});

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)
  res.json({ msg: 'The game has started.' })
  logger.log('start number='+getNumber()+' '+getTime());
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    logger.log('illegal guess '+guessed+' '+getTime());
    res.status(400).send({ msg: 'Not a legal number.' })
    
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
      logger.log('guess '+guessed+' '+getTime());
      if(number > guessed){
          res.send({ msg: "Bigger" })
      }
      else if(number < guessed){
          res.send({ msg: "Smaller" })
      }
      else{
          res.send({ msg: "Equal" })
          logger.log('end-game');
      }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)
  logger.log('restart number='+getNumber()+' '+getTime());
  res.json({ msg: 'The game has started.' })
})

export default router
