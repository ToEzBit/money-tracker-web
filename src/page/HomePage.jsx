import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  List,
  Container,
  Skeleton,
  Stack,
  Divider,
  Center,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import dateFormat from "dateformat";

import FetchTransactions from "../query/FetchTransactions";
import FetchTransactionsByDate from "../query/FetchTransactionsByDate";
import TransactionListItem from "../components/transaction/TransactionListItem";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState();
  const [allDay, setAllDay] = useState(false);
  const [inputDate, setInputDate] = useState();

  const [dynamicColorTodayButton, setDynamicColorTodayButton] = useState({
    colorScheme: "teal",
  });
  const [dynamicColorAllDayButton, setDynamicColorAllDayButton] = useState({});

  const { data: allData, isLoading } = FetchTransactions();
  const { data: dataByDate } = FetchTransactionsByDate(selectedDate);

  useEffect(() => {
    setSelectedDate(dateFormat(new Date(), "yyyy-mm-dd"));
  }, []);

  return (
    <Box w="100vw" mh="100%" h="100vh" bg="blackAlpha.200">
      <Container maxW="container.md" pt={8}>
        <Box bg="white" p={4} borderRadius="md">
          <Center>
            <HStack spacing="30px" mb={4}>
              <Button
                p={4}
                onClick={() => {
                  setAllDay(true);
                  setInputDate();
                  setDynamicColorTodayButton();
                  setDynamicColorAllDayButton({ colorScheme: "teal" });
                }}
                {...dynamicColorAllDayButton}
              >
                All Day
              </Button>
              <Button
                p={4}
                onClick={() => {
                  setAllDay(false);
                  setSelectedDate(dateFormat(new Date(), "yyyy-mm-dd"));
                  setInputDate();
                  setDynamicColorAllDayButton({});
                  setDynamicColorTodayButton({ colorScheme: "teal" });
                }}
                {...dynamicColorTodayButton}
              >
                Today
              </Button>
              <Input
                type="date"
                value={inputDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setInputDate(e.target.value);
                  setDynamicColorAllDayButton({});
                  setDynamicColorTodayButton({});
                  setAllDay(false);
                }}
              />
            </HStack>
          </Center>
          <Divider />
          {isLoading ? (
            <>
              <Stack>
                {[...Array(8)].map((el, idx) => (
                  <Skeleton key={idx} height="30px" />
                ))}
              </Stack>
            </>
          ) : null}
          <List spacing={3} overflowY="auto" maxH="md">
            {allDay ? (
              <>
                {allData?.transactions.length > 0 ? (
                  <>
                    {allData?.transactions.map((el, idx) => {
                      return <TransactionListItem key={idx} {...el} />;
                    })}
                  </>
                ) : (
                  <>
                    <Text color="GrayText">No Transactions</Text>
                  </>
                )}
              </>
            ) : (
              <>
                {dataByDate?.transactions.length > 0 ? (
                  <>
                    {dataByDate?.transactions.map((el, idx) => {
                      return <TransactionListItem key={idx} {...el} />;
                    })}
                  </>
                ) : (
                  <>
                    <Text color="GrayText">No Transactions</Text>
                  </>
                )}
              </>
            )}
          </List>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
