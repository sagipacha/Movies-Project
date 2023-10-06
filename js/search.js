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

const myInput = document.getElementById("myInput");


function searchMoviesDisplay(pageName) {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${pageName}&api_key=bc1f09cc15ddc7d57d1d665f10e1e5a6`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movieContainer = document.getElementById("movieContainer");
            const moviesHTML = data.results
                .map(movie => {
                    const posterUrl = (`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
                    return `<div class="wrapper">
                    <div class="card">
                        <div class="poster">
                        <img src="${posterUrl}" alt="Location Unknown">
                        </div>
                        <div class="details">
                            <p class="desc">${movie.overview}</p>
                        </div>
                    </div>
                </div>`;
                
                })
                .join("");

            movieContainer.innerHTML = moviesHTML;
        })
        .catch(error => {
            console.log(error);
        });
}

myInput.addEventListener("input", () => {
    searchMoviesDisplay(myInput.value);
});