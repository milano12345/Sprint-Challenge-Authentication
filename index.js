const server = require("./api/server.js");
const router = require("./auth/auth-router");

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
