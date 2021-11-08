import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Center, Flex, Text } from "@chakra-ui/layout";
import GameInfoProps from "../types/GameInfoProps";
import CountUp from "react-countup";

export default function GameInfo(props: GameInfoProps) {
  const { title, publisher, sales, artAddress } = props.gameInfo;
  if (props.hidden)
    return (
      <Flex direction="column" align="center" w="100%" maxW="600px">
        <Center
          h={{ base: "150px", md: "250px" }}
          w={{ base: "150px", md: "250px" }}
          mb="24px"
          mt="24px"
        >
          <Image
            src={artAddress}
            maxW={{ base: "150px", md: "250px" }}
            maxH={{ base: "150px", md: "250px" }}
            shadow="lg"
            objectFit="scale-down"
            key={artAddress}
          ></Image>
        </Center>
        <Text
          color="purple.600"
          fontWeight="bold"
          fontSize={{ base: "xl", md: "3xl" }}
          align="center"
        >
          {`${title} (${publisher})`}
        </Text>
        <Text color="whitesmoke">has a</Text>
        <Button w="100px" m="2" onClick={() => props.onPlay(1)}>
          higher
        </Button>
        <Text color="whitesmoke">or</Text>
        <Button w="100px" m="2" onClick={() => props.onPlay(0)}>
          lower
        </Button>
        <Text color="whitesmoke">amount of sold copies</Text>
      </Flex>
    );
  else
    return (
      <Flex direction="column" align="center" w="100%" maxW="600px">
        <Center
          h={{ base: "150px", md: "250px" }}
          w={{ base: "150px", md: "250px" }}
          mb="24px"
          mt="24px"
        >
          <Image
            src={artAddress}
            maxW={{ base: "150px", md: "250px" }}
            maxH={{ base: "150px", md: "250px" }}
            shadow="lg"
            objectFit="scale-down"
            key={artAddress}
          ></Image>
        </Center>
        <Text
          color="purple.600"
          fontWeight="bold"
          fontSize={{ base: "xl", md: "3xl" }}
          align="center"
        >
          {`${title} (${publisher})`}
        </Text>
        <Text color="whitesmoke">has</Text>
        <Text
          color="purple.600"
          fontWeight="bold"
          fontSize={{ base: "2xl", md: "4xl" }}
        >
          {props.countUp ? (
            <CountUp end={sales} duration={0.5} separator="," />
          ) : (
            <>{Number(sales).toLocaleString("en-US")}</>
          )}
        </Text>
        <Text color="whitesmoke">sold copies</Text>
      </Flex>
    );
}
