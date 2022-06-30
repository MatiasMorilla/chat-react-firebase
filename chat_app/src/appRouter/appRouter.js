import { useEffect, useState } from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import AddFriend from '../components/addFriend/addFriend';
import Chat from '../components/chat/chat';
import Home from '../components/home/home';
import HomeDesktop from '../components/homeDesktop/homeDesktop';
import LogIn from '../components/LogIn/logIn';
import SignIn from '../components/SignIn/SignIn';

function AppRouter() {
  const [windowsWidth, setWindowsWidth] = useState(window.screen.width);

  useEffect( () => {
    window.addEventListener("resize", () => setWindowsWidth(window.screen.width));
  }, [windowsWidth]);

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/Home' element={windowsWidth >= 800 ? <HomeDesktop /> : <Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/addFriend' element={<AddFriend />} />
            <Route path='/chat/:friendName' element={windowsWidth >= 800 ? <HomeDesktop /> : <Chat />} />
            <Route path='/' element={<LogIn />}/>
        </Routes>
    </BrowserRouter>  
  );
}

export default AppRouter;
