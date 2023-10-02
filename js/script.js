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
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                container.innerHTML +=
                    `<div class="wrapper">
                        <div class="card">
                            <div class="poster">
                            <img src="picturs/White-Heart.png" id="heartIcon" data-favorite="false">
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
                    </div>`;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        heartIcon.addEventListener('click', saveFavorite)
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


function saveFavorite(){
localStorage.setItem("")
}







// const webFooter = document.getElementById("footer")
// webFooter.innerHTML = `<div class="footer-line"></div>
// <div class="footer-wrapper">
//     <section class="footer-top">
//         <div class="footer-headline">
//             <h2>Sign up to our newsletter</h2>
//             <p>
//                 Stay up to date with our news and articles
//             </p>
//         </div>
//         <div class="footer-subscribe">
//             <input type="email" spellcheck="false" placeholder="Your Email">
//             <button>
//                 Sign Up
//             </button>
//         </div>
//     </section>
//     <div class="footer-columns">
//         <section class="footer-logo">
//             <svg xmlns="http://www.w3.org/2000/svg" class="logo"
//                 fill="none" viewBox="30 30 126 126"
//             >
//                 <path d="M82.646 37.0917C85.7401 35.3054 89.552 35.3054 92.646 37.0917L133.614 60.7445L105.286 77.3318C100.901 72.9296 94.8325 70.2051 88.128 70.2051C81.1554 70.2051 74.871 73.1519 70.4523 77.8681L41.4416 60.8811L82.646 37.0917Z" fill="white"></path>
//                 <path d="M64.9303 87.4484L35.9141 70.4582V117.952L64.8222 101.025C64.2287 98.9258 63.9111 96.7109 63.9111 94.4219C63.9111 91.9977 64.2673 89.6567 64.9303 87.4484Z" fill="white"></path>
//                 <path d="M70.1924 110.694L41.8975 127.262L82.646 150.788C85.74 152.574 89.552 152.574 92.646 150.788L133.158 127.398L105.556 111.236C101.152 115.8 94.9714 118.639 88.128 118.639C81.0175 118.639 74.6227 115.574 70.1924 110.694Z" fill="white"></path>
//                 <path d="M111.22 101.739L139.376 118.226C139.377 118.162 139.378 118.098 139.378 118.034V70.1831L111.101 86.7403C111.908 89.154 112.345 91.7369 112.345 94.4219C112.345 96.9723 111.951 99.4305 111.22 101.739Z" fill="white"></path>
//             </svg>
//             <h2 class="hide">Astra</h2>
//         </section>
//         <section>
//             <h3>Product</h3>
//             <ul>
//                 <li>
//                     <a href="#" title="API">API</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Pricing">Pricing</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Documentation">Documentation</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Release Notes">Release Notes</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Status">Status</a>
//                 </li>
//             </ul>
//         </section>
//         <section>
//             <h3>Resources</h3>
//             <ul>
//                 <li>
//                     <a href="#" title="Support">Support</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Sitemap">Sitemap</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Newsletter">Newsletter</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Help Centre">Help Centre</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Investor">Investor</a>
//                 </li>
//             </ul>
//         </section>
//         <section>
//             <h3>Company</h3>
//             <ul>
//                 <li>
//                     <a href="#" title="About Us">About Us</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Blog">Blog</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Careers">Careers</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Press">Press</a>
//                 </li>
//                 <li>
//                     <a href="#" title="Contact">Contact</a>
//                 </li>
//             </ul>
//         </section>
//         <section>
//             <h3>Legal</h3>
//             <ul>
//                 <li>
//                     <a href="#" title="Terms and services">
//                         Terms
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" title="Privacy Policy">
//                         Privacy
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" title="Cookies">
//                         Cookies
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" title="Licenses">
//                         Licenses
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" title="Cookies">
//                         Contact
//                     </a>
//                 </li>
//             </ul>
//         </section>
//     </div>
//     <div class="footer-bottom">
//         <small>© My Company Ltd. <span id="year"></span>, All rights reserved</small>
//         <span class='social-links'>
//             <a href="#" title="Instagram">
//                 <img src="assets/instagram.svg" alt='Instagram'>                       
//             </a>
//             <a href="#" title="Linkedin">
//                 <img src="assets/linkedin.svg" alt='Linkedin'>
//             </a>
//             <a href="#" title="GitHub">
//                 <img src="assets/github.svg" alt='GitHub'>
//             </a>
//         </span>
//     </div>
// </div>`