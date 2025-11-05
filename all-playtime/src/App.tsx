import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState<string>("...")
  useEffect(() => {
    (async () => {
      try {
        const x = await window.bridge.ping()
        setMsg(String(x))
      } catch (e) {
        setMsg("Error talking to electron.")
        console.error(e)
      }
    })();
  }, [])
  
  return (
    <div style={{padding: 24}}>
      <h1>All playtime</h1>
      <p>Electron says: {msg}</p>
    </div>
  )
}

export default App
