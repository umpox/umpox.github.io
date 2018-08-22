let newsContentArea;let weatherContentArea;let articleContentArea;let offlineContentArea;let offlineArticleArea;let loadingIcon;let refreshIcon;let menuButtons;let backBtnContainer;let refreshBtnContainer;let headerText;const indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB;const DataStorage=indexedDB.open('ArticleDatabase',1);if('serviceWorker' in navigator){navigator.serviceWorker.register('./service-worker.js')}
document.addEventListener('DOMContentLoaded',()=>{loadingIcon=document.getElementById('loading');loadingIcon.classList.add('hidden');backBtnContainer=document.getElementById('menuBanner-content-back');refreshBtnContainer=document.getElementById('menuBanner-content-refresh');backBtnContainer.innerHTML='<img src="resources/back.svg">';refreshBtnContainer.innerHTML='<img src="resources/refresh.svg">';newsContentArea=document.getElementById('newsContentArea');weatherContentArea=document.getElementById('weatherContentArea');articleContentArea=document.getElementById('articleContentArea');offlineContentArea=document.getElementById('offlineContentArea');offlineArticleArea=document.getElementById('offlineArticleArea');refreshIcon=document.getElementById('menuBanner-content-refresh');menuButtons=document.getElementById('menuButtonArea');headerText=document.getElementById('menuBanner-content-text')});DataStorage.onupgradeneeded=()=>{DataStorage.result.createObjectStore('Articles',{keyPath:'id'})};const saveOffline=(articleTitle,articleBody,button)=>{const tx=DataStorage.result.transaction('Articles','readwrite');const articleList=tx.objectStore('Articles');articleList.put({id:new Date().getTime(),data:{title:articleTitle,body:articleBody}});const saveButton=button.target;saveButton.innerHTML='Saved!'};const loadOfflineArticles=()=>{offlineContentArea.innerHTML='<h2 id="articleTitle">No offline articles found</h2>';loadingIcon.classList.remove('hidden');menuButtons.classList.add('hidden');offlineContentArea.classList.remove('hidden');backBtnContainer.classList.remove('hidden');refreshBtnContainer.classList.remove('hidden');refreshIcon.classList.add('invisible');const tx=DataStorage.result.transaction('Articles','readwrite');const articleList=tx.objectStore('Articles');let articles=articleList.getAll();articles.onsuccess=()=>{loadingIcon.classList.add('hidden');articles=articles.result;offlineContentArea.innerHTML='';articles.forEach((article)=>{offlineContentArea.innerHTML+=`
          <a class="pure-u-24-24 pure-button newsItem" onclick="loadOfflineDetails(${article.id})">
              <p class="newsItem-title">${article.data.title}</p>
          </a>`})}};const loadOfflineDetails=(articleID)=>{loadingIcon.classList.remove('hidden');offlineContentArea.classList.add('hidden');offlineArticleArea.innerHTML='';offlineArticleArea.classList.remove('hidden');window.scrollTo(0,0);const tx=DataStorage.result.transaction('Articles','readwrite');const articleList=tx.objectStore('Articles');let articleContent=articleList.get(articleID);articleContent.onsuccess=()=>{loadingIcon.classList.add('hidden');articleContent=articleContent.result;offlineArticleArea.innerHTML=`
            <button class="pure-button btnDelete" id="${articleContent.id}" onclick="deleteOfflineArticle(${articleContent.id})">Delete</button>
            <h2 id="articleTitle">${articleContent.data.title}</h2>
            <p id="articleBody">${articleContent.data.body}</p>`}};const deleteOfflineArticle=(articleID)=>{const tx=DataStorage.result.transaction('Articles','readwrite');const articleList=tx.objectStore('Articles');const articleContent=articleList.delete(articleID);articleContent.onsuccess=()=>{offlineArticleArea.classList.add('hidden');loadOfflineArticles()}};const apiCall=(apiURL,apiCallbackFunc)=>{const apiRequest=new XMLHttpRequest();apiRequest.onreadystatechange=()=>{if(apiRequest.readyState===4&&apiRequest.status===200){apiCallbackFunc(apiRequest.responseText);refreshIcon.classList.remove('refresh__rotate')}};apiRequest.open('GET',apiURL,!0);apiRequest.send(null)};const loadNewsData=()=>{loadingIcon.classList.remove('hidden');menuButtons.classList.add('hidden');newsContentArea.classList.remove('hidden');backBtnContainer.classList.remove('hidden');refreshBtnContainer.classList.remove('hidden');refreshIcon.classList.remove('invisible');headerText.innerHTML='<h1>News</h1>';const apiURL='https://www.umpox.com/essentials/data/news.json';const currentTime=new Date();let newsTitle='';let newsDesc='';let newsID;apiCall(apiURL,(newsData)=>{const parsedNewsData=JSON.parse(newsData);const news=parsedNewsData.response.results;loadingIcon.classList.add('hidden');newsContentArea.innerHTML+=`
            <a class="pure-u-24-24 newsMain">
                <h4 class="newsItem-title">Last updated: ${currentTime.toLocaleTimeString()}</h4>                
            </a>`;news.forEach((article)=>{newsTitle=article.webTitle;newsDesc=article.fields.trailText;newsID=article.id;newsContentArea.innerHTML+=`
            <a class="pure-u-24-24 pure-button newsItem" onclick="loadArticle( '${newsID}' )" rel="amphtml">
                <p class="newsItem-title">${newsTitle}</p>
                <p class="newsItem-desc">${newsDesc}</p>
            </a>`})})};const loadArticle=(newsID)=>{loadingIcon.classList.remove('hidden');newsContentArea.classList.add('hidden');refreshIcon.classList.add('invisible');articleContentArea.innerHTML='';articleContentArea.classList.remove('hidden');window.scrollTo(0,0);const apiURL=`https://www.umpox.com/essentials/data/articles/${newsID}.json`;let articleTitle;let articleBody;let articleURL;apiCall(apiURL,(apiData)=>{const articleData=JSON.parse(apiData);articleTitle=articleData.response.content.webTitle;articleBody=articleData.response.content.blocks.body[0].bodyTextSummary;articleURL=articleData.response.content.webUrl;articleURL=articleURL.replace('https://www','https://amp');loadingIcon.classList.add('hidden');articleContentArea.innerHTML=`
        <button class="pure-button btnSave" id="${newsID}">Save Offline</button>
        <h2 id="articleTitle">${articleTitle}</h2>
        <p id="articleBody">${articleBody}</p>
        <a class="pure-button ampLoad" href="${articleURL}" rel="amphtml">Original AMP article</a>`;const offlineBtn=document.getElementById(newsID);offlineBtn.addEventListener('click',(event)=>{saveOffline(articleTitle,articleBody,event)},!0)})};const convertToDay=(time)=>{let day=new Date(time*1000).getDay();switch(day){case 1:day='Monday';break;case 2:day='Tuesday';break;case 3:day='Wednesday';break;case 4:day='Thursday';break;case 5:day='Friday';break;case 6:day='Saturday';break;default:day='Sunday';break}
return day};const loadWeatherData=(lat,long)=>{loadingIcon.classList.remove('hidden');menuButtons.classList.add('hidden');backBtnContainer.classList.remove('hidden');refreshBtnContainer.classList.remove('hidden');refreshIcon.classList.remove('invisible');weatherContentArea.innerHTML='';weatherContentArea.classList.remove('hidden');headerText.innerHTML='<h1>Weather</h1>';let apiURL='https://www.umpox.com/essentials/data/weather.json';if(lat!==undefined&&long!==undefined){apiURL=''}
const currentTime=new Date();let weatherDate;let weatherDesc;let weatherTemp;let weatherCloud;apiCall(apiURL,(weatherData)=>{let parsedWeatherData=JSON.parse(weatherData);const cityData=parsedWeatherData.city;parsedWeatherData=parsedWeatherData.list;loadingIcon.classList.add('hidden');weatherContentArea.innerHTML+=`
            <a class="pure-u-24-24 weatherMain">
                <h2 class="newsItem-title">${cityData.name}, ${cityData.country}</h2>
                <span onclick="getUserLocation()" style="position:absolute;right:40px;top:95px"><img src="resources/location.svg"></span>   
                <h4 class="newsItem-title">Last updated: ${currentTime.toLocaleTimeString()}</h4>            
            </a>`;parsedWeatherData.forEach((day)=>{weatherDesc=day.weather[0].main;weatherTemp=Math.round(day.temp.day);weatherCloud=day.clouds;weatherDate=day.dt;weatherDate=convertToDay(weatherDate);weatherContentArea.innerHTML+=`
            <a class="pure-u-24-24 weatherItem">
                <h2 class="pure-u-12-24 weatherItem-date">${weatherDate}</h2>            
                <h2 class="pure-u-11-24 weatherItem-desc">${weatherDesc}</h2>
                <h2 class="pure-u-12-24 weatherItem-temp">${weatherTemp}°C</h2>
                <h2 class="pure-u-11-24 weatherItem-cloud">${weatherCloud}% Cloud</h2>
            </a>`})})};const saveUserLocation=(position)=>{if(position!==null){loadWeatherData(position.coords.latitude,position.coords.longitude)}};const getUserLocation=()=>{navigator.geolocation.getCurrentPosition(saveUserLocation)};const refreshPage=()=>{refreshIcon.classList.add('refresh__rotate');if(!newsContentArea.classList.contains('hidden')){newsContentArea.innerHTML='';caches.open('essentialsPWA-v1').then((cache)=>{cache.delete('https://www.umpox.com/essentials/news.json').then(()=>{loadNewsData()})})}else if(!weatherContentArea.classList.contains('hidden')){weatherContentArea.innerHTML='';caches.open('essentialsPWA-v1').then((cache)=>{cache.delete('https://www.umpox.com/essentials/weather.json').then(()=>{loadWeatherData()})})}};const returnToMenu=()=>{if(!articleContentArea.classList.contains('hidden')){articleContentArea.classList.add('hidden');newsContentArea.classList.remove('hidden');refreshIcon.classList.remove('invisible')}else if(!offlineArticleArea.classList.contains('hidden')){offlineArticleArea.classList.add('hidden');loadOfflineArticles()}else{headerText.innerHTML='<h1>News</h1>';newsContentArea.classList.add('hidden');weatherContentArea.classList.add('hidden');offlineContentArea.classList.add('hidden');backBtnContainer.classList.add('hidden');refreshBtnContainer.classList.add('hidden');menuButtons.classList.remove('hidden')}}
