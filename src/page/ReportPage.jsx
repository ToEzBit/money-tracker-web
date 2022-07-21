import React from "react";
import { Box, Center, Container } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import FetchMe from "../query/FetchMe";

ChartJS.register(ArcElement, Tooltip, Legend);

function ReportPage() {
  const { data } = FetchMe();

  const chartData = {
    labels: ["Total Income", "Total Expense"],
    datasets: [
      {
        data: [data.user.totalIncome || 1, data.user.totalExpense || 1],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box w="100vw" minH="100vh" h="100%" bg="blackAlpha.200">
      <Container maxW="container.md" pt={8}>
        <Center>
          <Box bg="white" p={4} borderRadius="md" w={80}>
            <Doughnut data={chartData} />
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export default ReportPage;
