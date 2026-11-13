//Implementieren Sie einen Zähler mit den Buttons: Erhöhen, Verringern, Zurücksetzen. 
import { useState } from 'react'

const Zaehler = () => {
  const [count, setCount] = useState(0)

  const hochzählen = () => {
    setCount(count + 1)
  }

  const runterzählen = () => {
    if (count == 0) {
      return
    }
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  const umXerhöhen = (x: number) => {
    setCount(count + x)
  }

  return (
    <div>
      <h2>Zähler</h2>
      <p style={{ color: count > 10 ? 'red' : count === 0 ? 'gray' : 'black' }}>
        {count}
      </p>
      <button onClick={hochzählen}>Erhöhen</button>
      <button onClick={runterzählen}>Verringern</button>
      <button onClick={reset}>Zurücksetzen</button>
      <input
        type="number"
        value={count}
        onChange={(e) => umXerhöhen(Number(e.target.value))}
      />
    </div>
  )
}

export default Zaehler