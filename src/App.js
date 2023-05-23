import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { myTheme } from './theme/colorTheme';


function App() {
  const theme = myTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <Routes>
          <Route path='/' element = {<Home/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
