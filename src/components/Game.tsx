import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import getGame from "../utils/gameDataHandler";
import { useEffect, useState } from "react";
import GameData from "../types/GameData";
import GameInfo from "./GameInfo";
import { Button } from "@chakra-ui/button";

export default function Game(props: RouteComponentProps) {
  const [currentGames, setCurrentGames] = useState<[GameData, GameData]>();
  const [infoHidden, setInfoHidden] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    setCurrentGames([getGame(), getGame()]);
    let highscore = localStorage.getItem("holvg-highscore");
    if (highscore) {
      setHighscore(parseInt(highscore));
    }
  }, []);

  useEffect(() => {
    if (score > highscore) {
      localStorage.setItem("holvg-highscore", score.toString());
      setHighscore(score);
    }
  }, [score, highscore]);

  const handleInput = (input: number) => {
    if (currentGames) {
      let point = 0;
      setInfoHidden(false);
      if (input === 0) {
        if (currentGames[1].sales < currentGames[0].sales) point = 1;
      }
      if (input === 1) {
        if (currentGames[1].sales > currentGames[0].sales) point = 1;
      }
      setTimeout(() => nextGame(point), 2000);
    }
  };

  const nextGame = (point: number) => {
    if (point === 1) {
      setInfoHidden(true);
      setScore((prev) => prev + 1);
      setCurrentGames((prev) => {
        if (prev) {
          return [prev[1], getGame()];
        }
      });
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setCurrentGames([getGame(), getGame()]);
    setInfoHidden(true);
  };

  if (currentGames) {
    return (
      <>
        <Flex
          h={{ base: "auto", xl: "600px" }}
          mt={{ base: "0", xl: "100px" }}
          flexDirection={{ base: "column", xl: "row" }}
          justifyContent="center"
          alignItems={{ base: "center", xl: "normal" }}
        >
          <GameInfo
            gameInfo={currentGames[0]}
            hidden={false}
            onPlay={handleInput}
            countUp={false}
          />
          <Box alignSelf="center" mx="100px">
            <Text
              fontWeight="bold"
              bg="whitesmoke"
              p="4"
              fontSize="lg"
              borderRadius="full"
              my="2rem"
            >
              VS
            </Text>
          </Box>
          <GameInfo
            gameInfo={currentGames[1]}
            hidden={infoHidden}
            onPlay={handleInput}
            countUp={true}
          />
        </Flex>
        <Box textAlign="center" mt={{ base: "4rem", xl: "0" }}>
          {gameOver ? (
            <>
              <Text
                fontWeight="bold"
                fontSize={{ base: "3xl", md: "6xl" }}
                color="whitesmoke"
              >
                game over :{"("}
              </Text>
              <Text fontSize={{ base: "lg", md: "2xl" }} color="whitesmoke">
                final score: {score}
              </Text>
              <Button mt="4" onClick={() => restartGame()}>
                try again
              </Button>
            </>
          ) : (
            <Text fontWeight="bold" fontSize="4xl" color="whitesmoke">
              score: {score}
            </Text>
          )}
        </Box>
        <Box textAlign="center" mt="3rem">
          <Text color="whitesmoke" fontSize="lg">
            highscore: {highscore}
          </Text>
        </Box>
      </>
    );
  }
  return null;
}
