// spec/errorUtils.test.js
const { signUpErrors, signInErrors } = require("../../utils/errors.utils");

describe("Error Utils", () => {
  describe("signUpErrors", () => {
    // spec/errorUtils.test.js
    test("should return proper error messages for email and password errors", () => {
      const emailError = new Error("email");
      const passwordError = new Error("password");
      const duplicateEmailError = new Error();
      duplicateEmailError.code = 11000;
      duplicateEmailError.keyValue = { email: "test@example.com" };

      const emailErrResult = signUpErrors(emailError);
      expect(emailErrResult.email).toBe("Email incorrect");

      const passwordErrResult = signUpErrors(passwordError);
      expect(passwordErrResult.password).toBe(
        "Le mot de passe doit faire 6 caractères minimum"
      );

      const duplicateEmailErrResult = signUpErrors(duplicateEmailError);
      expect(duplicateEmailErrResult.email).toBe(
        "Cet email est déjà enregistré"
      );
    });
  });

  describe("signInErrors", () => {
    test("should return proper error messages for email and password errors", () => {
      const emailError = new Error("email");
      const passwordError = new Error("password");

      const emailErrResult = signInErrors(emailError);
      expect(emailErrResult.email).toBe("Email inconnu");

      const passwordErrResult = signInErrors(passwordError);
      expect(passwordErrResult.password).toBe(
        "Le mot de passe ne correspond pas"
      );
    });
  });
});
