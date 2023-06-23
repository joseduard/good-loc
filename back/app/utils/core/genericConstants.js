const statusCodes = {
  STATUS_OK: 200,
  STATUS_NOT_FOUND: 404,
  STATUS_UNAUTHORIZED: 401,
  STATUS_INTERNAL_SERVER_ERROR: 500,
};
const TOKEN_EXPIRY_TIME =  60 * 60 * 24; // 24 hours

export { statusCodes, TOKEN_EXPIRY_TIME };
