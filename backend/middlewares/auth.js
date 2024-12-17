// Middleware for basic authentication
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const [username, password] = Buffer.from(base64Credentials, "base64").toString().split(":");

  const adminUsername = "admin";
  const adminPassword = "password123";

  if (username !== adminUsername && password !== adminPassword) {
    return res.status(403).json({ message: "Invalid credentials" }); 
  }

  return next();
};

module.exports = basicAuth