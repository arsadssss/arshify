const clientId = "d3d25f82";
const secretId = "fc10f0538123e6683ee1a0ab37c29305";
const baseURL = "https://api.jamendo.com/v3.0";

const url = `${baseURL}/tracks/?client_id=${clientId}&limit=10`;

const formSubmit = document.querySelector('#formSubmit');

const navbar = document.querySelectorAll(".navOption");
const localOption = document.querySelector(".localOption");
const localNav = document.querySelector(".localNav");
const navHeading = document.querySelector("#navName");
const localSongName = document.querySelector("#fileName");
var navName = "artists";

navbar.forEach(function(nav){
    nav.addEventListener("click", function(){
      navName = nav.textContent.toLocaleLowerCase();
      navHeading.innerHTML = nav.textContent;
      navbar.forEach(function(navItem){
        navItem.classList.remove("active");
        localOption.classList.remove("active");
      });
      nav.classList.add("active");
      fetchingNavItems();
      songlistMain.classList.remove("dNone");
      sL2.classList.remove("dNone");
      
    });
});

localOption.addEventListener('click', function(){
    navbar.forEach(function(nav){
            if(nav.classList.contains('active')){
                nav.classList.remove("active");
            }
        });
        localOption.classList.add("active");
        localNav.style.display = "block";
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

    btn.addEventListener("click", async function(){
        searchValue = name !== undefined ? name : aName;
        console.log(searchValue);
        await searchFunction();
        audioControl.play();
        playPause.classList.replace("fa-play", "fa-pause");
    });

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

function recommendedFirstSong(aImg, sName, aName, aAudio, aDuration){
        bigImage.src = aImg;
        songName.textContent = sName;
        artistName.textContent = aName;
        audioDuration(aDuration);
        audioControl.src = aAudio;
}

const searchFunction = async ()=>{
    const response = await fetch(`${baseURL}/tracks/?client_id=${clientId}&limit=10&search=${searchValue}`);
    const data = await response.json();
    recom.innerHTML = "";
    if (data.results.length > 0) {
        const firstSong = data.results[0];
        recommendedFirstSong(firstSong.image, firstSong.name, firstSong.artist_name, firstSong.audio, firstSong.duration);
    }

    for(let i = 0; i < 10; i++){
        recommended(data.results[i].image, data.results[i].name, data.results[i].artist_name, data.results[i].audio, data.results[i].duration);
        
    }
   }
    var searchValue = document.querySelector("#searchInput").value;
    const cardTitleHeading = document.querySelector("#cardTitleHeading");
    formSubmit.addEventListener("click", function(event){
    event.preventDefault();
    searchValue = document.querySelector("#searchInput").value;
    cardTitleHeading.innerHTML = "Result for " + searchValue;
    searchFunction();
    songlistMain.classList.remove("dNone");
    sL1.classList.remove("dNone");
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
        playPause.classList.replace("fa-play", "fa-pause");
        bigImage.src = aImg;
        songName.textContent = sName;
        artistName.textContent = aName;
        audioDuration(aDuration);
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
const newDuration = document.querySelector("#duration");

let musicControl = true;

playPause.addEventListener("click", function() {
    if (musicControl) {
        audioControl.play();
        playPause.classList.replace("fa-play", "fa-pause");
        musicControl = false;
        audioDuration(audioControl.duration); 
    } else {
        audioControl.pause();
        musicControl = true;
        playPause.classList.replace("fa-pause", "fa-play");
        clearInterval(durationInterval); 
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
        playPause.classList.replace("fa-play", "fa-pause");
        bigImage.src = tracks[initAudio].album_image;
        songName.textContent = tracks[initAudio].name;
        artistName.textContent = tracks[initAudio].artist_name;
        audioDuration(tracks[initAudio].duration);
        durationTimer();
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
        playPause.classList.replace("fa-play", "fa-pause");
        bigImage.src = tracks[initAudio].album_image;
        songName.textContent = tracks[initAudio].name;
        artistName.textContent = tracks[initAudio].artist_name;
        audioDuration(tracks[initAudio].duration);
        durationTimer();
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

const featured = document.querySelector("#featured");
const songs = document.querySelector("#songs");
const sL1 = document.querySelector("#sL1");
const sL2 = document.querySelector("#sL2");
const songlistMain = document.querySelector(".songlistMain");

songs.addEventListener("click", function(){
        
    sL1.classList.toggle("dNone");
    checkVisibility();
});

featured.addEventListener("click", function(){
    sL2.classList.toggle("dNone");
    checkVisibility();
});

function checkVisibility() {
    if (!sL1.classList.contains("dNone") || !sL2.classList.contains("dNone")) {
        songlistMain.classList.remove("dNone");
    } else {
        songlistMain.classList.add("dNone");
    }
}


// Local music
const audioInput = document.querySelector("#audioInput");
const playLocal = document.querySelector("#playLocal");


audioInput.addEventListener("change", function(event){
    const file = event.target.files[0];
    localSongName.innerHTML = file ? file.name + "<br /> <span style='color: green;'>Choose Another File</span>" : 'No file chosen';
    
    if (file) {
        const audioURL = URL.createObjectURL(file);
        const audio = new Audio(audioURL);

        audio.addEventListener('loadedmetadata', function() {
            const fileName = file.name;
            const getAudioDuration = audio.duration.toFixed(2);
            let thumbnailSRC;
            let singerName;

            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    singerName = tag.tags.artist || 'Unknown Artist';
                    if (tag.picture && tag.picture.length) {
                        const picture = tag.picture[0];
                        const base64String = Array.from(picture.data)
                            .map(byte => String.fromCharCode(byte))
                            .join('');
                        thumbnailSRC = `data:${picture.format};base64,${btoa(base64String)}`;
                    }
                },
                onError: function(error) {
                    console.log('Error extracting metadata:', error);
                }
            });

            playLocal.addEventListener("click", function() {
                audioControl.src = audioURL;
                audioControl.play();
                playPause.classList.replace("fa-play", "fa-pause");
                bigImage.src = thumbnailSRC || "images/favicon.jpg";
                songName.textContent = fileName;
                artistName.textContent = singerName;
                audioDuration(getAudioDuration);
                localOption.classList.remove("active");
                localNav.style.display = "none";
            });
        });
    }
});

let durationInterval;

function audioDuration(dVal) {
    if (durationInterval) {
        clearInterval(durationInterval);
    }

    let durationCount = dVal ? Math.floor(Number(dVal)) : 0; 
    newDuration.innerHTML = durationCount; 

    
    if (!musicControl) {
        durationInterval = setInterval(function() {
            durationCount--;
            newDuration.innerHTML = durationCount >= 0 ? durationCount : 0; 
            
            if (durationCount <= 0) {
                clearInterval(durationInterval);
            }
        }, 1000);
    }
}