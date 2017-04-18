//http://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup-->
var newsContentArea;
var weatherContentArea;
var articleContentArea;
var offlineContentArea;
var offlineArticleArea;
var loadingIcon;
var refreshIcon;
var menuButtons;
var backBtnContainer;
var refreshBtnContainer;
var headerText;

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
    offlineContentArea = document.getElementById('offlineContentArea');
    offlineArticleArea = document.getElementById('offlineArticleArea')
    refreshIcon = document.getElementById('menuBanner-content-refresh');
    menuButtons = document.getElementById('menuButtonArea');
    headerText = document.getElementById('menuBanner-content-text');
});


// Create the schema
DataStorage.onupgradeneeded = function() {
    var db = DataStorage.result;
    var articleList = db.createObjectStore("Articles", {keyPath: "id"});
};


var saveOffline = function(articleTitle, articleBody, buttonHTML) {
    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");
    // Add some data
    articleList.put({id: new Date().getTime(), data: {title: articleTitle, body: articleBody}});
    buttonHTML.innerHTML = 'Saved!';
};

var loadOfflineArticles = function() {
    offlineContentArea.innerHTML = '';
    loadingIcon.classList.remove('hidden');
    menuButtons.classList.add('hidden');
    offlineContentArea.classList.remove('hidden');
    backBtnContainer.classList.remove('hidden');
    refreshBtnContainer.classList.remove('hidden');

    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");

    // Query the data
    var articles = articleList.getAll();

    articles.onsuccess = function() {
        loadingIcon.classList.add('hidden');
        //Narrow the object to only show relevant data
        articles = articles.result;

        for (var article in articles) {
            offlineContentArea.innerHTML += `
            <a class="pure-u-24-24 pure-button newsItem" onclick="loadOfflineDetails(${articles[article].id})">
                <p class="newsItem-title">${articles[article].data.title}</p>
            </a>`;
        }
    };
};

var loadOfflineDetails = function(articleID) {
    loadingIcon.classList.remove('hidden');
    offlineContentArea.classList.add('hidden');

    //Clear previous article data
    offlineArticleArea.innerHTML = '';

    offlineArticleArea.classList.remove('hidden');

    //Scroll to top of page
    window.scrollTo(0,0);

    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");

    //Find the specific article that the user is trying to view
    var articleContent = articleList.get(articleID);

    articleContent.onsuccess = function() {
        loadingIcon.classList.add('hidden');
        //Narrow the object to only show relevant data
        articleContent = articleContent.result;

        //Display the content
        offlineArticleArea.innerHTML = `
            <button class="pure-button btnDelete" id="${articleContent.id}" onclick="deleteOfflineArticle(${articleContent.id})">Delete</button>
            <h2 id="articleTitle">${articleContent.data.title}</h2>
            <p id="articleBody">${articleContent.data.body}</p>`;      
    };

};

var deleteOfflineArticle = function(articleID) {
    var db = DataStorage.result;
    var tx = db.transaction("Articles", "readwrite");
    var articleList = tx.objectStore("Articles");

    //Find the specific article that the user is trying to view
    var articleContent = articleList.delete(articleID)

    articleContent.onsuccess = function() {
        offlineArticleArea.classList.add('hidden');
        loadOfflineArticles();
    };
};

var loadNewsData = function() {
    loadingIcon.classList.remove('hidden');
    menuButtons.classList.add('hidden');
    newsContentArea.classList.remove('hidden');
    backBtnContainer.classList.remove('hidden');
    refreshBtnContainer.classList.remove('hidden');

    //Set the header text
    headerText.innerHTML = '<h1>News</h1>'

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
            <a class="pure-u-24-24 newsMain">
                <h4 class="newsItem-title">Last updated: ${currentTime.toLocaleTimeString()}</h4>                
            </a>`;

        //Only read the articles part of the JSON
        for (var article in news) {
            newsTitle = news[article].webTitle;
            newsDesc = news[article].fields.trailText;
            newsURL = news[article].webUrl;
            newsID = news[article].id;


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

    //Clear previous article data
    articleContentArea.innerHTML = '';

    articleContentArea.classList.remove('hidden');

    //Scroll to top of page
    window.scrollTo(0,0);

    var apiURL = `https://content.guardianapis.com/${newsID}?show-blocks=body&api-key=ac6c039d-e505-4c5e-ad69-0f7b1a29f98c`;

    //Variables to store article data
    var articleTitle;
    var articleBody;
    var articleURL;


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
        articleURL = articleData.response.content.webUrl;

        //Convert Guardian URL to AMP Url
        articleURL = articleURL.replace('https://www', 'https://amp');

        //Hide loading icon
        loadingIcon.classList.add('hidden');

        articleContentArea.innerHTML = `
        <button class="pure-button btnSave" id="${newsID}">Save Offline</button>
        <h2 id="articleTitle">${articleTitle}</h2>
        <p id="articleBody">${articleBody}</p>
        <a class="pure-button ampLoad" href="${articleURL}" rel="amphtml">Original AMP article</a>`;
        
        offlineBtn = document.getElementById(newsID);
        offlineBtn.addEventListener('click', function() {
            saveOffline(articleTitle, articleBody, this);
        }, true);

    });
    
};


var loadWeatherData = function() {
    loadingIcon.classList.remove('hidden');
    menuButtons.classList.add('hidden');
    backBtnContainer.classList.remove('hidden');
    refreshBtnContainer.classList.remove('hidden');

    //Reset content in weatherArea
    weatherContentArea.innerHTML = '';
    weatherContentArea.classList.remove('hidden');

    //Set the header text
    headerText.innerHTML = '<h1>Weather</h1>'

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
            <a class="pure-u-24-24 weatherMain">
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
            <a class="pure-u-24-24 weatherItem">
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

        //Remove the cached file
        caches.open('essentialsPWA-v1').then(function(cache) {
            cache.delete('https://umpox.github.io/essentials/news.json').then(function(response) {
                loadNewsData();
            });
        })
    }
    else if (!weatherContentArea.classList.contains('hidden')) {
        //Weather area must be currently displayed
        weatherContentArea.innerHTML = "";

        //Removed the cached file
        caches.open('essentialsPWA-v1').then(function(cache) {
            cache.delete('https://umpox.github.io/essentials/weather.json').then(function(response) {
                loadWeatherData();
            });
        })

    }
};

var returnToMenu = function() {
    if (!articleContentArea.classList.contains('hidden')) {
        //User must be trying to return to the articles feed
        articleContentArea.classList.add('hidden');
        newsContentArea.classList.remove('hidden');
    }
    else if(!offlineArticleArea.classList.contains('hidden')) {
        //User must be trying to return to the offline articles feed
        offlineArticleArea.classList.add('hidden');

        //Reload offline articles as the user could have deleted one
        loadOfflineArticles();        
    }
    else {
        //Set the header text
        headerText.innerHTML = '<h1>News</h1>'

        newsContentArea.classList.add('hidden');
        weatherContentArea.classList.add('hidden');
        offlineContentArea.classList.add('hidden');
        backBtnContainer.classList.add('hidden');
        refreshBtnContainer.classList.add('hidden');
        menuButtons.classList.remove('hidden');
    }
};

var convertToDay = function(time) {
    var day = new Date(time * 1000).getDay();

    //Convert numeric day to textual data
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