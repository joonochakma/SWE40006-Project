import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 id="media-player-heading">Media Player</h1>

      {/* Media Player Rectangle */}
      <div className="media-player-rectangle">
        {}
      </div>

      <button id="upload-button">Upload Audio File</button>
    </>
  )
}

export default App
