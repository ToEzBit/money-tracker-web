import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  useColorModeValue,
  Avatar,
  Text,
} from "@chakra-ui/react";
import fetchMe from "../../../query/fetchMe";

import { removeAccessToken } from "../../../services/localStorage";
import walletIcon from "../../../assets/wallet.png";

function Navbar() {
  const { data } = fetchMe();
  return (
    <>
      <>
        <Box as="section">
          <Box
            as="nav"
            bg="bg-surface"
            boxShadow={useColorModeValue("sm", "sm-dark")}
          >
            <Container py={4} maxW="100%">
              <HStack spacing="10" justify="space-between">
                <Flex justify="space-between" flex="1">
                  <>
                    <Flex>
                      <Avatar src={walletIcon} />
                      <Flex flexDirection="column" px={4}>
                        <Text
                          casing="capitalize"
                          color="gray.500"
                        >{`${data?.user.username}`}</Text>
                        <Text
                          fontWeight="bold"
                          casing="capitalize"
                        >{`amount : ${data?.user.totalAmount || 0} $`}</Text>
                      </Flex>
                    </Flex>
                  </>
                  <HStack spacing="3">
                    <Button colorScheme="teal">ADD TRANSACTION</Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        window.location.reload();
                        removeAccessToken();
                      }}
                    >
                      Logout
                    </Button>
                  </HStack>
                </Flex>
              </HStack>
            </Container>
          </Box>
        </Box>
      </>
      <Outlet />
    </>
  );
}

export default Navbar;
