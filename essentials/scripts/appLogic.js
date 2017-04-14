var apiCall = function() {
    this.get = function(apiURL, apiCallbackFunc) {
        var apiRequest = new XMLHttpRequest();

        apiRequest.onreadystatechange = function() { 
            if (apiRequest.readyState == 4 && apiRequest.status == 200) {
                apiCallbackFunc(apiRequest.responseText);
            }
        };

        apiRequest.open( "GET", apiURL, true );            
        apiRequest.send( null );
    };
};

var main = function() {
    //URL to load news data
    var apiURL = 'https://content.guardianapis.com/world?show-fields=body,trailText&api-key=ac6c039d-e505-4c5e-ad69-0f7b1a29f98c';

    //DOM element to display news data
    var contentArea = document.getElementById('contentArea');

    //Variables to store specific news data
    var newsTitle = '';
    var newsDesc = '';
    var newsURL = '';

    //Make attempt to load URL data
    var client = new apiCall();
    client.get(apiURL, function(newsData) {
        //Successfully loaded
        //Hide loading icon
        document.getElementById('loading').classList.add('hidden');

        //Convert string to JSON
        newsData = JSON.parse(newsData);
        var news = newsData.response.results;

        //Only read the articles part of the JSON
        for (var article in news) {
            newsTitle = news[article].webTitle;
            newsDesc = news[article].fields.trailText;
            newsURL = news[article].webUrl;

            newsURL = newsURL.replace('https://www', 'https://amp');

            contentArea.innerHTML += `
            <a class="pure-u-24-24 pure-button newsItem" rel="amphtml" href="${newsURL}">
                <p class="newsItem-title">${newsTitle}</p>
                <p class="newsItem-desc">${newsDesc}</p>
            </a>`;
        }

    });

};

//http://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup-->
document.addEventListener("DOMContentLoaded", function() { 
    main();
});