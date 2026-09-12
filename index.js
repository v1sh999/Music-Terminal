// Modules
const fs = require('node:fs');
const path = require('path');

// Constants
const pathToSongs = path.join(__dirname,'songs');
const setInput = process.stdin;
const setOutput = process.stdout;

// Variables
let audio;
let songs;
let currentSong;
let selected = 1;
let isPaused = true;
let currentSongName = 'No song selected';

// Initialization
async function init(){
    prepareTerminal();
    FindSongs();
    awaitAudioModule();
    WelcomeUser();
};

// Initialization functions
function prepareTerminal(){
    setInput.setEncoding('utf-8');
    setInput.setRawMode(true);
};
function FindSongs(){
    songs = fs.readdirSync(pathToSongs).filter((item) => item.endsWith('.mp3'));
};
async function awaitAudioModule(){
    let audioModule = await import('audio');
    audio = audioModule.default;
};
function WelcomeUser(){
    initialRender();
    console.log(`🎵 Select a song to play`);
};

// Terminal Control functions
function initialRender(){
        console.clear();

    console.log("┌────────────────────────────────────────────────────────────┐");
    console.log("│ 🎶 Terminal Music Player                                   │");
    console.log("├────────────────────────────────────────────────────────────┤");
    console.log(`│   Playing: ${currentSongName}                                       │`)
    console.log(`│   Status: ${isPaused ? "Paused                                           │" : "Playing                                          │"}`);
    console.log("├────────────────────────────────────────────────────────────┤");
    songs.forEach((song, index) => {
        if (selected === index + 1) {
            console.log(`│ ▶ ${song}                                          `);
        } else {
            console.log(`│   ${song}`);
        }
    });
    console.log("├────────────────────────────────────────────────────────────┤");
    console.log("│ ENTER Play | SPACE Pause ↑↓ Navigate | M Mute | Q Quit     │");
    console.log("└────────────────────────────────────────────────────────────┘")
};
function render(){
    initialRender()
    setOutput.moveCursor(0,1);
}
function quitApp(){
    setInput.setRawMode(false);
    setInput.pause();
    console.clear();
    process.exit(0);
};
function goUp(){
    if (selected === 1){
        selected = songs.length;
    }else{
        selected--;
    };
    render();
};
function goDown(){
    if (selected === songs.length){
        selected = 1;
    }else{
        selected++;
    };

    render();
};

// Audio Control functions
async function playSong(){
    if (currentSong && currentSong.playing){
        currentSong.stop();
    };
    
    let selectedSong = songs[selected - 1];
    let songPath = path.join(__dirname,'songs',selectedSong);
    currentSong = audio(songPath);

    const songInstance = currentSong;
    
    currentSong.on('ended',()=>{
        if (songInstance === currentSong){
            currentSongName = 'No song selected';
            render();
        };
    });
    
    await currentSong.ready;
    currentSong.play();

    currentSongName = selectedSong;
    isPaused = false;
    render();
};
function pauseResumeSong(){
    if (currentSong){
        if (currentSong.paused){
            currentSong.resume();
            isPaused = false;
        }else{  
            currentSong.pause();
            isPaused = true;
        };
        render();
    }
};
function muteSong(){
    if (currentSong){
        if (currentSong.muted){
            currentSong.muted = false;
        }else{
            currentSong.muted = true;
        };
    };
};

// Input Handler
function handleInputs(input){
    if (input.toLowerCase() === "q"){
        quitApp();
    };
    if (input[2] === 'A'){
        // When up arrow key is pressed
        goUp();
    };
    if (input[2] === 'B'){
        // When down arrow key is pressed
        goDown();
    };
    if (input === '\r'){
        playSong();
    };
    if (input === " "){
        pauseResumeSong();
    };
    if (input.toLowerCase() === 'm'){
        muteSong()
    };
};

// Jimmathy Main
async function main(){
    await init();
    setInput.on('data',handleInputs);
};
main();