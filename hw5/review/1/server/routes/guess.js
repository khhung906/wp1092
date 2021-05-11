import express from 'express'
import getNumber from '../core/getNumber.js'
import fs  from 'fs';
const router = express.Router()


function write(num){
  var current = new Date();
  console.log(num)
  const content = 'guess '+num+' '+current+'\n';
  fs.appendFile('./server/log/log.txt', content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
}

function createlog(data){
  fs.appendFile('./server/log/log.txt' ,data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  })
}

function end(data){
  fs.rename('./server/log/log.txt',abc,function (err){
    if (err) throw err;
    console.log('Restart!');
  })
}

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}
// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const num = getNumber(true)
  const data = "start game, the core is " + parseInt(num)+'\n';
  createlog(data)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  // check if NOT a num or not in range [1,100]
  console.log(number,guessed)
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
    if(guessed > number){
      res.json({ msg: 'Smaller'});
       write(guessed)
    }else if(guessed < number){
      res.json({ msg: 'Bigger'});
       write(guessed)
    }else if(guessed === number){
      res.json({ msg: 'Equal'});
      write('end-game')
    }
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
  }
})

router.get('/restart', (_, res) => {
  const num = getNumber(true)
  res.json({ msg: 'The game restarted.' })
  const data = "restart , the core number is " + num+'\n';
  createlog(data)
})

export default router
