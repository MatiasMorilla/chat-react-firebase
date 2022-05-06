import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from '../components/home/home';
import LogIn from '../components/LogIn/logIn';
import PersonsList from '../components/personList/personsList';
import SignIn from '../components/SignIn/SignIn';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/addFriend' element={<PersonsList />} />
            <Route path='/' element={<LogIn />}/>
        </Routes>
    </BrowserRouter>  
  );
}

export default AppRouter;
