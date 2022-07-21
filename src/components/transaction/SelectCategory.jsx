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
  HStack,
  VStack,
  Text,
  Center,
  List,
  ListItem,
  Avatar,
} from "@chakra-ui/react";

import { Income, Expense } from "./transactionItem";

function SelectCategory({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
}) {
  const [switchTab, setSwitchTab] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <HStack spacing="24">
              <Text
                as="button"
                color="GrayText"
                _hover={{ borderColor: "white", outline: "0px" }}
                _focus={{
                  borderColor: "white",
                  color: "green.500",
                  outline: "0px",
                }}
                onClick={() => setSwitchTab(false)}
              >
                EXPENSE
              </Text>
              <Text
                as="button"
                color="GrayText"
                _hover={{ borderColor: "white", outline: "0px" }}
                _focus={{
                  borderColor: "white",
                  color: "green.500",
                  outline: "0px",
                }}
                onClick={() => setSwitchTab(true)}
              >
                INCOME
              </Text>
            </HStack>
          </Center>
          <List>
            <VStack align="stretch" my={4}>
              {switchTab ? (
                <>
                  {Income.map((el, idx) => (
                    <ListItem
                      key={idx}
                      w="100%"
                      p={4}
                      role="button"
                      _hover={{ bg: "#EFF9F3" }}
                      onClick={() => {
                        setSelectedCategory(el);
                        onClose();
                      }}
                    >
                      <HStack>
                        <Avatar src={el.icon} size="sm" />
                        <Text casing="capitalize">{el.name}</Text>
                      </HStack>
                    </ListItem>
                  ))}
                </>
              ) : (
                <>
                  {Expense.map((el, idx) => (
                    <ListItem
                      key={idx}
                      w="100%"
                      p={4}
                      role="button"
                      _hover={{ bg: "#EFF9F3" }}
                      onClick={() => {
                        setSelectedCategory(el);
                        onClose();
                      }}
                    >
                      <HStack>
                        <Avatar src={el.icon} size="sm" />
                        <Text casing="capitalize">{el.name}</Text>
                      </HStack>
                    </ListItem>
                  ))}
                </>
              )}
            </VStack>
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SelectCategory;
