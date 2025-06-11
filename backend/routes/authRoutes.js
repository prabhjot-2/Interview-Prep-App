const express =require("express");
const { registerUser, loginUser, getUserProfile}=require("../controllers/authController");
const {protect}=require("../middlewares/authMiddleware");

const router =express.Router();

// Auth Routes
router.post("/register",registerUser); //registerUser
router.post("/login",loginUser); //login User
router.get("/profile",protect,getUserProfile) //get user Profile

module.exports=router;