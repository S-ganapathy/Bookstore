import { useContext, useEffect, useState } from 'react';
import '../App.css';
import { GlobalContext } from '../globalData/GlobalContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { BsCart4 } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const [menu, setMenu] = useState('')
  const [cartcount, setCartcount] = useState(0)
  const { cart } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  let username = '';
  let userid = '';
  let token='';

  let loginStatus = localStorage.getItem('login-status');
  if (loginStatus) {
    username = localStorage.getItem('username');
    userid = localStorage.getItem('userid');
    token=localStorage.getItem('token')
  }

  useEffect(() => {
    let data = { userid: userid }
    try {
      axios.post('http://localhost:5000/cartcount', data,{headers:{"Authorization":token}}).then((response) => {
        let result = response.data;
        if (result !== false) {
          let { count } = result;
          setCartcount(count);
        } else if (result === false) {
          alert('Something Worng please try later');
        }
      });

    } catch (e) {
      console.log(e);
    }
  }, [cart]);

  useEffect(()=>{

    if (menu === 'cart' && location.pathname !== '/Cart') {
      navigate('/Cart');
    }
    if (menu === 'profile' && location.pathname !== '/HomePage/Profile') {
      navigate('/HomePage/Profile');
    }
    if (menu === 'logout') {
      localStorage.clear('login-status');
      localStorage.clear('username');
      localStorage.clear('userid');
      navigate('/');
    }
    if(menu==='home' && location.pathname!=='/HomePage'){
      navigate('/HomePage');
    }

  },[menu]);




  return (
    <>
      <div className="header">
        <div className="title-back">

          {/* <div className="back" onClick={() => setMenu('back')}>
            Back
            {menu === 'back' ? <hr /> : <></>}
          </div> */}
          <div className="title" onClick={()=>setMenu('home')}>
          <FaHome /><div>Book Store</div>
          </div>

        </div>

        <div className="logout-user" >
          <div onClick={() => setMenu('profile')}>
            {username}
            {menu === 'profile' ? <hr /> : <></>}
          </div>
          <div onClick={() => setMenu('logout')}>
            <TbLogout2 size={35}/>
            {menu === 'logout' ? <hr /> : <></>}
          </div>
          <div className='cart' onClick={() => { setMenu('cart'); }}>
          <BsCart4 size={30} />
            {menu === 'cart' ? <hr /> : <></>}
            <div className='cart-count'>{cartcount}</div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Header;