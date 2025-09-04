require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const PORT = process.env.PORT || 3000;

//database connection
connectDB()


app.listen(PORT, () => {
  
    console.log(`Server is running on http://localhost:${PORT}`);
});

