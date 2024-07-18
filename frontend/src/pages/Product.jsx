import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../globalData/GlobalContext";
import { MdStar } from "react-icons/md";
import img1 from "../assets/bookcolor.png";
import toast from "react-hot-toast";


const Product = () => {
    const { setCart } = useContext(GlobalContext);
    const { cart } = useContext(GlobalContext);
    const { state } = useLocation();
    const { bookid } = state
    const [values, setValues] = useState([]);

    let username = '';
    let userid = '';
    let loginStatus = localStorage.getItem('login-status');
    if (loginStatus) {
        username = localStorage.getItem('username');
        userid = localStorage.getItem('userid');
    }

    useEffect(() => {
        let data = { id: bookid };
        try {
            axios.post('http://localhost:5000/homepage/product', data).then((response) => {
                let result = response.data;
                if (result !== false) {
                    setValues(result);
                } else if (result === false) {
                    alert("No data found");
                }
            });

        } catch (e) {

        }
    }, [bookid]);


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
                <div>Description</div>
            </div>
            <hr />
            <div>{values.map((obj) => {
                return (
                    <div className="product-box" key={obj.id}>
                        <div className="product-images">
                        <img src={img1} />
                        </div>
                        <div className="product-information">
                            <div className="product-title">{obj.title}</div>
                            <div className="product-publication">
                                <div className="gray-font">Editions by -</div>
                                {obj.publication}</div>
                            <div className="product-rating">{obj.rating} <MdStar color="gold" /> Rating</div>
                            <div className="product-description">
                                <div className="gray-font">overview</div>
                                {obj.description}</div>
                            <div className="product-author">
                                <div className="gray-font">Author</div>
                                {obj.author}</div>
                            <div className="product-genre">
                                <div className="gray-font">Genre</div>
                                {obj.genre}</div>
                            <div className="product-year">
                                <div className="gray-font">Year</div>
                                {obj.year}</div>
                            <div className="product-price">
                                <div className="gray-font">Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; stock</div>&euro; 
                                {obj.price} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {obj.stock} </div>

                            <button onClick={() => addToCart(obj.id)}>Add to Cart</button>
                            
                        </div>
                    </div>
                );
            })}


            </div>

        </>
    );
}

export default Product;