const router = require("express").Router();
const { openedDoor } = require("../controllers/opene-door-controller");

router.get("/perspective", openedDoor);
