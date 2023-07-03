import {
  registerUser,
  loginUser,
  logoutUser,
  processForgotPassword,
} from '../services/authService.js';
import {
  statusCodes,
  TOKEN_EXPIRY_TIME,
} from '../../utils/core/genericConstants.js';
import { sendError, sendResponse } from '../../utils/utils/httpUtils.js';
import { generateToken } from '../../utils/utils/jwtUtils.js';
import { sendPasswordResetEmail } from '../services/emailService.js';

export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body, req.models);
    sendResponse(
      res,
      statusCodes.STATUS_OK,
      `${newUser.pseudo} was registered successfully!`
    );
  } catch (err) {
    console.log(err);
    sendError(
      res,
      statusCodes.STATUS_INTERNAL_SERVER_ERROR,
      'There was a problem with registration.'
    );
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body, req.models);

    let token = generateToken(
      { id: user.id, pseudo: user.pseudo },
      TOKEN_EXPIRY_TIME
    );

    sendResponse(res, statusCodes.STATUS_OK, 'Login successful', {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.log(err);

    sendError(
      res,
      statusCodes.STATUS_INTERNAL_SERVER_ERROR,
      'There was a problem with login.'
    );
  }
};

export const logout = async (req, res) => {
  try {
    const user = await logoutUser(req.userId, req.models);

    sendResponse(
      res,
      statusCodes.STATUS_OK,
      `l'utilisateur avec l'id ${user.id} a été deconnecté`
    );
  } catch (err) {
    console.log(err);

    sendError(
      res,
      statusCodes.STATUS_INTERNAL_SERVER_ERROR,
      'Une erreur est survenue lors de la déconnexion'
    );
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { user, token } = await processForgotPassword(
      req.body.email,
      req.models
    );

    const { error, info } = await sendPasswordResetEmail(user, token, req);
    if (error) {
      return sendError(
        res,
        statusCodes.STATUS_INTERNAL_SERVER_ERROR,
        'Error occurred while sending password reset email.'
      );
    } else {
      return sendResponse(
        res,
        statusCodes.STATUS_OK,
        'Password reset email sent.'
      );
    }
  } catch (err) {
    console.log(err);

    sendError(
      res,
      statusCodes.STATUS_INTERNAL_SERVER_ERROR,
      'Error occurred while processing password reset request.'
    );
  }
};
