import jwt from "jsonwebtoken";
// import {signedCookie} from "cookie-parser";

export const generateToken =  (userId, res) => {
  const token =  jwt.sign({ userId }, process.env.JSON_WEB_TOKEN, {
    expiresIn: "7d",
  }); 


//   res.cookieParser
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
