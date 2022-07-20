import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Avatar,
  HStack,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import SelectCategory from "./SelectCategory";
import fetchMe from "../../query/fetchMe";
import { createTransaction } from "../../api/transaction";

import walletIcon from "../../assets/wallet.png";
import { QuestionIcon } from "@chakra-ui/icons";

function AddTransaction({ isOpen, onClose }) {
  const modalSelectCategory = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [note, setNote] = useState(null);

  const { data } = fetchMe();

  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(createTransaction, {
    onSuccess: (data) => {
      setSelectedCategory();
      setAmount();
      setDate();
      setNote();
      queryClient.invalidateQueries("getMe");
      onClose();
      mutate.reset();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const handleAddTransaction = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    if (!date) {
      alert("Please enter a date");
      return;
    }
    mutate({
      category: selectedCategory.name,
      amount,
      date,
      note,
      type: selectedCategory.type,
    });
    if (isError) {
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem
              w="100%"
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.100"
              p={2}
            >
              <Box>
                <Flex flexDirection="column">
                  <Text fontSize="xs" color="GrayText" mb={2}>
                    Wallet
                  </Text>
                  <HStack>
                    <Avatar src={walletIcon} size="xs" />
                    <Text casing="capitalize">{data?.user.username}</Text>
                  </HStack>
                </Flex>
              </Box>
            </GridItem>
            <GridItem
              w="100%"
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.100"
              p={2}
              as="button"
              _hover={{ borderColor: "blackAlpha.100" }}
              _active={{ borderColor: "blackAlpha.100" }}
              _focus={{ borderColor: "blackAlpha.100" }}
              onClick={modalSelectCategory.onOpen}
            >
              <Flex flexDirection="column">
                <HStack>
                  <Text fontSize="xs" color="GrayText" mb={2}>
                    Category
                  </Text>
                </HStack>
                <HStack>
                  {selectedCategory ? (
                    <Avatar src={selectedCategory?.icon} size="xs" />
                  ) : (
                    <QuestionIcon color="gray" />
                  )}
                  <Text color="GrayText" casing="capitalize">
                    {selectedCategory?.name || "Select category"}
                  </Text>
                </HStack>
              </Flex>

              <SelectCategory
                isOpen={modalSelectCategory.isOpen}
                onClose={modalSelectCategory.onClose}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </GridItem>
            <GridItem
              w="100%"
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.100"
              p={2}
            >
              <Box>
                <Flex flexDirection="column">
                  <Text fontSize="xs" color="GrayText" mb={2}>
                    Amount
                  </Text>
                  <HStack>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </HStack>
                </Flex>
              </Box>
            </GridItem>
            <GridItem
              w="100%"
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.100"
              p={2}
            >
              <Box>
                <Flex flexDirection="column">
                  <Text fontSize="xs" color="GrayText" mb={2}>
                    Date
                  </Text>
                  <HStack>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </HStack>
                </Flex>
              </Box>
            </GridItem>
            <GridItem
              w="100%"
              border="1px"
              borderRadius="md"
              borderColor="blackAlpha.100"
              p={2}
              colSpan={2}
            >
              <Box>
                <Flex flexDirection="column">
                  <Text fontSize="xs" color="GrayText" mb={2}>
                    Note
                  </Text>
                  <HStack>
                    <Input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </HStack>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          {isLoading ? (
            <Button colorScheme="teal" isLoading>
              Save Transaction
            </Button>
          ) : (
            <Button colorScheme="teal" onClick={handleAddTransaction}>
              Save Transaction
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTransaction;
