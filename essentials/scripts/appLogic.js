//http://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup-->
var newsContentArea;
var loadingIcon;
var refreshIcon;
var menuButtons;

document.addEventListener("DOMContentLoaded", function() { 
    newsContentArea = document.getElementById('newsContentArea');
    loadingIcon = document.getElementById('loading');
    refreshIcon = document.getElementById('menuBanner-content-refresh');
    menuButtons = document.getElementById('menuButtonArea');
});

var loadNewsData = function() {
    menuButtons.classList.add('hidden');
    newsContentArea.classList.remove('hidden');
    //URL to load news data
    var apiURL = 'https://content.guardianapis.com/world?show-fields=trailText&api-key=ac6c039d-e505-4c5e-ad69-0f7b1a29f98c';

    //Variables to store specific news data
    var newsTitle = '';
    var newsDesc = '';
    var newsURL = '';

    //Make attempt to load URL data
    var newsAPI = new apiCall();
    newsAPI.get(apiURL, function(newsData) {
        //Successfully loaded
        //Hide loading icon
        loadingIcon.classList.add('hidden');

        //Convert string to JSON
        newsData = JSON.parse(newsData);
        var news = newsData.response.results;

        //Only read the articles part of the JSON
        for (var article in news) {
            newsTitle = news[article].webTitle;
            newsDesc = news[article].fields.trailText;
            newsURL = news[article].webUrl;

            newsURL = newsURL.replace('https://www', 'https://amp');

            newsContentArea.innerHTML += `
            <a class="pure-u-24-24 pure-button newsItem" rel="amphtml" href="${newsURL}">
                <p class="newsItem-title">${newsTitle}</p>
                <p class="newsItem-desc">${newsDesc}</p>
            </a>`;
        }
    });
};

var loadWeatherData = function() {
    menuButtons.classList.add('hidden');
    weatherContentArea.classList.remove('hidden');

    //URL to load weather data
    var apiURL = 'https://api.darksky.net/forecast/fd7861deb521e1b6a124ba8b2c9ff871/53.4084,2.9916?exclude=currently,minutely,hourly,alerts,flags&units=si';

    //Variables to store weather data
    var weatherDate;
    var weatherDesc;
    var weatherTemp;

    //Make attempt to load URL data
    var weatherAPI = new apiCall();
    weatherAPI.get(apiURL, function(weatherData) {
        //Successfully loaded
        //Hide loading icon
        loadingIcon.classList.add('hidden');

        //Convert string to JSON
        weatherData = JSON.parse(weatherData);
        var weather = weatherData.daily.data;

        //Only read the articles part of the JSON
        for (var day in weather) {
            weatherDate = weather[day].time;
            weatherDesc = weather[day].summary;
            weatherTemp = weather[day].temperatureMax;

            weatherContentArea.innerHTML += `
            <a class="pure-u-24-24 pure-button weatherItem" rel="amphtml">
                <p class="newsItem-title">${weatherTemp}</p>
                <p class="newsItem-desc">${weatherDesc}</p>
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
        };

        apiRequest.open( "GET", apiURL, true );            
        apiRequest.send( null );
    };
};

var refreshPage = function() {
    refreshIcon.classList.add('refresh__rotate');
    newsContentArea.innerHTML = "";
    loadingIcon.classList.remove('hidden');
    loadNewsData();
};

var returnToMenu = function() {
    newsContentArea.classList.add('hidden');
    weatherContentArea.classList.add('hidden');
    menuButtons.classList.remove('hidden');
};



/* USED TO CALCULATE USERS LOCATION*/
//http://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838