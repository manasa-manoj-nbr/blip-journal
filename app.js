require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const passportConfig = require("./config/passport")
const errorHandler = require("./middlewares/errorHandler");
const commentRoutes = require("./routes/commentRoutes");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//session middlweare
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongoUrl: process.env.MONGO_URL })
}))
// method override middleware
app.use(methodOverride('_method'))
//passport configuration
passportConfig(passport); 
app.use(passport.initialize());
app.use(passport.session())

//routes
app.get("/", (req,res)=>{
    res.render("home", {
        title: "Home",
        user: req.user,
        error: ""
    });
})
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/",commentRoutes)
//EJS
app.set("view engine", "ejs");
//eroor handler
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connection successful");
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} , http://localhost:${PORT}`
      );
    });
  }).catch(() => {
    console.log("DB connection failed");
  });
