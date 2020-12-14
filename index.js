const app = require("./app");
const http = require("http");
const server = http.createServer(app);

server.listen(3001, () => {
  console.log(`
  ${
    process.env.NODE_ENV === "development"
      ? "server is running on port 3001"
      : ""
  }
  `);
});
