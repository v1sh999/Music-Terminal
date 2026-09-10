const fs = require('node:fs')
const path = require('path')

pathToSongs = path.join(__dirname,'songs');

let songs = fs.readdirSync(pathToSongs).filter((item)=> item.endsWith('.mp3'))

songs.forEach(element => {
    console.log(element)
});