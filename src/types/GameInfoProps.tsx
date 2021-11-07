import GameData from "./GameData";

export default interface GameInfoProps {
  gameInfo: GameData;
  hidden: boolean;
  onPlay: (input: number) => void;
  countUp: boolean;
}
