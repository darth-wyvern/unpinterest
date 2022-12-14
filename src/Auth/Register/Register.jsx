import React from "react";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import ValidateInput from "../ValidateInput";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function Register({ nextStep, getValues }) {
  const navigation = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
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

  const validateConfirmPassword = (password, confirmPassword) => {
    let error;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        error = "Password not matched";
      }
    }
    return error;
  };

  const initialValues = {
    firstName: "nguyen",
    lastName: "nhan",
    email: "nhan@gmail.com",
    password: "123123",
    confirmPassword: "123123",
  };

  const handleSubmit = (values) => {
    getValues(values);
    nextStep();
  };

  return (
    <Flex
      bg={{ base: "white", sm: "#0007" }}
      position="fixed"
      inset={0}
      p={{ base: 0, sm: 5 }}
      overflow="auto"
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
            Register
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, errors, touched, values }) => (
              <Flex as="form" onSubmit={handleSubmit} flexDir="column" gap={6}>
                <Flex gap={6} minW="20em">
                  <ValidateInput
                    touched={touched}
                    errors={errors.firstName}
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={values.firstName}
                  />

                  <ValidateInput
                    touched={touched}
                    errors={errors.lastName}
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                  />
                </Flex>

                <ValidateInput
                  touched={touched}
                  errors={errors.email}
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  validate={(value) => validateEmail(value)}
                />

                <ValidateInput
                  touched={touched}
                  errors={errors.password}
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                />

                <ValidateInput
                  touched={touched}
                  errors={errors.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  validate={(value) =>
                    validateConfirmPassword(values.password, value)
                  }
                />

                <Button
                  type="submit"
                  disabled={!errors}
                  colorScheme="teal"
                  width="full"
                >
                  next
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
            <Box>
              <Link to="/signin">Login with account</Link>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
