import * as Yup from "yup";

const scheme = Yup.object().shape({
    email: Yup.string()
        .required("Please enter email address")
        .email("Please enter valid email address"),

    password: Yup.string()
        .required("Please enter your password.")
        .min(6, "Password is too short - should be 6 chars minimum.")
       ,
    matchPassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});

export default scheme;
