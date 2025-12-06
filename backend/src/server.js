import express from "express";



const app = express();


app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});


const startServer = async () => {
   
    app.listen(ENV.PORT, () => {
        console.log("Server is up and running")
    });
};

startServer();