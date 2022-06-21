import {Route, Routes, BrowserRouter} from 'react-router-dom';
import AddFriend from '../components/addFriend/addFriend';
import Chat from '../components/chat/chat';
import Home from '../components/home/home';
import LogIn from '../components/LogIn/logIn';
import SignIn from '../components/SignIn/SignIn';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/addFriend' element={<AddFriend />} />
            <Route path='/chat/:friendName' element={<Chat />} />
            <Route path='/' element={<LogIn />}/>
        </Routes>
    </BrowserRouter>  
  );
}

export default AppRouter;
