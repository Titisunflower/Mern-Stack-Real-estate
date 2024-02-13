import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import AddHouse from './pages/AddHouse';
import MainUserPage from './pages/public_pages/MainUserPage';
import MainAdminPage from './pages/private_pages/MainAdminPages';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainUserPage />} >
        {/* public pages  */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>
        <Route path='/' element={<MainAdminPage />} >
        {/* Authentication Pages */}
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/add-house' element={<AddHouse />} />
          <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}
