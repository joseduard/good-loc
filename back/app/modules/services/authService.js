import UsersImport from "../../database/models/Users.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/utils/jwtUtils.js";
import {TOKEN_EXPIRY_TIME} from "../../utils/core/genericConstants.js";
import db from "../../config/db.config.js";
const Users = UsersImport(db.sequelize);
export const registerUser = async ({
  email,
  lastname,
  firstname,
  password,
  pseudo,
}) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  return await Users.create({
    email,
    lastname,
    firstname,
    password: hashedPassword,
    pseudo,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found.");
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error("Incorrect password!");
  }
  await Users.update({ isLoggedIn: true }, { where: { id: user.id } });
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
};

export const logoutUser = async (userId) => {
  const user = await Users.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  await Users.update({ isLoggedIn: false }, { where: { id: user.id } });
};

export const processForgotPassword = async (email) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found.");
  }
  const token = generateToken({ id: user.id }, TOKEN_EXPIRY_TIME); // expires in 1 hour
  return { user, token };
};
