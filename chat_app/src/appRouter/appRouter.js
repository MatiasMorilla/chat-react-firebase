import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LogIn from '../components/LogIn/logIn';

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LogIn />}/>
        </Routes>
    </BrowserRouter>  
  );
}

export default AppRouter;
