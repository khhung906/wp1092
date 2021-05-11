import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios.js'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          await restart()
          setHasWon(false)
          setStatus('')
          setNumber('')
        }}
      >
        restart
      </button>
    </>
  )


  const handleGuess = async () => {
    try{
      let msg = await guess(number)
      setStatus(msg)
      if(msg==='Equal'){
        setHasWon(true)
      }
    }catch(error){
      console.log('err',error)
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
