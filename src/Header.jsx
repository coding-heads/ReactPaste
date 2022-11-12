import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './Header.css'
import {Link} from 'react-router-dom';
function Header() {
  const [count, setCount] = useState(0)

  return (
    <div className="Header">
      <div className='Title'>
        ScriptBucket
      </div>
      <div className="navLinks">

        <Link to="/expenses">Expenses</Link>
       </div>
    </div>
  )
}

export default Header
