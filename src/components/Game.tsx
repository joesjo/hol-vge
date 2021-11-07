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
        <Center h="100vh" flexDirection="column">
          <Flex h="700px" mt="100px">
            <GameInfo
              gameInfo={currentGames[0]}
              hidden={false}
              onPlay={handleInput}
              countUp={false}
            />
            <Box alignSelf="center" mx="150px">
              <Text
                fontWeight="bold"
                bg="whitesmoke"
                p="4"
                fontSize="lg"
                borderRadius="full"
                mt="-20"
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
        </Center>
        <Box
          position="absolute"
          bottom="0"
          w="100%"
          mx="auto"
          textAlign="center"
          mb="15vh"
        >
          {gameOver ? (
            <>
              <Text fontWeight="bold" fontSize="6xl" color="whitesmoke">
                game over :{"("}
              </Text>
              <Text fontSize="2xl" color="whitesmoke">
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
        <Box
          position="absolute"
          bottom="0"
          w="100%"
          mx="auto"
          textAlign="center"
          mb="4"
        >
          <Text color="whitesmoke" fontSize="lg">
            highscore: {highscore}
          </Text>
        </Box>
      </>
    );
  }
  return null;
}
