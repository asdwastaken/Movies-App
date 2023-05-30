
import { useParams } from "react-router-dom";
import { getAllMovieLikes, getOneMovie, getOneMovieLike, likeMovie, unlikeMovie } from "../services/movieService";
import { useEffect, useState } from "react";


export default function MovieDetails( { isLoggedIn, token }) {


    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const { movieId } = useParams('movieId');
    const [movie, setMovie] = useState({});
    const [likedMovie, setLikedMovie] = useState(false);
    const [allMovieLikes, setAllMovieLikes] = useState('');

    useEffect(() => {
        getOneMovie(movieId)
            .then(result => {
                setMovie(result);
                getOneMovieLike(movieId, userId)
                    .then((res) => {
                        if (res) {
                            setLikedMovie(true);
                        }
                    })
            })

        getAllMovieLikes(movieId)
            .then((result) => setAllMovieLikes(result))
    }, [movieId])


    const onLikeMovieClick = () => {
        likeMovie(movieId, userId, token)
            .then(() => {
                setLikedMovie(true)
                getAllMovieLikes(movieId)
                    .then((result) => setAllMovieLikes(result))
            });

    }

    const onUnlikeMovieClick = async () => {
        let like = await getOneMovieLike(movieId, userId);
        unlikeMovie(like._id, token)
            .then(() => {
                setLikedMovie(false)
                getAllMovieLikes(movieId)
                    .then((result) => setAllMovieLikes(result))
            });
    }


    return (

        <div className="movie-details-container">
            <h1>{movie.title}</h1>
            <div className="movie-details">
                <iframe width="700" height="450" className="movie-video"
                    src={movie.trailer}>
                </iframe>
                <div className="movie-img-and-desc">
                    <div>
                        <img src={movie.img} className="movie-details-img" />
                    </div>
                    <div className="movie-details-desc-and-likes">
                        <p>{movie.description}</p>
                        <div className="likes-section">
                            <div>Likes: {allMovieLikes}</div>

                            {isLoggedIn && <button type="button" className={likedMovie ? "btn btn-outline-danger active" : "btn btn-outline-danger"} onClick={likedMovie ? onUnlikeMovieClick : onLikeMovieClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                </svg>
                            </button>

                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}