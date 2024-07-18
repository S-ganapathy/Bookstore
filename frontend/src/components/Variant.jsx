import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = (props) => {
    let column = props.value
    const [values, setValues] = useState([]);
    let data = { column: props.value }
    const navigate = useNavigate();

    useEffect(() => { getdata(); }, [props]);

    function getdata() {

        try {
            axios.post('http://localhost:5000/homepage', data).then((response) => {
                var temp = response.data;
                setValues(temp);
            });

        } catch (e) {
            console.log(e);
        }

    }

    // console.log("outside try");
    // console.log(values)

    const selectedcategory = (selected) => {
        navigate('/HomePage/Products', { state: { value: selected, column: column } });
    }




    return (
        <>
            <div className='render-box'>
                {values.map((obj) => {
                    return (
                        <div className='render-ele' onClick={() => selectedcategory(obj[column])}>{obj[column]}</div>
                    );
                })}
            </div>

        </>
    );
}


export default Category;