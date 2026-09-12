// Modules
const fs = require('node:fs');
const path = require('path');

// Constants
const pathToSongs = path.join(__dirname,'songs');
const setInput = process.stdin;
const setOutput = process.stdout;

// Variables
let audio;
let currentSong;
let selected = 1;


async function init(){
    FindSongs();
    prepareTerminal();
    awaitAudioModule();
    WelcomeUser();
};


async function prepareTerminal(){
    setInput.setEncoding('utf-8');
    setInput.setRawMode(true);
};
async function FindSongs(){
    let songs = fs.readdirSync(pathToSongs).filter((item) => item.endsWith('.mp3'));
};
async function awaitAudioModule(){
    let audioModule = await import('audio');
    audio = audioModule.default;
};
function WelcomeUser(){
    console.log(`🎶 Welcome to the Terminal Music Player 🎶\n`);
    displaySongs();
    console.log(`\n🎵 Select a number to play the song`);
};


function displaySongs(){
    setOutput.cursorTo(1,2);
    
    for (let i=0;i<songs.length;i++){
        setOutput.clearLine();
        
        let song = songs[i].split('.')[0];
        if (selected === i+1){
            setOutput.write(`->${i+1}: ${song}\n`);
        }else{
            setOutput.write(`${i+1}: ${song}\n`);
        };
    };
};
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
    displaySongs();
};
function goDown(){
    if (selected === songs.length){
        selected = 1;
    }else{
        selected++;
    };

    displaySongs();
};


async function selectSong(){
    if (currentSong && currentSong.playing){
        currentSong.stop();
    };
    let selectedSong = songs[selected - 1];
    let songPath = path.join(__dirname,'songs',selectedSong);
    currentSong = audio(songPath);
    await currentSong;
    currentSong.play();
};


function handleInputs(input){
    if (input === "q"){
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
        selectSong();
    };
};


async function main(){
    await init();

    setInput.on('data',handleInputs);
};
main();