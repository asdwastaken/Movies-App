import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/userService';
import { useState } from 'react';
import { searchMovie } from '../services/movieService';



export default function Navbar({
    setIsLoggedIn,
    isLoggedIn,
    username,
    token,
    setSearchMovies
}) {


    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');

    const onChangeHandler = (e) => {
        setSearchValue(e.target.value);
    }


    const search = (e) => {
        e.preventDefault();

        searchMovie(searchValue)
            .then(result => {
                setSearchMovies(result);
                setSearchValue('');
                navigate('/movies/search')
            })

    }

    const logoutUser = () => {
        logout(token)
            .then(() => {
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                navigate('/');
            })
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* <NavLink className="navbar-brand" to={'/'}>Home</NavLink> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink to={'/'} className="nav-link" aria-current="page" >Home</NavLink>
                        <li className="nav-item">
                            <NavLink to={'/movies'} className="nav-link" aria-current="page" >Movies</NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark bg-dark">
                                <li><Link className="dropdown-item" to={'/movies/action'}>Action</Link></li>
                                <li><Link className="dropdown-item" to={'/movies/adventure'}>Adventure</Link></li>
                                <li><Link className="dropdown-item" to={'/movies/animation'}>Animation</Link></li>
                                <li><Link className="dropdown-item" to={'/movies/comedy'}>Comedy</Link></li>
                                <li><Link className="dropdown-item" to={'/movies/drama'}>Drama</Link></li>
                                <li><Link className="dropdown-item" to={'/movies/horror'}>Horror</Link></li>
                            </ul>
                        </li>

                        {isLoggedIn
                            ?
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logoutUser}>Logout</Link>
                            </li>
                            :
                            <>
                                <li className="nav-item">
                                    <NavLink to={'/login'} className="nav-link" >Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={'/register'} className="nav-link" >Register</NavLink>
                                </li>
                            </>
                        }

                    </ul>


                    <form className="d-flex" role="search" onSubmit={search}>
                        {isLoggedIn && <span id="greet">Hello, {username}</span>}
                        <input className="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={onChangeHandler} />
                        <button className="btn btn-outline-warning" type="submit">Search</button>
                    </form>



                </div>
            </div>
        </nav>
    )
}