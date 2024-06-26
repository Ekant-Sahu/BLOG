import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SingUp from './pages/SingUp'
import Dashboard from './pages/Dashboard'
import LogIn from './pages/LogIn'
import Post from './pages/Post'
import Header from './componentes/Header'
import Footer from './componentes/Footer'
import PrivateRoute from './componentes/PrivateRoute'
import OnlyAdmin from './componentes/OnlyAdmin'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path = "/" element = {<Home />}></Route>
      <Route path = "/about" element = {<About />}></Route>
      <Route path = "/sign-up" element = {<SingUp />}></Route>
      <Route path = "/log-in" element = {<LogIn />}></Route>
      <Route path = "/search" element = {<Search />}></Route>
      <Route element = {<PrivateRoute/>}>
        <Route path = "/dashboard" element = {<Dashboard />}></Route>
      </Route>
      <Route element = {<OnlyAdmin/>}>
        <Route path = "/create-post" element = {<CreatePost />}></Route>
        <Route path = "/update-post/:postId" element = {<UpdatePost />}></Route>
      </Route>  
      <Route path = "/post" element = {<Post />}></Route>
      <Route path = "/post/:postSlug" element = {<PostPage />}></Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
