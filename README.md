# Terminal Music Player

A lightweight terminal-based music player built with Node.js.

Navigate through songs using your keyboard, play audio directly from the terminal, and control playback without leaving the command line.

---

## Features

### Current Features

* 🎵 Display all available songs from the `songs/` directory
* ⬆️ Navigate up using the Up Arrow key
* ⬇️ Navigate down using the Down Arrow key
* ▶️ Play the selected song using Enter
* ⏸️ Pause and resume playback using Space
* 🔇 Mute audio using M
* ❌ Quit the application using Q
* 🖥️ Interactive terminal UI
* ⚡ Keyboard input handled through raw terminal mode

---

## Project Structure

```text
Terminal Music App/
│
├── songs/
│   ├── sample-10s.mp3
│   ├── sample-25s.mp3
│   └── ...
│
├── index.js
├── package.json
└── README.md
```

---

## Controls

| Key   | Action              |
| ----- | ------------------- |
| ↑     | Move selection up   |
| ↓     | Move selection down |
| Enter | Play selected song  |
| Space | Pause / Resume      |
| M     | Mute / Unmute       |
| Q     | Quit application    |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/v1sh999/Music-Terminal.git
cd terminal-music-player
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
node index.js
```

---

## How It Works

1. The application scans the `songs/` folder for `.mp3` files.
2. A song list is displayed in the terminal.
3. The user navigates using arrow keys.
4. Pressing Enter loads and plays the selected song.
5. Playback controls are handled directly from the keyboard.
6. The interface is redrawn whenever the application state changes.

---

## Technologies Used

* Node.js
* File System Module (`fs`)
* Path Module (`path`)
* Standard Input/Output Streams (`process.stdin`, `process.stdout`)
* Raw Terminal Mode
* Dynamic ES Module Import
* Audio Playback via the `audio` package

---

## License

This project is provided for educational and learning purposes.
