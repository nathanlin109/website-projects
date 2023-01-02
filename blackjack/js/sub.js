"use strict";

// Setup
document.querySelector("#home").innerHTML = "Home";
document.querySelector("#home").onclick = link;

// Link to Documentation
function link()
{
    location.replace("index.html")
}