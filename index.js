const express = require("express");
const app = express();

const port = process.env.PORT || 3306
app.listen(3000, () => {
  console.log(`listening on port ${port}`);
});
