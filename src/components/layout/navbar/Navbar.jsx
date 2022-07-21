import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  useColorModeValue,
  Avatar,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import AddTransaction from "../../transaction/AddTransaction";

import FetchMe from "../../../query/FetchMe";
import { removeAccessToken } from "../../../services/localStorage";
import walletIcon from "../../../assets/wallet.png";

function Navbar() {
  const { data } = FetchMe();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                  <Link to="/" style={{ marginTop: "13px" }}>
                    Home Page
                  </Link>
                  <Link to="/report" style={{ marginTop: "13px" }}>
                    Report
                  </Link>
                  <HStack spacing="3">
                    <Button colorScheme="teal" onClick={onOpen}>
                      ADD TRANSACTION
                    </Button>
                    <AddTransaction isOpen={isOpen} onClose={onClose} />
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
