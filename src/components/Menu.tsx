import { Button } from "@chakra-ui/button";
import { Center, Flex, Heading } from "@chakra-ui/layout";
import { Link, RouteComponentProps } from "@reach/router";

export default function Menu(props: RouteComponentProps) {
  return (
    <Center h="100vh">
      <Flex direction="column" align="center" justify="center">
        <Heading color="whitesmoke">
          higher or lower - video game edition
        </Heading>
        <Link to="/play">
          <Button w="160px" mt="8">
            start
          </Button>
        </Link>
      </Flex>
    </Center>
  );
}
