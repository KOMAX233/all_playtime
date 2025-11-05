import { useEffect, useState } from 'react'
import './App.css'
import { Layout } from './components/Layout';
import { HomePage } from './pages.tsx/Home';

function App() {
/*   const [msg, setMsg] = useState<string>("...")
  useEffect(() => {
    (async () => {
      try {
        const x = await window.bridge.getSteamPath()
        setMsg(String(x))
      } catch (e) {
        setMsg("Error finding Steam.")
        console.error(e)
      }
    })();
  }, []) */
  
  return (
    <Layout>
      <HomePage></HomePage>
    </Layout>
  )
}

export default App
