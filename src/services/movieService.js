

const baseUrl = 'http://localhost:3030/data/movies';


export const getAllMovies = () => {
    return fetch(baseUrl)
        .then(res => res.json())
        .then(movies => {
            return movies;
        })
}



export const getOneMovie = (movieId) => {
    return fetch(`${baseUrl}/${movieId}`)
        .then(res => res.json())
        .then(movie => {
            return movie;
        })
}


export const likeMovie = (movieId, userId, accessToken) => {
    return fetch(`http://localhost:3030/data/likes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-authorization': accessToken
        },
        body: JSON.stringify({
            movieId,
            userId
        })
    })
}

export const getOneMovieLike = (movieId, userId) => {
    const query = encodeURIComponent(`movieId="${movieId}" AND _ownerId="${userId}"`)
    return fetch(`http://localhost:3030/data/likes?where=${query}`)
        .then(res => res.json())
        .then(result => {
            return result[0];
        })

}

export const unlikeMovie = (likeId, accessToken) => {

    return fetch(`http://localhost:3030/data/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
            'X-authorization': accessToken
        }
    })
}




export const getAllMovieLikes = (movieId) => {
    const query = encodeURIComponent(`movieId="${movieId}"`)
    return fetch(`http://localhost:3030/data/likes?where=${query}`)
        .then(res => res.json())
        .then(result => result.length)
}


export const searchMovie = (searchValue) => {
    const query = encodeURIComponent(`title LIKE "${searchValue}"`);

    return fetch(`http://localhost:3030/data/movies?where=${query}`)
        .then(res => res.json())
        .then(result => {
            return result;
        })
}