import Menu from "./components/Menu";
import { Router } from "@reach/router";
import Game from "./components/Game";

export default function App() {
  return (
    <Router>
      <Menu path="/" />
      <Game path="/play" />
    </Router>
  );
}
