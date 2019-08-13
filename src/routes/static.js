const express = require("express");
const router = express.Router();


router.get("/", (req, res, next) => {
    res.send("Welcome to Bloccit");
  });

router.get("/marco", (req, res, next) => {
  res.send("polo");
});

//add /marco to localhost:3000; localhost:3000/marco ===> polo
module.exports = router;