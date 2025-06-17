require("dotenv").config();
const express= require("express");
const cors=require("cors");
const path= require("path");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes")
const sessionRoutes=require('./routes/sessionRoutes')
const questionRoutes=require('./routes/questionRoutes');
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");


const app=express();

// middleware to handl cors
app.use( cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
})
)

connectDB();

// middleware
app.use(express.json());
// routes
app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}))

// start server
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});