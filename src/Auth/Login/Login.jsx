import React from "react";
import { Box, Flex, Button, Image, Checkbox, Text } from "@chakra-ui/react";
import ValidateInput from "../ValidateInput";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useDispatch } from "react-redux";
import { signin } from "../AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function Login({ nextStep }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  return (
    <Flex
      bg={{ base: "white", sm: "#0007" }}
      position="fixed"
      inset={0}
      p={{ base: 0, sm: 5 }}
      overflow="auto"
      zIndex={999}
    >
      <Flex
        m="auto"
        borderRadius="1rem"
        overflow={{ base: "hidden", sm: "none" }}
        maxW="960px"
      >
        <Box display={{ base: "none", md: "block" }}>
          <Image
            height="100%"
            objectFit="cover"
            src="https://i.pinimg.com/736x/67/13/81/6713813ffa60c09afb28013bea53020a.jpg"
            loading="lazy"
          />
        </Box>
        <Box
          p={{ base: 5, sm: 10 }}
          bg="white"
          pos={{ base: "static", sm: "relative" }}
        >
          <Button
            pos="absolute"
            right={0}
            top={0}
            m={3}
            onClick={() => navigation("/")}
          >
            <SmallCloseIcon />
          </Button>
          <Box w="64px" h="64px" borderRadius="50%" overflow="hidden" m="auto">
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src="https://cdn3.vectorstock.com/i/1000x1000/28/47/lock-icon-with-a-long-shadow-vector-20142847.jpg"
              loading="lazy"
            />
          </Box>
          <Box fontSize="xx-large" textAlign="center" mb={5}>
            Login
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              dispatch(signin(values));
              nextStep();
            }}
          >
            {({ handleSubmit, errors, touched, values }) => (
              <Flex
                as="form"
                onSubmit={handleSubmit}
                flexDir="column"
                gap={6}
                minW="20em"
              >
                <ValidateInput
                  touched={touched}
                  errors={errors.email}
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  validate={(values) => validateEmail(values)}
                />

                <ValidateInput
                  touched={touched}
                  errors={errors.password}
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                />

                <Field
                  as={Checkbox}
                  id="remember"
                  name="remember"
                  colorScheme="purple"
                >
                  <Box fontSize="small">Remember me?</Box>
                </Field>

                <Button
                  type="submit"
                  disabled={!errors}
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Flex>
            )}
          </Formik>
          <Flex
            fontSize="small"
            pos="absolute"
            bottom={0}
            left="50%"
            transform="translate(-50%)"
            p={5}
            whiteSpace="nowrap"
          >
            <Text mr={1}>Don't have an account?</Text>
            <Link to="/signup" fontWeight="bold">
              <Text color="blue" fontWeight="bold">
                Register
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
