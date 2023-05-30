import { Link } from "react-router-dom";

export default function Search({
    searchMovies,

}) {


    return (
        <div className="movies-category-container">
            {searchMovies.length !== 0 ?
                <div className="movies-category">
                    <div className="cards-category-section">
                        {searchMovies.map(x =>
                            <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                                <img src={x.img} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{x.title}</h5>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                :
                <h3>No movies found</h3>
            }
        </div>
    )



}