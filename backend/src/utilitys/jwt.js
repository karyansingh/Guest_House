import jwt from "jsonwebtoken";
export function generateAccessToken(user_id, email, role, applicationId) {
  return jwt.sign(
    {
      id: user_id,
      email: email,
      role: role,
      applicationId:applicationId
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY || "8h",
    }
  );
}