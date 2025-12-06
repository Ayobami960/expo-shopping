import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express"
import { serve } from "inngest/express"

import { functions, inngest } from "./config/inngest.js";


import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";



const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); // this middle where adds auth object under the req => req.auth

app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});

// make our app ready for deplayment
if (ENV.NODE_ENV === "production") {
    // if you are in the production envronment take all admin footer and the dist footer should be a dist asset
    app.use(express.static(path.join(__dirname, "../admin/dist")));

    // if we reset any route other then the api route we have right to see a react application
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    })
    // app.get("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
    // });

}


const startServer = async () => {
    await connectDB();
    app.listen(ENV.PORT, () => {
        console.log("Server is up and running")
    });
};

startServer();