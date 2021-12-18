let page = 1
let currentCategory = ''
getMovies('now_playing')

function changeFunc() {
    const selectBox = document.getElementById("selectMovieType");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    getMovies(selectedValue);
}

async function getMovies(category) {
    document.getElementById('movies').innerHTML = ''
    const movies = await (await (await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=44c162a820528a8e43d118f1e143586e`)).json()).results
    for (const movie of movies) {
        document.getElementById('movies').innerHTML += `<a
            href="/rate?id=${movie.id}">
            <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}?api_key=44c162a820528a8e43d118f1e143586e">
        </a>`
    }
    currentCategory = category
}

document.addEventListener('scroll', async () => {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight + 500) {
        page++
        const movies = await (await (await fetch(`https://api.themoviedb.org/3/movie/${currentCategory}?api_key=44c162a820528a8e43d118f1e143586e&page=${page}`)).json()).results
        for (const movie of movies) {
            console.log(location.hostname == "joykhera.github.io")
            document.getElementById('movies').innerHTML += `<a
            href="${location.hostname == "joykhera.github.io" ? '/movieMeter' : ''}/rate?id=${movie.id}">
            <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}?api_key=44c162a820528a8e43d118f1e143586e">
        </a>`
        }
    }
})