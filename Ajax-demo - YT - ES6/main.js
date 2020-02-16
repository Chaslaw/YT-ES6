const key = "AIzaSyAl0UJFp10Xc_xTptqWrE-a7SNr1wJa43M";

const searchButton = document.querySelector('.search-box button');
const videoList = document.querySelector('.video-list');
const videoPreview = document.querySelector('.video-preview');

const loader = document.querySelector('main div');
loader.className = "loader";

const onSearch = () => {
    
    let searchField = document.querySelector('.search-box input');

    searchField.value.trim() && getVideos(searchField.value);
    searchField.value = '';
}

const getVideos =  searchValue => {

    let req = new XMLHttpRequest;

    req.open('GET', "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q="+ searchValue +"&key=" + key);

    req.onload = function () {
        listVideos(JSON.parse(req.responseText).items);
    }

    req.send();

    loader.classList.remove('loader')
}

const listVideos = videos => {

videoList.innerHTML = "";

  videos.forEach(function(video) {
        addVideo(video);
    });
    
    loader.classList.add("loader");
}

const addVideo = videoData => {

    let videoElement = document.createElement('div');
    
    let img = '<img src="'+ videoData.snippet.thumbnails.medium.url +'"/>';
    let title = '<h3>'+ videoData.snippet.title +'</h3>';
    let desc = '<div>'+ videoData.snippet.description +'</div>';
    
    videoElement.innerHTML = img + '<section>' + title + desc + '</section>';
   
    videoList.appendChild(videoElement);
    
    videoElement.querySelectorAll('h3, img').forEach(function(element){
        element.addEventListener('click', function () {
            openVideo(videoData.id.videoId);
        });
    });

}

const openVideo = id => {

    videoPreview.innerHTML = '<iframe width="760" height="515" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

    videoPreview.classList.add('video-preview-new');
};

searchButton.addEventListener('click', onSearch);
