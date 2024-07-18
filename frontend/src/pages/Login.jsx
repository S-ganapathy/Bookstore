import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../globalData/GlobalContext';
import toast from 'react-hot-toast';


// function LoginRegister(){}
const LoginRegister = () => {

    const { setUser } = useContext(GlobalContext);
    //  mode ture means login if not register page
    const [mode, setMode] = useState(true);
    const [content, setContent] = useState({ username: "", password: "", email: "", repassword: "" });
    const [error, setError] = useState({ username: false, password: false, email: false, repassword: false })
    const [credential, setcredential] = useState(false);
    // mode ? { username: false, password: false } : 
    // mode ? { username: "", password: "" } : 
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("username")) 
            {
               navigate("/HomePage")
            }
        },[]);
    

    const submit = () => {
        if (mode) {
            let data = { username: content.username, password: content.password }
            if (content.username !== "" && content.password !== "") {
                // direct to database
                try {
                    axios.post('http://localhost:5000/login', data).then(response => {
                        let result = response.data;
                        if (result !== false) {
                            setcredential(false);
                            // destructure data
                            let { user } = result;
                            localStorage.setItem('login-status',true);
                            localStorage.setItem('username',user.username);
                            localStorage.setItem('userid',user.userid);
                            // load user to global context
                            let loginStatus=localStorage.getItem('login-status');
                            if(loginStatus){
                                let username=localStorage.getItem('username');
                                let userid=localStorage.getItem('userid');
                                let user={name:username,id:userid}
                                setUser(user);
                                
                            }
                            // navigate to next page
                            navigate('/HomePage');
                        } else if (result === false) {
                            setcredential(true);
                        }
                    });
                } catch (e) {
                    console.log(e)
                }

            } else if (content.username === "") {
                setError({ ...error, username: true });
            } else if (content.password === "") {
                setError({ ...error, password: true });
            }

        } else if (!mode) {
            if (content.username !== "" && content.password !== "" && content.email !== "" && content.repassword !== "") {
                if (content.password === content.repassword) {
                    // direct to database
                    let data = { username: content.username, email: content.email, password: content.password, level: 'user' };
                    try {
                        axios.post('http://localhost:5000/register', data).then(response => {
                            let result = response.data;
                            if (result === 'successfull') {
                                setMode(!mode);
                            }

                        });

                    } catch (e) {
                        console.log(e);
                    }

                } else {
                    // alert("both password must be same");
                    toast.error('Both password Must Be Same');
                }
            } else if (content.username === "") {
                setError({ ...error, username: true });
            } else if (content.email === "") {
                setError({ ...error, email: true });
            } else if (content.password === "") {
                setError({ ...error, password: true });
            } else if (content.repassword === "") {
                setError({ ...error, repassword: true });
            }
        }

    }

    return (
        <div className="box">
            <div className="form-box">
                <form>
                    <h1>{mode ? "Login" : "Sign up"}</h1>
                    {mode ? (<div className='form-element'>
                        <input className={error.username ? 'inputfield-err' : 'inputfield'} type="text" placeholder='Username/Email' value={content.username} onChange={(e) => setContent({ ...content, username: e.target.value })} />
                        <input className={error.password ? 'inputfield-err' : 'inputfield'} type='password' placeholder='Password' value={content.password} onChange={(e) => setContent({ ...content, password: e.target.value })} />
                        {credential ? <span style={{ color: "red" }}>username or password worng</span> : <span></span>}
                        <input className='inputbtn' type='button' value={mode ? "Login" : "sign in"} onClick={submit} />
                        <p>Don't have a account ?
                            <div>Create a new account <span style={{ color: "green" }} onClick={() => setMode(!mode)}>sign up</span></div>
                        </p>
                    </div>
                    ) : (<div className='form-element'>
                        <input className={error.username ? 'inputfield-err' : 'inputfield'} type='text' placeholder='Username' value={content.username} onChange={(e) => setContent({ ...content, username: e.target.value })} />
                        <input className={error.email ? 'inputfield-err' : 'inputfield'} type="email" placeholder='Email' value={content.email} onChange={(e) => setContent({ ...content, email: e.target.value })} />
                        <input className={error.password ? 'inputfield-err' : 'inputfield'} type='text' placeholder='Password' value={content.password} onChange={(e) => setContent({ ...content, password: e.target.value })} />
                        <input className={error.repassword ? 'inputfield-err' : 'inputfield'} type="text" placeholder='Confirm Password' value={content.repassword} onChange={(e) => setContent({ ...content, repassword: e.target.value })} />
                        <input className='inputbtn' type='button' value={mode ? "Login" : "sign in"} onClick={submit} />
                        <p>Already Have a account  ? <span style={{ color: "green" }} onClick={() => setMode(!mode)}>Log In</span> </p>
                    </div>
                    )}




                </form>
            </div>

        </div>
    );
}

export default LoginRegister;