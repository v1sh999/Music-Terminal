const fs = require('node:fs')
const path = require('path')

pathToSongs = path.join(__dirname,'songs');

let songs = fs.readdirSync(pathToSongs).filter((item)=> item.endsWith('.mp3'))

function displaySongs(){
    for (let i=0;i<songs.length;i++){
        let song = songs[i].split('.')[0]
        process.stdout.write(`${song}\n`)
    }
}
displaySongs()