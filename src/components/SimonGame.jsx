import React, { useState, useRef, useEffect } from 'react'
import GameBtn from './GameBtn'

const game = document.querySelector("body")
const colors = ["green", "red", "yellow", "blue"]

function SimonGame() {
  // States
  const [sequence, setSequence] = useState([])
  const [playing, setPlaying] = useState(false)
  const [playingIdx, setPlayingIdx] = useState(0)

      //refs
      const greenRef = useRef(null)
      const redRef = useRef(null)
      const yellowRef = useRef(null)
      const blueRef = useRef(null)

    // functions

    const gameOver = () => {
      game.classList.add("gameOverFlash")
      setTimeout(() => {
        game.classList.remove("gameOverFlash")
      }, 500)
    }

    const resetGame = () => {
      setSequence([]);
      setPlaying(false);
      setPlayingIdx(0);
    }

    const addNewColor = () => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const newSequence = [...sequence, color] // it will push a random colors to our new sequence
      setSequence(newSequence)
    }

    const handleNextLevel = () => {
      if (!playing) {
        setPlaying(true)
        addNewColor();
      }
    }

    const handleColorClick = (e) => {
      if (playing) {
        e.target.classList.add("opacity-30")
        setTimeout(()=> {
          e.target.classList.remove("opacity-30")

          const clickColor = e.target.getAttribute("color")
        
          //do we click the correct color of the sequence?
  
          if (sequence[playingIdx] === clickColor) {
            // when we clicked the last color of the sequence
            if (playingIdx === sequence.length - 1) {
              setTimeout(() => {
                setPlayingIdx(0);
                addNewColor();
              }, 250)
            } else {
              //missing some colors of the sequence to be clicked
              setPlayingIdx(playingIdx + 1)
            }
          } else {
            gameOver()
            // GAME OVER
            resetGame()
            // alert("GAME OVER!")
          }
        }, 250) 
      }
    }

    // useEffect
    useEffect(() => {
      //show sequence
      if (sequence.length > 0) {
        const showSequence = (idx = 0) => {
          let ref = null;

          if (sequence[idx] === "green") ref = greenRef
          if (sequence[idx] === "red") ref = redRef
          if (sequence[idx] === "yellow") ref = yellowRef
          if (sequence[idx] === "blue") ref = blueRef

          // highlight the ref
          setTimeout(() => {
            ref.current.classList.add("brightness")
            setTimeout(() => {
              ref.current.classList.remove("brightness")
              if (idx < sequence.length -1) showSequence(idx +1); // Permet de rallongé a chaque fois de 1 color dans le tableau sequence
            },250)
          }, 250)
        }
      
        showSequence()
        }
      }, [sequence]) 


  return (
    // Main container
    <div className="bg-dark vw100 vh100 flex justify-center items-center text-white">
        {/* Game container */}
        <div className="relative flex flex-col justify-center items-center">
            {/* green and red container */}
            <div>
                <GameBtn bg="btnGreen" color="green" onClick={handleColorClick} ref={greenRef}/>
                <GameBtn bg="btnRed" color="red" onClick={handleColorClick} ref={redRef}/>
            </div>
           {/* yellow and blue container */}
            <div>
                <GameBtn bg="btnYellow" color="yellow" onClick={handleColorClick} ref={yellowRef}/>
                <GameBtn bg="btnBlue" color="blue" onClick={handleColorClick} ref={blueRef}/>
            </div>
            {/* Play button*/}
            <button className="absolute full-rounded bg-dark text-white w20 text-center" onClick={handleNextLevel}>{sequence.length === 0 ? "Play" : sequence.length }</button>
        </div>
        
    </div>
  )
}

export default SimonGame