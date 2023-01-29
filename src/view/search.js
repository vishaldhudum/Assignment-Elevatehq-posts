import React from 'react';

import '../content/css/search.css'

function Search(props) {

    let autocomplete, resultsHTML;

    React.useEffect(() => {
        autocomplete = document.getElementById("autocomplete");
        resultsHTML = document.getElementById("results");

        autocomplete.onfocus = setResults;
        autocomplete.oninput = setResults;

        autocomplete.onblur = function () {
            setTimeout(() => {
                resultsHTML.innerHTML = "";
            }, 100);
        }

        resultsHTML.onclick = function (event) {
            autocomplete.value = event.target.innerText;
            this.innerHTML = "";
            props.handleSearch(event.target.id)
        };
    });

    function setResults() {
        let results = [];
        const userInput = this.value;
        resultsHTML.innerHTML = "";
        if (userInput.length > 0) {
            results = getResults(userInput.toLowerCase());
            resultsHTML.style.display = "block";
            let list = ""
            if (results.length) {
                list = "<ul>";
                for (let i = 0; i < results.length; i++) {
                    list += "<li id=" + results[i].id + ">" + results[i].name + "</li>";
                }
                list += "</ul>";
            }
            resultsHTML.innerHTML = list;
        } else {
            props.handleSearch()
        }
    };

    function getResults(input) {
        const results = [];
        for (let i = 0; i < props.forum.users.length; i++) {
            let name = props.forum.users[i].name.toLowerCase()
            if (name.includes(input)) {
                results.push({
                    name: props.forum.users[i].name,
                    id: props.forum.users[i].id
                });
            }
        }
        return results;
    }

    return <div className='container'>
        <div className='search-wrapper'>
            <input type="search" id="autocomplete" placeholder="Search post by user"></input>
            <div id="results"></div>
        </div>
    </div>
}

export default Search;