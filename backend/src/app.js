require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    allowedHeader: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
