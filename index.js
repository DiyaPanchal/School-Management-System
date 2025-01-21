import express from "express";
import "dotenv/config";


const app = express();
const port = process.env.PORT || 3003;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
