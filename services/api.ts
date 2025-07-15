export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    },
}

export const fetchPoplarMovies = async ({query} : {query: string}) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` // If a query is provided, use the search endpoint
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;// If no query is provided, use the discover endpoint

    const repsonse = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!repsonse.ok) {
        throw new Error(`Failed to fetch movies: ${repsonse.statusText}`);
    }

    const data = await repsonse.json();
    return data.results;
}

// const url = 'BASE_URL'; // Replace with the actual URL you want to fetch
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer EXPO_PUBLIC_MOVIE_API_KEY', // Replace with your actual API key
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));