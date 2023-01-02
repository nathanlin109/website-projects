// 1 On Page Load
window.onload = function () {
    document.querySelector("#search").onclick = searchButtonClicked;
    document.querySelector("#searchterm").addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            searchButtonClicked();
        }
    })
    document.querySelector("#limit").onchange = resetPageNum;
    document.querySelector("#limit").onchange = changeDisplayNum;
    document.querySelector("#searchterm").onchange = showLoading;
    document.querySelector(".favLoad").onclick = displayFavorite;
    getLastSearched();
    getRecentlySearched();
}


// 2 Define Variables
let displayTerm = "";
let previousDisplayTerm = "";
let pageNum = 0;
let url = "";
let showLoad = true;
let firstSearch = false;
let items = [];
let copyButtons = [];
let gifURLS = [];
let favGIFS = [];
let results = [];
let showFav = false;
let unfavClicked = false;
let alreadyFaved = false;

// 3 Search Button
function searchButtonClicked() {
    resetPageNum();
    firstSearch = true;
    //console.log("searchButtonClicked() called");


    let term = document.querySelector("#searchterm").value;
    displayTerm = term;
    previousDisplayTerm = displayTerm;
    if (displayTerm != "") {
        items.push(displayTerm);
        saveRecentlySearched();
        saveLastSearched(displayTerm);
        showFav = false;
    }

    createURL(displayTerm)

    if (showLoad == true) {
        document.querySelector("#status").innerHTML = "<strong>Awaiting results for '" + displayTerm + "'</strong>";
        showLoad = false;
    }

    //console.log(url);

    getData(url);
}

