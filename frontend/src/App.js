import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginRegister from './pages/Login';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import { GlobalProvider } from './globalData/GlobalContext';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  let location = useLocation();

  return (<>

    <GlobalProvider>
      {location.pathname !== '/' && <Header />}
      <Toaster position="top-center"
        reverseOrder={false} />
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/HomePage/Products' element={<Products />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/HomePage/Product' element={<Product />} />
        <Route path='/HomePage/Profile' element={<Profile />} />
      </Routes>
    </GlobalProvider>

  </>
  );
}

export default App;
