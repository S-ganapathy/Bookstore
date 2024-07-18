import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../App.css';
import { GlobalContext } from "../globalData/GlobalContext";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdStar } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import toast from "react-hot-toast";



const Products = () => {
    const { setCart } = useContext(GlobalContext);
    const { cart } = useContext(GlobalContext);
    const { state } = useLocation();
    const { value, column } = state;
    const [values, setValues] = useState([]);

    let username='';
    let userid='';
    let loginStatus = localStorage.getItem('login-status');
    if (loginStatus) {
      username = localStorage.getItem('username');
      userid = localStorage.getItem('userid');
   }

    useEffect(() => {
        getdata();
    }, []);

    const getdata = () => {
        if (value && column) {
            try {
                axios.post('http://localhost:5000/homepage/products', state).then((response) => {
                    let result=response.data;
                    if(result!==false){
                    var temp = response.data;
                    setValues(temp);
                }else if(result===false){
                    toast("No data found :(");
                }

                });
            } catch (e) {
                console.log(e);
            }
        }
    }


    const addToCart = async (items) => {
        let data = { userid: userid, bookid: items }
        try {
            await axios.post('http://localhost:5000/homepage/products/cart', data).then((response) => {
                let result = response.data;
                if (result === false) {
                    toast.error('something worng please try again');
                } else if (result === true) {
                    toast.success('Book is add to the cart :)');
                    setCart(!cart);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }



    return (
        <>
            <div className="products-title">
                <div>Showing Books Available on Category - {value} . . .</div>
            </div>
            <hr/>
            <div className="box-div">
                {values.map((obj) => {
                    return (
                        <div className="book-box" key={obj.id}>
                            <div className="title-rating">
                                <div><CiBookmarkCheck /> {obj.title}</div>
                                <div> <MdStar color="gold" /> {obj.rating}</div>
                            </div>

                            <div className="author-desc">
                                <div><RiContactsLine /> {obj.author}</div>
                            </div>

                            <div className="genre-year-public">
                                <div><SiBookstack /> {obj.genre}</div>
                                <div><FaRegCalendarAlt /> {obj.year}</div>
                                <div><GrValidate />  {obj.publication}</div>
                            </div>

                            <div className="price-stock">
                                <div>&euro; {obj.price} </div>
                                <div>Stock {obj.stock}</div>
                            </div>

                            <div className="cart-button">
                                <button onClick={() => addToCart(obj.id)}>Add To Cart</button>
                            </div>
                        </div>

                    );
                })}
            </div>
        </>
    );
}

export default Products;