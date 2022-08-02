import * as Yup from "yup";

// form schema to deal with errors

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("This email is invalid")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("This field is required"),
}).required();

const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("This email is invalid")
    .required("This field is required"),
  username: Yup.string()
    .min(2, "This name is invalid")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "This password is too short")
    .required("This field is required"),
}).required();

export { loginValidationSchema, registerValidationSchema };
