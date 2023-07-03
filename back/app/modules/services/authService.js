import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/utils/jwtUtils.js';
import { TOKEN_EXPIRY_TIME } from '../../utils/core/genericConstants.js';

export const registerUser = async (
  { email, lastname, firstname, password, pseudo },
  models
) => {
  const { users } = models;

  const hashedPassword = bcrypt.hashSync(password, 8);
  return await users.create({
    email,
    lastname,
    firstname,
    password: hashedPassword,
    pseudo,
  });
};

export const loginUser = async ({ email, password }, models) => {
  const { users } = models;

  const user = await users.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found.');
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Incorrect password!');
  }
  await users.update({ isLoggedIn: true }, { where: { id: user.id } });
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
};

export const logoutUser = async (userId, models) => {
  const { users } = models;
  const user = await users.findByPk(userId);
  if (!user) {
    throw new Error('User not found.');
  }
  await users.update({ isLoggedIn: false }, { where: { id: user.id } });
  return user;
};

export const processForgotPassword = async (email, models) => {
  const { users } = models;

  const user = await users.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found.');
  }
  const token = generateToken({ id: user.id }, TOKEN_EXPIRY_TIME); // expires in 1 hour
  return { user, token };
};
