import React, { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  VStack,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.js";
import { setAccessToken } from "../services/localStorage";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setUsername("");
      setPassword("");
      setAccessToken(data.token);
      mutation.reset();
      navigate("/home");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };
  return (
    <Container w="100vw" h="100vh" maxW="100xw" centerContent>
      <Box
        margin="auto"
        p={6}
        w="md"
        border="1px"
        borderRadius="md"
        borderColor="blackAlpha.200"
      >
        <Text align="center" fontSize="3xl" fontWeight="bold">
          Login
        </Text>
        {mutation.isError && (
          <Alert status="error" borderRadius="md" my={2}>
            <AlertIcon />
            <AlertTitle>{mutation.error.response.data.message}</AlertTitle>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={2} align="start">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {mutation.isLoading ? (
              <>
                <Button colorScheme="teal" w="full" type="submit" isLoading>
                  Submit
                </Button>
              </>
            ) : (
              <Button colorScheme="teal" w="full" type="submit">
                Submit
              </Button>
            )}
          </VStack>
        </form>
        <Link to="/register" style={{ color: "#2C7A7B" }}>
          Register
        </Link>
      </Box>
    </Container>
  );
}

export default LoginPage;
