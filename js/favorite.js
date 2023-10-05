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

document.addEventListener("DOMContentLoaded", () => {
    let likedMoviesArray = JSON.parse(localStorage.getItem("likedMovies")) || [];
    const likedMoviesList = document.getElementById("likedMoviesList");
    const resetButton = document.getElementById("resetButton");

    function createMovieCard(movieData) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const movieTitle = document.createElement("p");
    movieTitle.textContent = `Title:${movieData.title}`;

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/original${movieData.poster_path}`;
    moviePoster.style.width = "10%";
    moviePoster.alt = movieData.title;

    const heartIcon = document.createElement("i");
    const isLiked = likedMoviesArray.some((movie) => movie.id === movieData.id);
    heartIcon.className = `heart-icon ${
        isLiked ? "fa-solid" : "fa-regular"
    } fa-heart`;
    heartIcon.style.color = isLiked ? "#ff0000" : "";

    heartIcon.addEventListener("click", () => {
        const index = likedMoviesArray.findIndex(
        (movie) => movie.id === movieData.id
        );
        if (index !== -1) {
        likedMoviesArray.splice(index, 1);
        } else {
        likedMoviesArray.push(movieData);
        }
        updateLocalStorage();
        displayLikedMovies();
    });

    movieCard.appendChild(movieTitle);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(heartIcon);

    return movieCard;
    }

    function updateLocalStorage() {
    localStorage.setItem("likedMovies", JSON.stringify(likedMoviesArray));
    }

    function displayLikedMovies() {
    likedMoviesList.innerHTML = "<h2>Liked Movies</h2>";
    const movieCardContainer = document.createElement("div");
    movieCardContainer.className = "movie-card-container";

    likedMoviesArray.forEach((movieData) => {
        const movieCard = createMovieCard(movieData);
        movieCardContainer.appendChild(movieCard);
    });

    likedMoviesList.appendChild(movieCardContainer);
    }

    displayLikedMovies();

    resetButton.addEventListener("click", () => {
    localStorage.removeItem("likedMovies");
    likedMoviesArray = [];
    updateLocalStorage();
    displayLikedMovies();
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMoviesArray));
});