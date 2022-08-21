const fs = require("fs");

const reqHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<html><body><form method="POST" action="/message"><input type="text" name="message"><button>Send</button></form></body></html>'
    );
    res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    // res.setHeader("Content-Type", "text/html");
    // res.write("<html><body><h4>Welcome to Node JS</h4></body></html>");
    // res.end();
  }
};

module.exports = { Handler: reqHandler, text: "Some Text" };
