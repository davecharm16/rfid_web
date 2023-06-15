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
import Load from './pages/Load';
import RegisterCard from './pages/RegisterCard';
import Transactions from './pages/Transactions';
import Display from './pages/Display';


function App() {
  const theme = myTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <UserProvider>
        <div className="app">
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/display' element = {<Display/>}/>
            <Route path='/admin' element = {<Login/>}/>
            <Route path='/dashboard' element = { <ValidateAdmin><Admin/></ValidateAdmin>}/>
            <Route path='/load/:id' element = {<ValidateAdmin><Load/> </ValidateAdmin>}/>
            <Route path='/register' element = {<ValidateAdmin><RegisterCard/></ValidateAdmin>}/>
            <Route path='/transactions' element = {<ValidateAdmin><Transactions/></ValidateAdmin>}/>
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
