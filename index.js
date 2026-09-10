// Modules
const fs = require('node:fs');
const path = require('path');

// Constants
const pathToSongs = path.join(__dirname,'songs');
const setInput = process.stdin;
const setOutput = process.stdout;

// variables
setInput.setRawMode(true);
setInput.setEncoding('utf-8');
let songs = fs.readdirSync(pathToSongs).filter((item)=> item.endsWith('.mp3'));

displaySongs();
function displaySongs(){
    for (let i=0;i<songs.length;i++){
        let song = songs[i].split('.')[0];
        setOutput.write(`${song}\n`);
    };
};

setInput.on('data',(input)=>{
    if (input === 'q'){
        setInput.setRawMode(false);
        process.exit(0);
    };
});