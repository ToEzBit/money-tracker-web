import React, { useState, useEffect } from "react";
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
import fetchMe from "../../query/FetchMe";
import { updateTransaction, deleteTransaction } from "../../api/transaction";

import walletIcon from "../../assets/wallet.png";
import { QuestionIcon } from "@chakra-ui/icons";

function EditTransaction({
  isOpen,
  onClose,
  oldCategory,
  oldAmount,
  oldDate,
  oldNote,
  item,
  id,
}) {
  const modalSelectCategory = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [note, setNote] = useState(null);

  const { data } = fetchMe();

  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectedCategory({ ...item });
    setAmount(oldAmount);
    setDate(oldDate);
    setNote(oldNote);
  }, []);

  const { mutate, isLoading, isError } = useMutation(updateTransaction, {
    onSuccess: (data) => {
      setSelectedCategory();
      setAmount();
      setDate();
      setNote();
      queryClient.invalidateQueries("getMe");
      queryClient.invalidateQueries("getTransactions");
      onClose();
      mutate.reset();
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: deleteMutation } = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries("getMe");
      queryClient.invalidateQueries("getTransactions");
      onClose();
      deleteMutation.reset();
    },
  });

  const handleUpdateTransaction = () => {
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
      id,
      category: selectedCategory.category
        ? selectedCategory.category
        : selectedCategory.name,
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
        <ModalHeader>Edit Transaction</ModalHeader>
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
                    {selectedCategory?.name
                      ? selectedCategory?.name
                      : item.category}
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
          <Button colorScheme="red" mr={3} onClick={() => deleteMutation(id)}>
            Delete
          </Button>
          {isLoading ? (
            <Button colorScheme="teal" isLoading>
              Save Transaction
            </Button>
          ) : (
            <Button colorScheme="teal" onClick={handleUpdateTransaction}>
              Save Transaction
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditTransaction;
