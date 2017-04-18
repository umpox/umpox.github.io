//http://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup-->
var newsContentArea;
var weatherContentArea;
var articleContentArea;
var loadingIcon;
var refreshIcon;
var menuButtons;
var backBtnContainer;
var refreshBtnContainer;

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var DataStorage = indexedDB.open("ArticleDatabase", 1);

//Check for Service Worker support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function() { console.log('Service Worker Registered'); });
}

document.addEventListener("DOMContentLoaded", function() { 
    //Hide loading icon
    loadingIcon = document.getElementById('loading');
    loadingIcon.classList.add('hidden');

    //Load in SVGS after dom is displayed for quicker access
    backBtnContainer = document.getElementById('menuBanner-content-back');
    refreshBtnContainer = document.getElementById('menuBanner-content-refresh');
    backBtnContainer.innerHTML = '<img src="resources/back.svg">';
    refreshBtnContainer.innerHTML = '<img src="resources/refresh.svg">';

    //Set variables from DOM for use later
    newsContentArea = document.getElementById('newsContentArea');
    weatherContentArea = document.getElementById('weatherContentArea');
    articleContentArea = document.getElementById('articleContentArea');
    refreshIcon = document.getElementById('menuBanner-content-refresh');
    menuButtons = document.getElementById('menuButtonArea');

});


// Create the schema
DataStorage.onupgradeneeded = function() {
    var db = DataStorage.result;
    var articleList = db.createObjectStore("Articles", {keyPath: "id"});
};


var saveOffline = function(articleTitle, articleBody) {

    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");

    // Add some data
    articleList.put({id: 12345, data: {title: articleTitle, body: articleBody}});

    loadOfflineArticles();

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
};

var loadOfflineArticles = function() {
    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");

    // Query the data
    var getJohn = articleList.get(12345);

    getJohn.onsuccess = function() {
        console.dir(getJohn.result.data.title);  // => "John"
        console.dir(getJohn.result.data.body);
    };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
};

var loadNewsData = function() {
    loadingIcon.classList.remove('hidden');
    menuButtons.classList.add('hidden');
    newsContentArea.classList.remove('hidden');
    backBtnContainer.classList.remove('hidden');
    refreshBtnContainer.classList.remove('hidden');

    //URL to load news data
    var apiURL = 'https://umpox.github.io/essentials/data/news.json';

    //Variable to store current updated time 
    var currentTime = new Date();

    //Variables to store specific news data
    var newsTitle = '';
    var newsDesc = '';
    var newsURL = '';
    var newsID;

    //Make attempt to load URL data
    var newsAPI = new apiCall();
    newsAPI.get(apiURL, function(newsData) {
        //Successfully loaded

        //Convert string to JSON
        newsData = JSON.parse(newsData);
        var news = newsData.response.results;

        //Hide loading icon
        loadingIcon.classList.add('hidden');

        newsContentArea.innerHTML += `
            <a class="pure-u-24-24 newsMain" rel="amphtml">
                <h4 class="newsItem-title">Last updated: ${currentTime.toLocaleTimeString()}</h4>                
            </a>`;

        //Only read the articles part of the JSON
        for (var article in news) {
            newsTitle = news[article].webTitle;
            newsDesc = news[article].fields.trailText;
            newsURL = news[article].webUrl;
            newsID = news[article].id;

            newsURL = newsURL.replace('https://www', 'https://amp');

            newsContentArea.innerHTML += `
            <a class="pure-u-24-24 pure-button newsItem" onclick="loadArticle( '${newsID}' )" rel="amphtml">
                <p class="newsItem-title">${newsTitle}</p>
                <p class="newsItem-desc">${newsDesc}</p>
            </a>`;
        }
    });
};

var loadArticle = function(newsID) {
    loadingIcon.classList.remove('hidden');
    newsContentArea.classList.add('hidden');
    articleContentArea.classList.remove('hidden');

    var apiURL = `https://content.guardianapis.com/${newsID}?show-blocks=body&api-key=ac6c039d-e505-4c5e-ad69-0f7b1a29f98c`;

    //Variables to store article data
    var articleTitle;
    var articleBody;


    //Make attempt to load URL data
    var articleAPI = new apiCall();
    articleAPI.get(apiURL, function(apiData) {
        //Successfully loaded  

        //Variable to store offline button
        var offlineBtn;

        //Convert string to JSON
        articleData = JSON.parse(apiData);

        articleTitle = articleData.response.content.webTitle;
        articleBody = articleData.response.content.blocks.body[0].bodyTextSummary;

        //Hide loading icon
        loadingIcon.classList.add('hidden');

        articleContentArea.innerHTML = `
        <button class="pure-button" id="${newsID}">Save Offline</button>
        <h2 id="articleTitle">${articleTitle}</h2>
        <p id="articleBody">${articleBody}</p>`;
        
        offlineBtn = document.getElementById(newsID);
        offlineBtn.addEventListener('click', function() {
            saveOffline(articleTitle, articleBody);
        }, true);

    });
    
};


