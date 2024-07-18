import { useState } from "react";
import '../App.css';
import Category from "../components/Variant";
import AllProducts from "../components/AllProducts";
import { IoFilter } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";


const HomePage = () => {
    const [category, setCategory] = useState('genre');
    const [visble,setVisble]=useState(false);

    let username = '';
    let userid = '';
    let loginStatus = localStorage.getItem('login-status');
    if (loginStatus) {
        username = localStorage.getItem('username');
        userid = localStorage.getItem('userid');
    }


    return (
        <>
            <div className="heading-filter">
                <div className="heading"> Wise Your Knowledge With Great Writing . . .</div>
                <div className="filter" onClick={()=>setVisble(!visble)}>{visble?<MdFilterListOff size={30} />:<IoFilter size={25} />}</div>
            </div>
            {visble?(<>
            <div className="category-box">
                <div className="categories" style={category === 'genre' ? { backgroundColor: "gray" } : { backgroundColor: "gainsboro" }} onClick={() => setCategory('genre')}>Genre</div>
                <div className="categories" style={category === 'year' ? { backgroundColor: "gray" } : { backgroundColor: "gainsboro" }} onClick={() => setCategory('year')}>Year</div>
                <div className="categories" style={category === 'author' ? { backgroundColor: "gray" } : { backgroundColor: "gainsboro" }} onClick={() => setCategory('author')}>Author</div>
                <div className="categories" style={category === 'publication' ? { backgroundColor: "gray" } : { backgroundColor: "gainsboro" }} onClick={() => setCategory('publication')}>Publication</div>
            </div>
            <Category value={category} />
            </>):(<></>)}
            <AllProducts />

        </>
    );
}


export default HomePage;