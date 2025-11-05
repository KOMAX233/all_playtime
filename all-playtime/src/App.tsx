import { useEffect, useState } from 'react'
import './App.css'
import { Layout } from './components/Layout';
import { HomePage } from './pages.tsx/Home';

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
    <Layout>
      <HomePage></HomePage>
    </Layout>
  )
}

export default App
