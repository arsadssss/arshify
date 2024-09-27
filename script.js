const clientId = "d3d25f82";
const secretId = "fc10f0538123e6683ee1a0ab37c29305";
const baseURL = "https://api.jamendo.com/v3.0";

const url = `${baseURL}/tracks/?client_id=${clientId}&limit=10`;


const formSubmit = document.querySelector('#formSubmit');

// NavBar Artist Section

const navbar = document.querySelectorAll(".navOption");

const navHeading = document.querySelector("#navName");
var navName = "artists";

navbar.forEach(function(nav){
    nav.addEventListener("click", function(){
      navName = nav.textContent.toLocaleLowerCase();
      navHeading.innerHTML = nav.textContent;
      fetchingNavItems();
      
    });
});

const fetchingNavItems = async()=>{
        try {
            const response = await fetch(`${baseURL}/${navName}/?client_id=${clientId}&limit=10`);
            const data = await response.json();
            const newData = data.results;
            artisS.innerHTML = '';
           for(let i=0; i<10; i++){
            artistSection(newData[i].name, newData[i].artist_name, newData[i].user_name, newData[i].joindate, newData[i].creationdate, newData[i].artist_image, newData[i].image, newData[i].album_image);
           }
        } catch (error) {
            console.log(error);
        }
    }
fetchingNavItems();
const artisS = document.querySelector(".artistSection");
function artistSection(name, aName, uName, jDate, cDate, aImg, mImg, alImg){
    const list = document.createElement("li");

    artisS.appendChild(list);

    const musiclist = document.createElement("div");
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    musiclist.classList.add("titleImg");
    list.append(musiclist, btn);

    btn.addEventListener("click", function(){
        audioControl.src = aAudio;
        audioControl.play();
        if(musicControl === false){
            musicControl = true;
            playPause.classList.replace("fa-play", "fa-pause");
        }else{
            musicControl = false;
            playPause.classList.replace("fa-pause", "fa-play");
        }
        // bigImage.src = aImg;
        // songName.textContent = sName;
        // artistName.textContent = aName;
        // duration.textContent = aDuration;
    })
    const img = document.createElement("img");
    img.src = img.src = aImg ? aImg : (mImg ? mImg : (alImg ? alImg : "https://arsadssss.github.io/arshify/images/playlist.png"));
    img.style.width = 40+"px";
    img.style.height = 40+"px";

    const songInfo = document.createElement("div");
    songInfo.classList.add("songInfo");
    musiclist.append(img, songInfo);

    const title = document.createElement("h4");
    const subtitle = document.createElement("p");
    title.textContent = name !== undefined ? name : aName;
    subtitle.textContent = aName !== undefined ? aName : (uName !== undefined ? uName : (cDate !== undefined ? "Creation Date : "+cDate : "Join Date : "+jDate));

    songInfo.append(title, subtitle);
}



formSubmit.addEventListener("click", function(event){
    event.preventDefault();
    var searchValue = document.querySelector("#searchInput").value;
    const searchFunction = async ()=>{
    const response = await fetch(`${baseURL}/tracks/?client_id=${clientId}&limit=10&search=${searchValue}`);
    const data = await response.json();
    recom.innerHTML = "";
    for(let i = 0; i < 10; i++){
        recommended(data.results[i].image, data.results[i].name, data.results[i].artist_name, data.results[i].audio, data.results[i].duration);
        
    }
   }
   searchFunction();
   document.querySelector("#searchInput").value = "";
});




let tracks = [];
const bigImage = document.querySelector("#bigImage");

const fetchSongs = async()=>{
	try {
        const response = await fetch(url);
        const data = await response.json();
        nextMusic();
        tracks = data.results;
        for(let i = 0; i < 10; i++){
            // recommended(data.results[i],);
            recommended(data.results[i].image, data.results[i].name, data.results[i].artist_name, data.results[i].audio, data.results[i].duration);
            
        }
    } catch (error) {
        console.log(error);
    }
}
const recom = document.querySelector('.recommended');

function recommended(aImg, sName, aName, aAudio, aDuration){

    const list = document.createElement("li");
    recom.appendChild(list);

    const musiclist = document.createElement("div");
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="fa-solid fa-play"></i>';
    musiclist.classList.add("titleImg");
    list.append(musiclist, btn);

    btn.addEventListener("click", function(){
        audioControl.src = aAudio;
        audioControl.play();
        if(musicControl === false){
            musicControl = true;
            playPause.classList.replace("fa-play", "fa-pause");
        }else{
            musicControl = false;
            playPause.classList.replace("fa-pause", "fa-play");
        }
        bigImage.src = aImg;
        songName.textContent = sName;
        artistName.textContent = aName;
        duration.textContent = aDuration;
    })
    const img = document.createElement("img");
    img.src = aImg;
    img.style.width = 40+"px";
    img.style.height = 40+"px";

    const songInfo = document.createElement("div");
    songInfo.classList.add("songInfo");
    musiclist.append(img, songInfo);

    const title = document.createElement("h4");
    title.classList.add("textScroll");
    const subtitle = document.createElement("p");
    title.textContent = sName;
    subtitle.textContent = aName;

    songInfo.append(title, subtitle);
}
fetchSongs();


const audioControl = document.querySelector("#audio-control");
const like = document.querySelector("#like");
const previous = document.querySelector("#previous");
const playPause = document.querySelector("#playPause");
const next = document.querySelector("#next");
const loop = document.querySelector("#loop");
const songName = document.querySelector("#songName");
const artistName = document.querySelector("#artistName");
const duration = document.querySelector("#duration");
let musicControl = false;

playPause.addEventListener("click", function(){
    if(!musicControl){
        audioControl.play();
            playPause.classList.replace("fa-play", "fa-pause");
        musicControl = true;
    }else if(musicControl){
        audioControl.pause();
        musicControl = false;
        playPause.classList.replace("fa-pause","fa-play");
    }
});

previous.addEventListener("click", function(){
    prevMusic();
});

let initAudio = 0;

function nextMusic(){
    if(initAudio < tracks.length){
        var aSrc = tracks[initAudio].audio;
        audioControl.src = aSrc;
        audioControl.play();
        musicControl = true;
        bigImage.src = tracks[initAudio].album_image;
        songName.textContent = tracks[initAudio].name;
        artistName.textContent = tracks[initAudio].artist_name;
        duration.textContent = tracks[initAudio].duration;
        initAudio++;
    }else{
        initAudio = 0;
    }
}

function prevMusic(){
    if(initAudio >= 1 || initAudio < tracks.length){
        var aSrc = tracks[initAudio].audio;
        audioControl.src = aSrc;
        audioControl.play();
        musicControl = true;
        bigImage.src = tracks[initAudio].album_image;
        songName.textContent = tracks[initAudio].name;
        artistName.textContent = tracks[initAudio].artist_name;
        duration.textContent = tracks[initAudio].duration;
        initAudio--;
    }else{
        initAudio = 0;
    }
}
next.addEventListener("click", function (){
        nextMusic();
});

loop.addEventListener("click", function(){
    loopMusic();
});
like.addEventListener("click", function(){
    like.classList.toggle("fa-solid");

});
const progressBar = document.querySelector("#progress-bar");
audioControl.addEventListener("timeupdate", function(){
    const percentage = (audioControl.currentTime / audioControl.duration) * 100;
    progressBar.value = percentage;
});

progressBar.addEventListener("input", function(){
    const percentage = progressBar.value;
    audioControl.currentTime = (percentage / 100) * audioControl.duration;
});