// Data Load
function getData(url) {
    if (displayTerm != "") {
        document.querySelector("#loader").innerHTML = `<img id="loading" src="images/spinner.gif" alt="loading"></img>`;
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

// Load Images and Details
function dataLoaded(e) {
    gifURLS = [];
    let xhr = e.target;
    //console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<strong>No results available for '" + previousDisplayTerm + "'</strong>";
        document.querySelector("#loader").innerHTML = "";
        document.querySelector("#topButtons").innerHTML = "";
        document.querySelector("#content").innerHTML = "";
        document.querySelector("#bottomButtons").innerHTML = "";
        if (displayTerm == "") {
            document.querySelector("#status").innerHTML = "<strong>Please enter a search term first.</strong>";
        }
        return;
    }

    results = obj.data
    let bigString = ""

    for (let i = 0; i < document.querySelector("#limit").value; i++) {
        let result = results[i + (pageNum * document.querySelector("#limit").value)];

        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-iamge-found.png";

        let url = result.url;
        gifURLS.push(url);

        // Gif
        let line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title='${result.title}'/></a>`;
        // Rating
        // Green = G
        if (result.rating.toUpperCase() == "G") {
            line += `<span><h4 style="color:green;">Rating: ${result.rating.toUpperCase()}</h4></span>`;
        }
        // Yellow = PG
        else if (result.rating.toUpperCase() == "PG") {
            line += `<span><h4 style="color:gold;">Rating: ${result.rating.toUpperCase()}</h4></span>`;
        }
        // Red = R
        else if (result.rating.toUpperCase() == "R") {
            line += `<span><h4 style="color:red;">Rating: ${result.rating.toUpperCase()}</h4></span>`;
        }
        // Orange = PG-13
        else {
            line += `<span><h4 style="color:orange;">Rating: ${result.rating.toUpperCase()}</h4></span>`;
        }

        // Adds a FAVORITED button
        parseFavorites();
        for (let i = 0; i < favGIFS.length; i++) {
            if (result.url == favGIFS[i].url) {
                line += `<button type="button" id="favorite${i}" class="favorite grey faved">Favorited!</button>`
                alreadyFaved = true;
            }
        }

        // Adds a FAVORITE button
        if (alreadyFaved == false) {
            line += `<button type="button" id="favorite${i}" class="favorite purple fav">Favorite!</button>`
        }
        else {
            alreadyFaved = false;
        }

        // Copy
        line += `<button type="button" id="copy${i}" class="purple copy">Copy!</button></div>`

        bigString += line;
    }
    // Top Next and Previous
    let topButtons = `<img src="images/reverseArrow.png" alt="previous" class="backward">`
    topButtons += `<img src="images/arrow.png" alt="next" class="forward">`

    // Bottom Next and Previous
    let bottomButtons = `<img src="images/reverseArrow.png" alt="previous" class="backward">`
    bottomButtons += `<img src="images/arrow.png" alt="next" class="forward">`

    document.querySelector("#topButtons").innerHTML = topButtons;
    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#bottomButtons").innerHTML = bottomButtons;
    document.querySelector("#status").innerHTML = "<strong><h3>" + previousDisplayTerm + "</h3></strong><h3><em>" + results.length + " results are displayed!</em></h3>";
    document.querySelector("#loader").innerHTML = "";
    let forwardButtons = document.querySelectorAll(".forward");
    let previousButtons = document.querySelectorAll(".backward");

    // Adds the next button event to forward buttons
    for (let button of forwardButtons) {
        button.onclick = nextButton;
    }

    // Adds the previous button event to forward buttons
    for (let button of previousButtons) {
        button.onclick = previousButton;
    }

    // Adds copy functionality
    let copyButtons = document.querySelectorAll(".copy");
    //console.log(copyButtons);
    for (l = 0; l < copyButtons.length; l++) {
        let num = l;
        copyButtons[l].onclick = function () {
            copy(num);
        }
    }

    // Adds favorite functionality
    let favoriteButtons = document.querySelectorAll(".favorite");
    //console.log(favoriteButtons);
    for (f = 0; f < favoriteButtons.length; f++) {
        let num = f;
        favoriteButtons[f].onclick = function () {
            addFavorite(num);
        }
    }
}

// Displays next gifs
function nextButton(e) {
    if (showFav == false) {
        if (results.length < 1000) {
            pageNum++;
            getData(createURL(previousDisplayTerm));
        }
    }
    else {
        if (favGIFS[(pageNum + 1) * document.querySelector("#limit").value] != null) {
            pageNum++;
            favLoaded();
        }
    }
}

// Displays previous gifs
function previousButton(e) {
    if (pageNum > 0) {
        pageNum--;
        if (showFav == false) {
            getData(createURL(previousDisplayTerm));
        }
        else {
            favLoaded();
        }
    }
}

// Resets page number upon clicking next or back arrows
function resetPageNum(e) {
    pageNum = 0;
}

// Shows the "searching for ____" only once for every string user inputs
function showLoading(e) {
    showLoad = true;
}

// Does a search whenever user changes number to display per page;
function changeDisplayNum(e) {
    if (showFav == false) {
        if (firstSearch == true) {
            resetPageNum();
            getData(createURL(previousDisplayTerm));
        }
    }
    else {
        resetPageNum();
        favLoaded();
    }
}

// Creates the URL
function createURL(currentDisplayTerm) {
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "XpCGEWN4Zf8YuBvgJAzJYl2V5tcaZrNl";

    url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    currentDisplayTerm = currentDisplayTerm.trim();
    currentDisplayTerm = encodeURIComponent(currentDisplayTerm);

    if (currentDisplayTerm.length < 1) return;

    url += "&q=" + currentDisplayTerm;
    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit * (pageNum + 1);
    return url;
}

// Saves ALL recently searched items
function saveRecentlySearched(e) {
    let savedList = "nzl6723-items-list";

    // Removes duplicates from recent searches
    items = items.filter((item, index) => {
        return items.indexOf(item) === index;
    })

    let stringifiedItems = JSON.stringify(items);
    localStorage.setItem(savedList, stringifiedItems)
}

// Retrieves ALL recently searched items
function getRecentlySearched(e) {
    let savedList = "nzl6723-items-list";
    items = localStorage.getItem(savedList);
    items = JSON.parse(items);

    if (items != null) {
        let bigString = "";
        for (let i = 0; i < items.length; i++) {
            bigString += `<option value="${items[i]}">`;
        }
        document.querySelector("#previousSearches").innerHTML = bigString;
    }
    else {
        items = [];
    }
}

// Saves the LAST searched item to the search box
function saveLastSearched(e) {
    savedTerm = "nzl6723-search-term";
    localStorage.setItem(savedTerm, e)
}

// Gets the LAST searched item and puts it in the search box
function getLastSearched(e) {
    let savedTerm = "nzl6723-search-term";
    searchTerm = localStorage.getItem(savedTerm);
    displayTerm = searchTerm;
    document.querySelector("#searchterm").value = displayTerm;
}

// Copies gif to clipboard
function copy(num) {
    let copyText = gifURLS[num];
    let url = document.createElement('textarea');
    url.value = copyText;
    //console.log(url.value);
    url.setAttribute('readonly', '');
    url.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
}

// Parses favorites from local storage
function parseFavorites(e) {
    let favList = "nzl6723-fav-list";
    favGIFS = localStorage.getItem(favList);
    favGIFS = JSON.parse(favGIFS);

    // Removes duplicates
    if (favGIFS != null) {
        for (let i = 0; i < favGIFS.length; i++) {
            for (let x = i + 1; x < favGIFS.length; x++) {
                if (favGIFS[i].url == favGIFS[x].url) {
                    favGIFS.splice(x, 1);
                    x--;
                }
            }
        }
    }
    else {
        favGIFS = [];
    }

    return favList;
}

// Add Fav gifs to local storage
function addFavorite(num) {
    favList = parseFavorites();

    if (favGIFS.indexOf(results[num]) == -1) {
        favGIFS.push(results[num + document.querySelector("#limit").value * pageNum]);
        document.querySelector(`#favorite${num}`).innerHTML = "Favorited!"
        document.querySelector(`#favorite${num}`).classList.remove("fav");
        document.querySelector(`#favorite${num}`).classList.remove("purple");
        document.querySelector(`#favorite${num}`).classList.add("grey");
        document.querySelector(`#favorite${num}`).classList.add("faved");
    }

    // Removes duplicates from favorites
    favGIFS = favGIFS.filter((item, index) => {
        return favGIFS.indexOf(item) === index;
    })

    let stringifiedItems = JSON.stringify(favGIFS);
    localStorage.setItem(favList, stringifiedItems)
}

// Remove Fav gifs to local storage
function removeFavorite(num) {
    favList = parseFavorites();

    // Removes specified gif
    favGIFS.splice(num, 1);

    // Goes down a page number if only 1 gif in page of fav
    if (favGIFS.length % document.querySelector("#limit").value == 0 && favGIFS.length != 0) {
        pageNum--;
    }

    let stringifiedItems = JSON.stringify(favGIFS);
    localStorage.setItem(favList, stringifiedItems)
    unfavClicked = true;
    displayFavorite();
}

// Displays the favorites
function displayFavorite() {
    showFav = true;

    // Keeps the same page if unfavorite was clicked and resets it if display fav was clicked
    if (unfavClicked == false) {
        resetPageNum();
    }
    {
        unfavClicked = false;
    }

    // Gets favorites
    parseFavorites();

    if (favGIFS.length != 0) {
        favLoaded();
    }
    else {
        document.querySelector("#status").innerHTML = "<strong>No Favorites saved!</strong>";
        document.querySelector("#topButtons").innerHTML = "";
        document.querySelector("#content").innerHTML = "";
        document.querySelector("#bottomButtons").innerHTML = "";
    }
}

// Load Favorites
function favLoaded(e) {
    document.querySelector("#loader").innerHTML = `<img id="loading" src="images/spinner.gif" alt="loading"></img>`;
    let bigString = "";
    gifURLS = [];

    if (favGIFS.length == 0) {
        document.querySelector("#loader").innerHTML = "";
        document.querySelector("#topButtons").innerHTML = "";
        document.querySelector("#content").innerHTML = "";
        document.querySelector("#bottomButtons").innerHTML = "";
        document.querySelector("#status").innerHTML = "<strong>You have no favorites! Go get some!</strong>";
        return;
    }

    for (let i = 0; i < document.querySelector("#limit").value; i++) {
        //console.log(document.querySelector("#limit").value);
        if (favGIFS[i + (pageNum * document.querySelector("#limit").value)] != null) {
            let fav = favGIFS[i + (pageNum * document.querySelector("#limit").value)];

            let smallURL = fav.images.fixed_width_downsampled.url;

            let url = fav.url;
            gifURLS.push(url);

            // GIF
            bigString += `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title='${fav.title}'/></a>`;
            // Rating
            // Green = G
            if (fav.rating.toUpperCase() == "G") {
                bigString += `<span><h4 style="color:green;">Rating: ${fav.rating.toUpperCase()}</h4></span>`;
            }
            // Yellow = PG
            else if (fav.rating.toUpperCase() == "PG") {
                bigString += `<span><h4 style="color:gold;">Rating: ${fav.rating.toUpperCase()}</h4></span>`;
            }
            // Red = R
            else if (fav.rating.toUpperCase() == "R") {
                bigString += `<span><h4 style="color:red;">Rating: ${fav.rating.toUpperCase()}</h4></span>`;
            }
            // Orange = PG-13
            else {
                bigString += `<span><h4 style="color:orange;">Rating: ${fav.rating.toUpperCase()}</h4></span>`;
            }
            // Unfavorite
            bigString += `<button type="button" id="unfavorite${i}" class="purple unfav">Unfavorite :(</button>`
            // Copy
            bigString += `<button type="button" id="copy${i}" class="purple copy">Copy!</button></div>`
        }
    }
    // Top Next and Previous
    let topButtons = `<img src="images/reverseArrow.png" alt="previous" class="backward">`
    topButtons += `<img src="images/arrow.png" alt="next" class="forward">`

    // Bottom Next and Previous
    let bottomButtons = `<img src="images/reverseArrow.png" alt="previous" class="backward">`
    bottomButtons += `<img src="images/arrow.png" alt="next" class="forward">`

    document.querySelector("#topButtons").innerHTML = topButtons;
    document.querySelector("#content").innerHTML = bigString;
    document.querySelector("#bottomButtons").innerHTML = bottomButtons;
    document.querySelector("#status").innerHTML = "<strong>Here are your favorites!</strong>";
    document.querySelector("#loader").innerHTML = "";
    let forwardButtons = document.querySelectorAll(".forward");
    let previousButtons = document.querySelectorAll(".backward");

    // Adds the next button event to forward buttons
    for (let button of forwardButtons) {
        button.onclick = nextButton;
    }

    // Adds the previous button event to forward buttons
    for (let button of previousButtons) {
        button.onclick = previousButton;
    }

    // Adds copy functionality
    let copyButtons = document.querySelectorAll(".copy");
    //console.log(copyButtons);
    for (l = 0; l < copyButtons.length; l++) {
        let num = l;
        copyButtons[l].onclick = function () {
            copy(num);
        }
    }

    // Adds unfavorite functionality
    let unfavoriteButtons = document.querySelectorAll(".unfav");
    //console.log(favoriteButtons);
    for (f = 0; f < unfavoriteButtons.length; f++) {
        let num = f;
        unfavoriteButtons[f].onclick = function () {
            removeFavorite(num + pageNum * document.querySelector("#limit").value);
        }
    }
}

// Error
function dataError(e) {
    console.log("An error occurred");
}