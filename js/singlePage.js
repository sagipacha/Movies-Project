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


const movieIndexInfo = document.getElementById("movieIndexInfo");
const movieButton = document.getElementById("getMovie");
const movieInfoContainer = document.getElementById("movieInfo");

function singularMovieInfo() {
    const movieId = movieIndexInfo.value;

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f4d65121a3b367edbdbd6b3a02f2721c&language=en-US&append_to_response=credits`)
        .then(response => response.json())
        .then(movieData => {

            console.log(movieData);
            const imageUrl = (`https://image.tmdb.org/t/p/w500${movieData.poster_path}`)
            const movieCast = movieData.credits.cast;
            const castList = movieCast.map(cast => `<li>${cast.name} as ${cast.character}</li>`).join("");
            movieInfoContainer.innerHTML = `<div class="container">
            <h1 class="movie-title" >${movieData.title}</h1>
            <img class="movie-poster" src="${imageUrl}" alt="${movieData.title} Poster">
            <br><br>
            <p class="overview" style="font-size:17px;font-weight:bold;">${movieData.overview} </p>
            <p class="release-date">Release Date : ${movieData.release_date}</p>
            <p class="genres">Genres : ${movieData.genres.map(genre => genre.name).join(", ")}</p>
            <p class="cast" style="font-size:17px;font-weight:bold;">Cast:</p>
                ${castList}
        </div><br><br>`










            // `<img src="${imageUrl}">
            // <h1>${movieData.title}</h1>
            // <p>${movieData.overview}</p>
            // <p>Release Date: ${movieData.release_date}</p>
            // <p>Genres: ${movieData.genres.map(genres => genres.name).join(", ")}</p>
            // <p>Cast:</p>
            // <ul>${castList}</ul>`;



            //     `<div class="wrapper" style="width:400px; height:400px">
            //     <div class="card">
            //         <div class="poster"><img src="${imageUrl}" alt="Location Unknown"></div>
            //         <div class="details">
            //             <h1>${movieData.title}</h1>
            //             <p>Release Date: ${movieData.release_date}</p>
            //             <p>Genres: ${movieData.genres.map(genres => genres.name).join(", ")}</p>
            //             <p>${movieData.overview}</p>
            //             <div class="tags">
            //                 <span class="tag">${movieData.popularity}</span>
            //             </div>
            //             <ul>${castList}</ul>
            //         </div>
            //     </div>
            // </div>`;


        })
        .catch(error => {
            console.error(error);
        });
}

movieButton.addEventListener("click", singularMovieInfo);