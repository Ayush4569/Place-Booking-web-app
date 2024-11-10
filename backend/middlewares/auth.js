import { getUser } from "../services/jwt.js";

function checkAuthCookie(req, res, next) {
  const token = req.cookies?.["authToken"];
  let user = null;
  req.user = null;
  if (token == null || token == undefined) return next();
  user = getUser(token);
  req.user = user;
  next();
}
export { checkAuthCookie };
