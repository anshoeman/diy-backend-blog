const express = require("express");
const app = express();
const connectDB = require("./db.js/db.config");
const cors = require("cors");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
  res.send('anshuman');
})

app.use("/", require("./routes/api/admin"));
app.use("/auth", require("./routes/api/auth"));
app.use("/publishblog", require("./routes/api/Blogs"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server connection established at port ${PORT}`)
);
