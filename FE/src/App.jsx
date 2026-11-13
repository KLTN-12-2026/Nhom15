import { useState } from 'react'
import './App.css'
import BaoCaoThongKe from './component/BaoCaoThongKe';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BaoCaoThongKe />      
    </>
  )
}

export default App
