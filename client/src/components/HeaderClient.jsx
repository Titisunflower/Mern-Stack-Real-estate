import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='container mx-auto flex justify-between items-center max-w-6xl max-auto p-3'>
        <Link to='/'><img src={logo} alt='logo' /></Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
            <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
        <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
        </Link>
        <Link to='/sign-in'>
              <li className=' text-slate-700 hover:underline'> Add House</li>
          </Link>
        </ul>
        </div>
    </header>
  )
}
