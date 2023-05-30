import { Link } from "react-router-dom";


export default function Movies({ allMovies }) {


    return (
        <div className="movies">
            <h3>Comedy</h3>
            <div className="movies-cards">
                <div className="cards-section">
                    {allMovies.map(x =>
                        x.genres.includes('Comedy') &&
                        <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                            <img src={x.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <h3>Adventure</h3>
            <div className="movies-cards">
                <div className="cards-section">
                    {allMovies.map(x =>
                        x.genres.includes('Adventure') &&
                        <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                            <img src={x.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            <h3>Action</h3>
            <div className="movies-cards">
                <div className="cards-section">
                    {allMovies.map(x =>
                        x.genres.includes('Action') &&
                        <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                            <img src={x.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            <h3>Drama</h3>
            <div className="movies-cards">
                <div className="cards-section">
                    {allMovies.map(x =>
                        x.genres.includes('Drama') &&
                        <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                            <img src={x.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            <h3>Horror</h3>
            <div className="movies-cards">
                <div className="cards-section">
                    {allMovies.map(x =>
                        x.genres.includes('Horror') &&
                        <Link key={x._id} className="card" to={`/movies/${x._id}`}>
                            <img src={x.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    )



}