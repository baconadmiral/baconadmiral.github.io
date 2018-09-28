/* SearchTerm DB Structure
* databaseName - string name of the databaseName
* datastoreName - string name of the datastores
* version - version of the database, must be integer values
* properties - all of the attributes for a SearchTerm DB objectStore
* [ terms - the string of values searched for
*   domains - a list of domains searched through.
*    [  acronyms - true/false
*       glossary - true/false
*       handbook - true/false
*       *** may modify amount of domains in future ***
*    ]
* ]
*/
const searchTermsDB = "SearchTerms";
const searchTermsDS = "searchTerms";
const searchTermVersion = 1;
const searchTermProp = ["terms", "domains"];

function openSearchDB() {
  itemDB.open(searchTermsDB, searchTermVersion, searchTermsDS, "", searchTermProp, true, () => {
    console.log("SearchTerms Database opened...");
  });
}

var searchDomain = [];

function saveSearch() {
  let acrnm = document.getElementById("acrnm");
  let gloss = document.getElementById("gloss");
  let handbook = document.getElementById("aop-handbook");
  let terms = document.getElementById("autocomplete-input").value;

  if (terms === "") {
    console.log("Search Terms Required. Save cancelled.");
    return false;
  } else {
    //create item to save to database.
    let thisSearch = {
      "terms": terms,
      "domains": []
    };

    if (acrnm.checked) {
      thisSearch.domains.push("acronyms");
    }
    if (gloss.checked) {
      thisSearch.domains.push("glossary");
    }
    if (handbook.checked) {
      thisSearch.domains.push("handbook");
    }

    itemDB.createItem(searchTermsDS, thisSearch, () => {
      console.log(terms + " search saved successfully...");
    });
  }
}

function getAllSearches(callback) {

  itemDB.fetchAll(searchTermsDS, (results) => {

    callback(results);
  });
}

function searchInKey(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].key.includes(nameKey)) {
        area = myArray[i].area;
        if(area === 'gloss')
        {
          firstLetter = nameKey[0].toUpperCase();
        }
        else {
          firstLetter = nameKey[0].toLowerCase();

        }

          return nameKey + " - " + myArray[i].value;
      }
    }
    return "No Result Found";
}

function searchInValue(term, myArray) {
  let results = [];
  for (let i = 0; i < myArray.length; i++) {

    if (myArray[i].value.includes(term)) {
      area = myArray[i].area;
      if (area === "handbook-pdf") {
        let link = term + ' - <a href="../pdf/aop-handbook.pdf#page=' + myArray[i].page + '">' +
        myArray[i].key + '</a></br>'
        results.push(link);
      } else {
        let result = term + " - " + myArray[i].value + "</br>";
        results.push(result);
      }
    }
  }
  if (results.length <= 0) {
    return "No Result Found";
  } else {
    return results;
  }
}

function clearSearchInput()
{
  $("#autocomplete-input").value="";
}

function searchTerm() {
  //let results = searchInValue(term, searchDomain);
  let term = document.getElementById("autocomplete-input");

  if (term.value != '') {
    $("#search_title").html(term.value);
    $("#search_result").html( searchInValue(term.value, searchDomain) );
  } else {
    $("#search_result").html("Search Term Required.");
  }
}

function loadAcrnmIndecies() {
  let checkbox = document.getElementById("acrnm");

  // determine if the checkbox is checked.
  //if (checkbox.checked === true) {
    // put the indecies in the searchDomain.
    acrnmDomain.forEach( (index) => {
      searchDomain.push(index);
    });
  // } else {
  //   // remove the indecies from the searchDomain.
  // }
}

function loadGlossIndecies() {
  let checkbox = document.getElementById("gloss");

  // determine if the checkbox is checked.
  //if (checkbox.checked === true) {
    // put the indecies in the searchDomain.
    glossDomain.forEach( (index) => {
      searchDomain.push(index);
    });
  // } else {
  //   // remove the indecies from the searchDomain.
  // }

}

function loadHandbookIndecies() {
  let checkbox = document.getElementById("aop-handbook");

  // determine if the checkbox is checked.
  //if (checkbox.checked === true) {
    // put the indecies in the searchDomain.
    handbookDomain.forEach( (index) => {
      searchDomain.push(index);
    });
  // } else {
  //   // remove the indecies from the searchDomain.
  // }
}

//load SearchDomain
// loadAcrnmIndecies();
// loadGlossIndecies();
// loadHandbookIndecies();
setTimeout( () => {
  loadAcrnmIndecies();
  loadGlossIndecies();
  loadHandbookIndecies();
}, 1000); //WHY DOES THIS WORK?!?!?!?!?!?!


// finish this function when implementing the remove indecies in the above 3 functions.
function getIndex(type) {
  let acrnms = document.getElementById("acrnm");
  let gloss = document.getElementById("gloss");
  let book = document.getElementById("aop-handbook");
  let index;

  if (type === "Gloss"){

  } else if (type === "Handbook") {

  }

}

function displaySearchesInBinder() {
  let viewResults = document.getElementById("searches");
  // viewResults.innerHTML = "";


  getAllSearches( (results) => {
    if (results.length === 0) {
      document.getElementById("searchesBlurb").style.display = "block";
    } else {
      document.getElementById("searchesBlurb").style.display = "none";

      let searchUl = document.getElementById("searchList");
      if (searchUl == null) {
        searchUl = document.createElement("ul");
        searchUl.setAttribute("id", "searchList");
      } else {
        searchUl.innerHTML = "";
      }



      results.forEach( (result) => {
        let termLi = document.createElement("li");
        let text = '"' + result.terms + '" in domains:';
        result.domains.forEach( (domain) => {
          text += ' "' + domain + '"';
        });

        text += ".";

        let record = document.createTextNode(text);
        termLi.appendChild(record);
        searchUl.appendChild(termLi);

      });

      if (!$('searches').find('#searchList').length) {

        viewResults.appendChild(searchUl);
      }

    }
  });
}

openSearchDB();
