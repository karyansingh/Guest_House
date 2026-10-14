import { body, query, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
};

export const validateRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required"),

    body("designation")
        .trim()
        .notEmpty()
        .withMessage("Designation is required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
]