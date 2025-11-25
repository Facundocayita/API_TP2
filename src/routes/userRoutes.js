const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.list);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.remove);
router.post("/login", UserController.login);

module.exports = router;