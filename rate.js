const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
(async () => {
    const movie = await (await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=44c162a820528a8e43d118f1e143586e`)).json()
    const movieCredits = await (await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=44c162a820528a8e43d118f1e143586e`)).json()
    console.log(movie)
    document.getElementById('h1').innerHTML = `<center><a href='https://www.imdb.com/title/${movie.imdb_id}/'>${movie.title}</a></center>`
    document.getElementById('img').src = `http://image.tmdb.org/t/p/w185${movie.poster_path}?api_key=44c162a820528a8e43d118f1e143586e`
    document.getElementById('releaseDate').innerHTML = '<b>Release Date: </b>' + movie.release_date
    document.getElementById('genre').innerHTML = '<b>Genre: </b>' + movie.genres.map((i) => i.name).toString().replaceAll(',', ', ')
    document.getElementById('actors').innerHTML = '<b>Actors: </b>' + movieCredits.cast.map((i) => i.name).slice(0, 5).toString().replaceAll(',', ', ')
    document.getElementById('summary').innerHTML = '<b>Summary: </b>' + movie.overview
})()