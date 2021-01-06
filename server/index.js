import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

import postRoutes from "./routes/posts.js";
dotenv.config()

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get('/',(req,res)=> {
  res.send('Hello to Moments API');
});

// const CONNECTION_URL =
//   "mongodb+srv://samh164:admin@cluster0.zzn5g.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )

  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
