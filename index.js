// Modules
const fs = require('node:fs');
const path = require('path');

// Constants
const pathToSongs = path.join(__dirname,'songs');
const setInput = process.stdin;
const setOutput = process.stdout;

// Variables
setInput.setEncoding('utf-8');
setInput.setRawMode(true);
let songs = fs.readdirSync(pathToSongs).filter((item)=> item.endsWith('.mp3'));
let selected = 1;


function displaySongs(){
    setOutput.cursorTo(0,0);
    
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
displaySongs();


setInput.on('data',(input)=>{
    // Quit App
    if (input === 'q'){
        setInput.pause();
        setInput.setRawMode(false);
        
        setOutput.write("\x1bc");
        
        process.exit(0);
    };

    // When pressed Up Arrow Key
    if (input[2] == 'A'){
        if (selected === 1){
            selected = songs.length;
        }else{
            selected--;
        }
        displaySongs();
    };

    // When pressed Down Arrow Key
    if (input[2] == 'B'){
        if (selected === songs.length){
            selected = 1;
        }else{
            selected++;
        }

        displaySongs();
    };
});