import { Button } from "@chakra-ui/button";
import { Center, Flex, Heading, Text } from "@chakra-ui/layout";
import { Link, RouteComponentProps } from "@reach/router";

export default function Menu(props: RouteComponentProps) {
  return (
    <Center h="100vh">
      <Flex direction="column" align="center" justify="center">
        <Heading color="whitesmoke">higher or lower</Heading>
        <Text color="purple.600" fontWeight="bold" fontSize="xl" mt="1rem">
          video game edition
        </Text>
        <Link to="/play">
          <Button w="160px" mt="8">
            start
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
