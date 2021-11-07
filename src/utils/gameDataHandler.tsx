import games from "../data/games.json";
import GameData from "../types/GameData";

let previousGame: GameData | null;

export default function getGame() {
  let random = Math.floor(Math.random() * games.length);
  let randomGame = games[random];
  if (previousGame) {
    while (previousGame.sales === randomGame.sales) {
      random = Math.floor(Math.random() * games.length);
      randomGame = games[random];
    }
    previousGame = randomGame;
    return randomGame;
  }
  previousGame = randomGame;
  return randomGame;
}
