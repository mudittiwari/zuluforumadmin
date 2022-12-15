import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addblog from './Addblog';
import Complains from './Complains';
import AdminLogin from './Adminlogin';
function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<AdminLogin />} />
          <Route exact path="/addblog" element={<Addblog />} />
          <Route exact path="/complain" element={<Complains />} />
          <Route exact path="/login" element={<AdminLogin />} />
          
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;