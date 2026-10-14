import * as Yup from 'yup';
export const loginValidation = Yup.object({
    email: Yup.string().required("Please enter your email").email('Invalide email'),
    password: Yup.string().required("Please enter password").min(6, "Password must be at least 6 characters long"),
});

export const registrationValidation = Yup.object({
    name: Yup.string()
        .required("Name is required"),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    designation: Yup.string()
        .required("Designation is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

// export const changePasswordValidation = Yup.object({
//     email: Yup.string().required("Please enter your email").email('Invalide email'),
//     currentPassword: Yup.string().required("Please enter current password").min(6, "Current password must be at least 6 characters long"),
//     newPassword: Yup.string().required("Please enter new password").min(6, "New password must be at least 6 characters long"),
// });

// export const forgotPasswordValidation = Yup.object({
//     email: Yup.string().required("Please enter your email").email('Invalide email'),
// });

// export const forgotPasswordChangeValidation = Yup.object({
    
//     otp: Yup.string().required("OTP is required"),
    
//     password: Yup.string().required("Password is required")
//         .min(6, "Password must be at least 6 characters"),

//     conform_password: Yup.string()
//         .required("Confirm Password is required")
//         .oneOf([Yup.ref("password"), null], "Passwords must match"),
// });

