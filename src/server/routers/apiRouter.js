import { authenticateUser } from "../db";

const express = require("express");
const jwt = require("jsonwebtoken");
const ApiRouter = express.Router();

ApiRouter.post("/login", (req, res) => {
    if (authenticateUser(req.body.username, req.body.password)) {
        const token = jwt.sign(req.body.username, process.env.TOKEN_SECRET, { expiresIn: "7d" });
        res.json(token);
    }

});

export default ApiRouter;