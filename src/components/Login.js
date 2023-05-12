import { login } from "../services/userService";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login({
    setIsLoggedIn
}) {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const userLogin = (e) => {
        e.preventDefault();
        login(values)
            .then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setIsLoggedIn(true);

                    setValues({
                        email: '',
                        password: '',
                    })

                    navigate('/movies');
                }
                else{
                    alert('Invalid email or password.')
                }
            })
            .catch(err => {
                throw new Error('Invalid email or password.')
            });
    }


    return (
        <>
            <div className="login">
                <form className="login-form" onSubmit={userLogin}>
                    <div id='login-text'>Login</div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={values.email} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={values.password} onChange={onChangeHandler} />
                    </div>

                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>
            </div>
        </>

    )
}