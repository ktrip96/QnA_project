const express = require("express");

const app = express();

// select the port for heroku or 5000 for local development
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.get("/test", (req, res) => {
  res.send("It works");
});
