import './style.css';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllMovies } from "../src/services/movieService";

import Navbar from './components/Navbar';
import Movies from './components/Movies';
import ActionMovies from './components/MovieCategories/ActionMovies';
import AdventureMovies from './components/MovieCategories/AdventureMovies';
import AnimationMovies from './components/MovieCategories/AnimationMovies';
import ComedyMovies from './components/MovieCategories/ComedyMovies';
import DramaMovies from './components/MovieCategories/DramaMovies';
import HorrorMovies from './components/MovieCategories/HorrorMovies';


import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);



  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser !== null) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(loggedUser).username);
      setToken(JSON.parse(loggedUser).accessToken);
    }
  }, [isLoggedIn]);


  useEffect(() => {
    getAllMovies()
      .then(movies => {
        setAllMovies(movies);
      })
  }, [])




  return (

    <div className="App">
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} username={username} token={token} setSearchMovies={setSearchMovies} />

      <main>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movies' element={<Movies allMovies={allMovies} />}></Route>
          <Route path='/movies/:movieId' element={<MovieDetails isLoggedIn={isLoggedIn} token={token} />}></Route>
          <Route path='/movies/action' element={<ActionMovies allMovies={allMovies} />}></Route>
          <Route path='/movies/adventure' element={<AdventureMovies allMovies={allMovies} />}></Route>
          <Route path='/movies/animation' element={<AnimationMovies allMovies={allMovies} />}></Route>
          <Route path='/movies/comedy' element={<ComedyMovies allMovies={allMovies} />}></Route>
          <Route path='/movies/drama' element={<DramaMovies allMovies={allMovies} />}></Route>
          <Route path='/movies/horror' element={<HorrorMovies allMovies={allMovies} />}></Route>

          <Route path='/movies/search' element={<Search searchMovies={searchMovies} />}></Route>

          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} ></Route>
          <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} />}></Route>
        </Routes>



      </main>
    </div>

  );
}

export default App;
