//navBar//
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

let favourite_movies = JSON.parse(localStorage.getItem('favourite')) || [];
console.log(JSON.parse(localStorage.getItem('favourite')));

const container = document.getElementById("twentyContainer");
const paginationButtons = document.getElementById("paginationButtons");

let pageNumber = 1;
let currentSorting = "popularity.desc";

function loadMovies(page, sorting) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f4d65121a3b367edbdbd6b3a02f2721c&page=${page}&sort_by=${sorting}`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";
            data.results.forEach(movie => {
                const isLiked = favourite_movies.includes(movie.id); // Check if the movie ID is liked
                const likeButtonClass = isLiked ? 'userLiked':'';
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                container.innerHTML +=
                    `<div class="wrapper">
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
            });
            const USER_LIKED = document.querySelectorAll('.likeBtn');
        USER_LIKED.forEach((btn, i) => {
        btn.addEventListener('click', () => {
        btn.classList.toggle('userLiked');
        const movieId = data.results[i].id;
        const movieIndex = favourite_movies.indexOf(movieId);
        if (movieIndex === -1) {
            favourite_movies.push(movieId);
        } else {
            favourite_movies.splice(movieIndex, 1);
        }
        localStorage.setItem('favourite', JSON.stringify(favourite_movies));
    });
});
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.log(error);
        });
}

function createPaginationButtons(totalPages) {
    paginationButtons.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
            pageNumber = i;
            loadMovies(pageNumber, currentSorting);
        });
        paginationButtons.appendChild(button);
    }
}

function updateSorting(timeframe) {
    currentSorting = `popularity.${timeframe}_desc`;
    loadMovies(pageNumber, currentSorting);
}

createPaginationButtons(5);
loadMovies(pageNumber, currentSorting);
























