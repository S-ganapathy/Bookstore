import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../globalData/GlobalContext";
import axios from "axios";
import { MdStar } from "react-icons/md";
import img3 from "../assets/book.png";
import toast from "react-hot-toast";


const Cart = () => {
    const { cart } = useContext(GlobalContext);
    const { setCart } = useContext(GlobalContext);
    const [values, setValues] = useState([]);
    const [cartcount, setCartcount] = useState(0)
    var total=0;

    let username = '';
    let userid = '';
    let loginStatus = localStorage.getItem('login-status');
    if (loginStatus) {
        username = localStorage.getItem('username');
        userid = localStorage.getItem('userid');
    }

    useEffect(() => {
        getdata();
    }, [cart]);
    

    const getdata = () => {
        let data = { userid: userid }
        try {
            axios.post('http://localhost:5000/cart', data).then((response) => {
                let result = response.data;
                if (result !== false) {
                    setValues(result);
                } else if (result === false) {
                    alert("No data found in cart :(");
                }
            });

        } catch (e) {
            console.log(e);
        }
    }

    const deleteItem = (items) => {
        let data = { userid: userid, bookid: items }
        try {
            axios.post('http://localhost:5000/cart-delete', data).then((response) => {
                let result = response.data;
                if (result === true) {
                    toast.success("one Item deleted sucessful :)");
                    setCart(!cart);
                } else if (result === false) {
                    toast.error("Something worng please try later :(");
                }
            });

        } catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        let data = { userid: userid }
        try {
          axios.post('http://localhost:5000/cartcount', data).then((response) => {
            let result = response.data;
            if (result !== false) {
              let { count } = result;
              setCartcount(count);
            } else if (result === false) {
              toast.error('Something Worng please try later');
            }
          });
    
        } catch (e) {
          console.log(e);
        }
      }, [cart]);

      const finalnotify=()=>{
        toast('Completed React App !', {
            icon: '🥳',
          });
      }
      

    return (
        <>
            <div className="products-title">
                <div>Cart Is Ready . . .</div>
            </div>
            <hr />
            <div className="cart-div">
                <div className="cart-products-div">
                    {values.map((obj) => {
                        {total=total+obj.price}
                        return (<>
                            <div className="cart-books">
                                <div className="cart-book-image">
                                <img src={img3} />
                                </div>
                                <div className="cart-book-box" key={obj.id}>
                                    <div className="cart-title-rating">
                                        <div>{obj.title}</div>
                                        <div><MdStar color="gold" />{obj.rating}</div>
                                    </div>

                                    <div className="cart-author-desc">
                                        <div><span className="gray-font">Author : </span>{obj.author}</div>
                                    </div>

                                    <div className="cart-genre-year-public">
                                        <div><span className="gray-font">Genre : </span>{obj.genre}</div>
                                        <div><span className="gray-font">Year : </span>{obj.year}</div>
                                        <div><span className="gray-font">Publisher : </span>{obj.publication}</div>
                                    </div>

                                    <div className="cart-delete-button">
                                        <button onClick={() => deleteItem(obj.id)}>Delete</button>
                                        <div className="cart-price-stock">
                                            <div> &euro; {obj.price}</div>
                                            <div>stocks {obj.stock}</div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </>);
                    })}
                </div>
                <div className="cart-checkout">
                    <div className="checkout-title">
                        Ready To Checkout
                    </div>
                    <div className="total-items">
                        Number Of Books
                        <div>{cartcount}</div>
                    </div>
                    <div className="subtotal">
                        Subtotal
                        <div>&euro; {Math.round(total)}</div>
                    </div>
                    <div className="free-delivery">
                        {total>5?(<>Your order is eligible for FREE Delivery</>):(<>Your order is not eligible for FREE Delivery</>)}
                        
                    </div>
                    <button onClick={finalnotify}>Proceed to Buy</button>

                </div>
            </div>
        </>
    );
}

export default Cart;