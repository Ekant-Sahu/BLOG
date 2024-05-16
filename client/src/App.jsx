import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SingUp from './pages/SingUp'
import Dashboard from './pages/Dashboard'
import LogIn from './pages/LogIn'
import Post from './pages/Post'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home />}></Route>
      <Route path = "/about" element = {<About />}></Route>
      <Route path = "/sign-up" element = {<SingUp />}></Route>
      <Route path = "/log-in" element = {<LogIn />}></Route>
      <Route path = "/dashboard" element = {<Dashboard />}></Route> 
      <Route path = "/post" element = {<Post />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
