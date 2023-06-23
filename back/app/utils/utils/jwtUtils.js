import jwt from "jsonwebtoken";


/**
 *
 * @param {{id, pseudo}} payload
 * @param expiry temps d'expiration du token crée
 */
export function generateToken(payload, expiry = process.env.TOKEN_EXPIRY_TIME) {
  console.log(expiry)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Number(expiry) });
}
