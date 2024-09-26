const searchInput = document.querySelector("#searchInput");
const formSubmit = document.querySelector("#formSubmit");
let searchValue;
formSubmit.addEventListener("click", function(event){
   searchValue = searchInput.value;
   const searchURL = `${baseURL}/tracks/?client_id=${clientId}&limit=10&search=${searchValue}`;
   async ()=>{
    const response = await fetch(searchURL);
    const data = await response.json();
    console.log(data);
   }
   console.log(searchValue);
   event.preventDefault();
})

const clientId = "d3d25f82";
const secretId = "fc10f0538123e6683ee1a0ab37c29305";
const baseURL = "https://api.jamendo.com/v3.0";


const url = `${baseURL}/tracks/?client_id=${clientId}&limit=10`;



let tracks = [];
const bigImage = document.querySelector("#bigImage");

const fetchSongs = async()=>{
	try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        bigImage.src = data.results[0].image;
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
        console.log(musicControl)
    }else if(musicControl){
        audioControl.pause();
        musicControl = false;
        playPause.classList.replace("fa-pause","fa-play");
        console.log(musicControl)
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

