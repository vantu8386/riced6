import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/register/Register';
import Register1 from './Pages/register/Register1';
import Register2 from './Pages/register/Register2';
import Login from './Pages/login/Login';
import Homepage from './Pages/homepage/Homepage';
import Host from './Pages/host/Host';
import Order from './Pages/order/Order';
import Profile from './Pages/profile/Profile';
import Debt from './Pages/debt/Debt';
import Host1 from './Pages/host/Host1';
import Payment from './Pages/payment/Payment';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/host" element={<Host />} />
        <Route path="/host1" element={<Host1 />} />
        <Route path="/order/:idMenu" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/debt" element={<Debt />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
