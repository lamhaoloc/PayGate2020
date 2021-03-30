const authMiddleware = require('../middleware/auth');
const express = require("express");
const router = express.Router();

/* GET home page. */

router.get("/getToken/:id", async (req, res) => {
    const token =  authMiddleware.getAuthCode(req.params.id);
    res.json(token);
});

module.exports = router;