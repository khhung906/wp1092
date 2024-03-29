import express from 'express'
import getNumber from '../core/getNumber'
import {logMessage} from '../server'

const router = express.Router()

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
  const number = getNumber()
  logMessage('start number='+number)
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  const delay = (s) => {
    return new Promise((resolve) => {  
      setTimeout(resolve, s);    
    });
  };

  ~async function () {
    await delay(100)

    // check if NOT a num or not in range [1,100]
    if (!guessed || guessed < 1 || guessed > 100) {
      res.status(400).send({ msg: 'Not a legal number.' })
    }
    else {
      // TODO: check if number and guessed are the same,
      // and response with some hint "Equal", "Bigger", "Smaller"
      if (guessed < number)
        res.send({ msg: 'Bigger' })
      else if (guessed > number)
        res.send({ msg: 'Smaller' })
      else
        res.send({ msg: 'Equal' })
    }
  }()
  logMessage('guess '+guessed)
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
  const number = getNumber()
  logMessage('restart number='+number)
})
export default router
