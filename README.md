# 🐍 Snake Game – Interactive Browser Game

An interactive and feature-rich Snake Game built using **HTML, CSS, and JavaScript (Canvas API)**.
The game includes dynamic speed increase, bonus food system, pause/resume functionality, and a persistent leaderboard using browser LocalStorage.

---

## 🎮 Features

✅ Smooth snake movement using JavaScript game loop
✅ Dynamic difficulty – game speed increases as score grows
✅ Golden bonus food that gives extra points
✅ Pause / Resume functionality using keyboard controls
✅ Restart system with Game Over screen
✅ Persistent High Score tracking
✅ Leaderboard system (Top 5 players saved locally)
✅ Modern dark UI with responsive layout

---

## 🧠 Tech Stack

* HTML5 Canvas
* CSS3
* JavaScript (ES6)
* Browser LocalStorage

---

## 🎯 Controls

| Key   | Action         |
| ----- | -------------- |
| ⬆️    | Move Up        |
| ⬇️    | Move Down      |
| ⬅️    | Move Left      |
| ➡️    | Move Right     |
| **P** | Pause / Resume |

---

## 🏆 Game Mechanics

* Normal food → +1 score
* Every 5 foods → Speed increases
* After 5 foods → Golden food appears
* Golden food → +5 score
* Collision with self → Game Over

---

## 💾 Leaderboard System

The game stores:

* High Score
* Top 5 player scores

using **browser LocalStorage**, allowing persistent tracking even after page reload.

---

## 📂 Project Structure

```
Snake-Game/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ▶️ How to Run Locally

1. Clone the repository

```
git clone https://github.com/NRR385/Basic-Snake-Game.git
```

2. Open `index.html` in your browser

---

## ⭐ Future Improvements

* Sound effects
* Difficulty levels
* Mobile touch controls
* Online leaderboard (Firebase / Backend)
* AI auto-play snake

---

⭐ If you like this project, consider giving it a star!
