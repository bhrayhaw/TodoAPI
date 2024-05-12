const express = require("express");
const app = express();
require("./startup/dbconfig")

const port = process.env.PORT || 3306
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
