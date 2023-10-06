const navBar = document.querySelector("#navBar");
navBar.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary" style="margin-top: 0px;">
<div class="container-fluid">
<a class="navbar-brand" href="index.html" style="font-size: 16px; color: azure;">HOME</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarScroll">
    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
    <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="singlePage.html" style="font-size: 16px; color: azure;">SINGLE MOVIE</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="about.html" style="font-size: 16px; color: azure;">ABOUT</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="search.html" style="font-size: 16px; color: azure;">SEARCH</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="favorite.html" style="font-size: 16px; color: azure;">FAVORITE</a>
    </li>
</div>
</div>
</nav>`


let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || [];
console.log(JSON.parse(localStorage.getItem('favourite')));
const FAVORITE_CONTAINER=document.querySelector('#listMovieSearch')
const OPTIONS = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGQ2NTEyMWEzYjM2N2VkYmRiZDZiM2EwMmYyNzIxYyIsInN1YiI6IjY1MTZiMmI5ZWE4NGM3MDBjYTA2Y2M2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mKnxwB8LtvWEcTPzL7c5ldXkxH6mcwqNqktS3Rg5P6s'
    }
};
const FETCH_MOVIE = (idMovie) => {
    fetch(`https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`, OPTIONS)
        .then(response => response.json())
        .then(movie => {
            console.log(movie)
            const isLiked = favourite_movies.includes(movie.id); 
            const likeButtonClass = isLiked ? 'userLiked' : '';
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            FAVORITE_CONTAINER.innerHTML += `<div class="wrapper">
            <div class="card">
                <div class="poster">
                <img src="${posterUrl}" alt="Location Unknown">
                </div>
                <div class="details">
                    <h1>${movie.original_title}</h1>
                    <h2>${movie.release_date}</h2>
                    <div class="tags">
                        <span class="tag">${movie.popularity}</span>
                    </div>
                    <p class="desc">${movie.overview}</p>
                </div>
            </div>
            <button class='likeBtn ${likeButtonClass}'> <i class="fa fa-thumbs-up" aria-hidden="true"></i>like</button>
        </div>`;
            
            const USER_LIKED = document.querySelectorAll('.likeBtn');
            USER_LIKED.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('userLiked');
                    const movieId = movie.id;
                    const movieIndex = favourite_movies.indexOf(movieId);
                    if (movieIndex === -1) {
                        favourite_movies.push(movieId);
                    } else {
                        const userConfirmed = confirm('Are you sure you want to remove the movie from your favorites?');
                        if (userConfirmed) {
                            favourite_movies.splice(movieIndex, 1);
                            
                            location.reload();
                        } else {
                            btn.classList.add('userLiked');
                            return;
                        }
                    }
                    localStorage.setItem('favourite', JSON.stringify(favourite_movies));
                });
            });
        })

        .catch(err => console.error(err));
}

if (favourite_movies.length > 0) {
    console.log(true);
    favourite_movies.forEach((movie) => {
        FETCH_MOVIE(movie)
    });
}
else {
    console.log(false);
}
localStorage.clear();