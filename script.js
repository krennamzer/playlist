const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");

const tracks = [...document.querySelectorAll("tr[data-src]")];

let current = 0;
let shuffle = false;
let repeat = false;
let shuffleList = [];



function loadTrack(index){

    current = index;

    const track = tracks[index];

    audio.src = track.dataset.src;
    cover.src = track.dataset.cover;
    title.textContent = track.querySelector(".track").textContent;

    tracks.forEach(t =>
        t.querySelector(".track").classList.remove("active")
    );

    track.querySelector(".track").classList.add("active");
}



function playTrack(index){

    loadTrack(index);

    audio.play().catch(error => {
        console.log(error);
    });

}



// clic sur un morceau
document.querySelectorAll(".track").forEach((name,index)=>{

    name.addEventListener("click",()=>{

        playTrack(index);

    });

});



// crée une nouvelle playlist aléatoire
function createShuffleList(){

    shuffleList = tracks.map((_, index) => index);

    // mélange la liste
    shuffleList.sort(() => Math.random() - 0.5);

    // évite de remettre le morceau actuel immédiatement
    shuffleList = shuffleList.filter(index => index !== current);

}



// suivant
document.getElementById("next").onclick = ()=>{


    if(shuffle){


        // si tous les morceaux ont été joués, on remélange
        if(shuffleList.length === 0){

            createShuffleList();

        }


        const next = shuffleList.shift();

        playTrack(next);


    } else {


        current++;

        if(current >= tracks.length){

            current = 0;

        }

        playTrack(current);


    }

};



// précédent
document.getElementById("prev").onclick = ()=>{


    current--;


    if(current < 0){

        current = tracks.length - 1;

    }


    playTrack(current);


};



// shuffle
document.getElementById("shuffle").onclick = ()=>{


    shuffle = !shuffle;


    // reset de la liste aléatoire
    shuffleList = [];


    if(shuffle){

        createShuffleList();

    }


    document.getElementById("shuffle").style.background =
        shuffle ? "#FFFF00" : "";


};



// repeat
document.getElementById("repeat").onclick = ()=>{


    repeat = !repeat;


    document.getElementById("repeat").style.background =
        repeat ? "#FFFF00" : "";


};



// fin du morceau
audio.addEventListener("ended",()=>{


    if(repeat){


        audio.currentTime = 0;

        audio.play();


    } else {


        document.getElementById("next").click();


    }


});



loadTrack(0);


const soundButtons = document.querySelectorAll(".sound-btn");

// un objet Audio différent pour chaque bouton
const soundEffects = {};

soundButtons.forEach(button => {

    const soundFile = button.dataset.sound;

    soundEffects[soundFile] = new Audio(soundFile);

    button.addEventListener("click", () => {

        const sound = soundEffects[soundFile];

        // recommence le son depuis le début
        sound.currentTime = 0;

        sound.play().catch(error => {
            console.log("Impossible de jouer le son :", error);
        });

    });

});
