import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import RegPage from './pages/RegPage/RegPage';
import LogPage from './pages/LogPage/LogPage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/register' element={<RegPage/>}/>
        <Route path='/login' element={<LogPage/>}/>
        <Route path='/account' element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
