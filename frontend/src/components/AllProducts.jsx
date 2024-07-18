import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import img2 from "../assets/bookopen.png";
import toast, { Toaster } from 'react-hot-toast';

const AllProducts = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/homepage/allproducts').then((response) => {
                let result = response.data;
                if (result !== false) {
                    setValues(result);
                } else if (result === false) {
                    alert("No data found");
                }
            });

        } catch (e) {
            console.log(e);
        }
    }, []);

    const describe = (id) => {
        navigate('/HomePage/Product', { state: { bookid: id } });

    }

    return (
        <>
            <hr />
            <div className="all-products">
                {values.map((obj) => {
                    return (
                        <div className="books" key={obj.id} onClick={() => describe(obj.id)}>
                            <div className="img-div">
                                <img src={img2} />

                            </div>
                            <div className="book-name">
                                {obj.title}
                            </div>
                            <div className="bookprice-rating">
                                <div style={{ color: 'gold' }}>{obj.rating}</div>
                                <div style={{ color: 'yellowgreen' }}>&euro; {obj.price}</div>
                            </div>

                        </div>
                    );
                })}

            </div>
            
        </>
    );
}

export default AllProducts;