var loadWeatherData = function() {
    loadingIcon.classList.remove('hidden');
    menuButtons.classList.add('hidden');
    weatherContentArea.classList.remove('hidden');
    backBtnContainer.classList.remove('hidden');
    refreshBtnContainer.classList.remove('hidden');

    //URL to load weather data
    //var apiURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=4e65e289b57c474e618e2e41e73484f3&units=metric&q=Liverpool';
    var apiURL = 'https://umpox.github.io/essentials/data/weather.json';

    //Variable to store current updated time 
    var currentTime = new Date();

    //Variables to store weather data
    var weatherDate;
    var weatherDesc;
    var weatherTemp;
    var weatherCloud;

    //Make attempt to load URL data
    var weatherAPI = new apiCall();
    weatherAPI.get(apiURL, function(weatherData) {
        //Successfully loaded

        //Convert string to JSON
        weatherData = JSON.parse(weatherData);
        var cityData = weatherData.city;
        weatherData = weatherData.list;

        //Hide loading icon
        loadingIcon.classList.add('hidden');

        weatherContentArea.innerHTML += `
            <a class="pure-u-24-24 weatherMain" rel="amphtml">
                <h2 class="newsItem-title">${cityData.name}, ${cityData.country}</h2>
                <h4 class="newsItem-title">Last updated: ${currentTime.toLocaleTimeString()}</h4>                
            </a>`;

        //Only read the articles part of the JSON
        for (var day in weatherData) {
            weatherDesc = weatherData[day].weather[0].main;
            weatherTemp = Math.round(weatherData[day].temp.day);
            weatherCloud = weatherData[day].clouds;
            weatherDate = weatherData[day].dt;

            //Convert weatherDate to string day name
            weatherDate = convertToDay(weatherDate);

            console.dir(weatherData[day].weather);

            weatherContentArea.innerHTML += `
            <a class="pure-u-24-24 weatherItem" rel="amphtml">
                <h2 class="pure-u-12-24 weatherItem-date">${weatherDate}</h2>            
                <h2 class="pure-u-11-24 weatherItem-desc">${weatherDesc}</h2>
                <h2 class="pure-u-12-24 weatherItem-temp">${weatherTemp}°C</h2>
                <h2 class="pure-u-11-24 weatherItem-cloud">${weatherCloud}% Cloud</h2>
            </a>`;
        }
    });

};

var apiCall = function() {
    this.get = function(apiURL, apiCallbackFunc) {
        
        var apiRequest = new XMLHttpRequest();

        apiRequest.onreadystatechange = function() { 
            if (apiRequest.readyState == 4 && apiRequest.status == 200) {
                apiCallbackFunc(apiRequest.responseText);
                refreshIcon.classList.remove('refresh__rotate');
            }
            else {
                //Hide loading icon
                loadingIcon.classList.add('hidden');
            }
        };

        apiRequest.open( "GET", apiURL, true );            
        apiRequest.send( null );
    };
};

var refreshPage = function() {
    refreshIcon.classList.add('refresh__rotate');

    if (!newsContentArea.classList.contains('hidden')) {
        //News area must be currently displayed
        newsContentArea.innerHTML = "";
        loadNewsData();
    }
    else if (!weatherContentArea.classList.contains('hidden')) {
        //Weather area must be currently displayed
        weatherContentArea.innerHTML = "";
        loadWeatherData();
    }


};

var returnToMenu = function() {
    if (!articleContentArea.classList.contains('hidden')) {
        //User must be trying to return to the articles feed
        articleContentArea.classList.add('hidden');
        newsContentArea.classList.remove('hidden');
    }
    else {
        newsContentArea.classList.add('hidden');
        weatherContentArea.classList.add('hidden');
        backBtnContainer.classList.add('hidden');
        refreshBtnContainer.classList.add('hidden');
        menuButtons.classList.remove('hidden');
    }
};

var convertToDay = function(time) {
    var day = new Date(time * 1000).getDay();

    switch(day) {
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
        case 0:
            day = 'Sunday';
            break;
    }

    return day;
};




/* USED TO CALCULATE USERS LOCATION*/
//http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838