import React from "react";
import {
  Text,
  Box,
  ListItem,
  HStack,
  Flex,
  Avatar,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import dateFormat from "dateformat";

import { Income, Expense } from "./transactionItem";
import EditTransaction from "../transaction/EditTransaction";

function TransactionListItem({ id, type, category, amount, date, note }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const item = {};
  if (type === "income") {
    const result = Income.filter((el) => el.name === category);
    item.category = result[0].name;
    item.icon = result[0].icon;
    item.type = "income";
  }
  if (type === "expense") {
    const result = Expense.filter((el) => el.name === category);
    item.category = result[0].name;
    item.icon = result[0].icon;
    item.type = "expense";
  }

  const dueDate = new Date(date);

  return (
    <ListItem>
      <Text
        as="button"
        w="full"
        _hover={{ bg: "#EFF9F3", outline: "0px", borderColor: "white" }}
        _focus={{ outline: "0px", borderColor: "white" }}
        p={1}
        onClick={onOpen}
      >
        <Flex justifyContent="space-between">
          <Box>
            <HStack>
              <Avatar src={item.icon} size="md" />
              <Text fontSize="lg" casing="capitalize" fontWeight="bold">
                {item.category}
              </Text>
              <Text color="GrayText">
                {dateFormat(dueDate, "dddd d mmmm yyyy")}
              </Text>
              {note ? (
                <Text color="orange">{`Note : ${
                  note.length > 20 ? note.substring(0, 20) + "..." : note
                }`}</Text>
              ) : null}
            </HStack>
          </Box>
          <Box>
            <Text
              fontSize="lg"
              color={type === "income" ? "teal" : "red"}
              fontWeight="semibold"
              mt={2.5}
            >
              {amount}
            </Text>
          </Box>
        </Flex>
        <Divider mt={4} />
      </Text>
      <EditTransaction
        isOpen={isOpen}
        onClose={onClose}
        oldCategory={category}
        oldAmount={amount}
        oldDate={date}
        oldNote={note}
        item={item}
        id={id}
      />
    </ListItem>
  );
}

export default TransactionListItem;
