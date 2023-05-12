import { useState } from "react";
import { register } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsLoggedIn }) {

    const navigate = useNavigate();


    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChangeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const registerUser = (e) => {
        e.preventDefault();

        if (values.password !== values.confirmPassword) {
            alert('Passwords should match')
            return;
        }
        register(values)
            .then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setIsLoggedIn(true);

                    setValues({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })

                    navigate('/movies');
                } else {
                    alert('There is a user registered with this email')
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <div className="register">
                <form className="register-form" onSubmit={registerUser}>
                    <div id='register-text'>Register</div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" value={values.username} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={values.email} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={values.password} onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputConfPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputConfPassword1" name="confirmPassword" value={values.confirmPassword} onChange={onChangeHandler} />
                    </div>


                    <button type="submit" className="btn btn-warning">Submit</button>
                </form>
            </div>
        </>

    )
}