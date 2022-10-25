import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";

export default function ValidateInput({ errors, touched, name, label, validate, type, values }) {

  const haveValue = {
    backgroundColor: "white",
    top: "0",
    fontSize: "8pt",
    transform: "translateY(-45%)",
  }

  const normalInput = {
    fontSize: "small",
    transform: "translateY(-50%)",
    top: "50%",
  }

  const styleInput = {
    position: 'absolute',
    zIndex: '2',
    left: '1rem',
    padding: '0 .2rem',
    color: 'gray.800',
  }

  return (
    <FormControl
      isInvalid={!!errors && touched}
      pos="relative"
    >
      <FormLabel
        htmlFor={name}
        transition='.2s'
        _focus={haveValue}
        sx={values ? { ...haveValue, ...styleInput } : { ...normalInput, ...styleInput }}
      >
        {label}
      </FormLabel>
      <Field
        as={Input}
        id={name}
        name={name}
        type={type}
        validate={validate}
        fontSize="10pt"
        autoComplete="new-password"
      />
      <FormErrorMessage sx={{ pos: 'absolute', top: '100%', transform: 'translateY(-45%)', fontSize: 'small' }}>{errors}</FormErrorMessage>
    </FormControl>
  );
}