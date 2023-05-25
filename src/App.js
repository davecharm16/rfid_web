import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { myTheme } from './theme/colorTheme';
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserProvider from './context/UserContext';
import PrivateRoute from './context/ValidateAdmin';
import ValidateAdmin from './context/ValidateAdmin';


function App() {
  const theme = myTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <UserProvider>
        <div className="app">
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/admin' element = {<Login/>}/>
            <Route path='/dashboard' element = {<Admin/>}/>
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
