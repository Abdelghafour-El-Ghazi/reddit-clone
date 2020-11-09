import { re } from "../constants";
import { User } from "../entities/User";
import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = async (options: UsernamePasswordInput) => {
  if (!re.test(String(options.email).toLowerCase())) {
    return [
      {
        field: "email",
        message: "please enter a valid email",
      },
    ];
  }
  if (options.email.length <= 2) {
    return [
      {
        field: "email",
        message: "email length must be greater than 2",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "username length must be greater than 2",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "password length must be greater than 2",
      },
    ];
  }

  if (await User.findOne({ where: { username: options.username } })) {
    return [
      {
        field: "username",
        message: "this username exists already",
      },
    ];
  }

  return null;
};
