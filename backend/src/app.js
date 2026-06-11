const express = require('express');

const authRoutes = require("./modules/auth/auth.routes.js");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Running"
    });
});

app.use("/api/v1/auth", authRoutes);

module.exports = app;