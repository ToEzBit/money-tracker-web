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
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../services/localStorage";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const mutation = useMutation(register, {
    onSuccess: (data) => {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setAccessToken(data.token);
      mutation.reset();
      navigate("/home");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorUsername(false);
    setErrorPassword(false);
    setErrorConfirmPassword(false);

    if (!username) {
      setErrorUsername(true);
      return;
    }
    if (password.length < 6) {
      setErrorPassword(true);
      return;
    }
    if (confirmPassword !== password) {
      setErrorConfirmPassword(true);
      return;
    }
    mutation.mutate({ username, password, confirmPassword });
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
          Register
        </Text>
        {mutation.isError && (
          <Alert status="error" borderRadius="md" my={2}>
            <AlertIcon />
            <AlertTitle>{mutation.error.response.data.message}</AlertTitle>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <VStack spacing={2} align="start">
            <FormControl isInvalid={errorUsername}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errorPassword}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>
                Password is more than 6 character.
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errorConfirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                id="confirmPassword"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>Password not match</FormErrorMessage>
            </FormControl>
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
        <Link to="/login" style={{ color: "#2C7A7B" }}>
          Have any account ?
        </Link>
      </Box>
    </Container>
  );
}

export default RegisterPage;
