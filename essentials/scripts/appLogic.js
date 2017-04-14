//http://stackoverflow.com/questions/436411/where-should-i-put-script-tags-in-html-markup-->
document.addEventListener("DOMContentLoaded", function() { 
    main();
});

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

var apiReturn = function() {
    this.post = function(apiURL, apiCallbackFunc) {
        fetch("https://acceleratedmobilepageurl.googleapis.com/v1/ampUrls:batchGet", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                "urls":
                [
                    "http://www.bbc.co.uk/news/world-asia-39598046"
                ]
            }
        })
        .then( function(response) {
            console.log(response);
        });
    };

};
var postRequest = new apiReturn();
postRequest.post();

var main = function() {
    //URL to load news data
    var apiURL = 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=21656de15c824bcdad147b54933b981e';

    //DOM element to display news data
    var contentArea = document.getElementById('contentArea');

    //Variables to store specific news data
    var newsTitle = '';
    var newsDesc = '';
    var newsURL = '';

    //Make attempt to load URL data
    var client = new apiCall();
    client.get('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=21656de15c824bcdad147b54933b981e', function(response) {
        //Successfully loaded
        //Convert string to JSON
        response = JSON.parse(response);
        var news = response.articles;
        //Only read the articles part of the JSON
        for (var article in news) {
            newsTitle = news[article].title;
            newsDesc = news[article].description;
            newsURL = news[article].url;

           contentArea.innerHTML += `
           <a class="pure-u-24-24 pure-button newsItem" href="${newsURL}">
                <p class="newsItem-title">${newsTitle}</p>
                <p class="newsItem-desc">${newsDesc}</p>
            </a>`;
        }


    });

};