const { body, validationResult } = require("express-validator");

const validateVisitor = [
    body("visitorName")
        .trim()
        .notEmpty()
        .withMessage("Visitor name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email format"),

    body("phone")
        .matches(/^\+?[0-9]{10,15}$/)
        .withMessage("Invalid phone number"),

    body("purpose")
        .trim()
        .notEmpty()
        .withMessage("Purpose is required"),

    body("personToMeet")
        .trim()
        .notEmpty()
        .withMessage("Person to Meet is required"),

    body("visitDate")
        .notEmpty()
        .withMessage("Visit date is required"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array()
            });

        }

        next();
    }
];

module.exports = {
    validateVisitor
};