require("dotenv").config();
const express=require("express");
const userRouter=require("./routes/userRoutes");
const bookRouter=require("./routes/bookRoutes");
const authorRouter=require("./routes/authorRoutes");
const connectDb=require("./utils/configDb");

const port=process.env.PORT_NUM;

const app=express();

//data understanding middlewares
app.use(express.json());//will understand the data and pass to req.body
app.use(express.urlencoded({extended:true}));// will understand the urlencoded val

//routes
app.use("/lib",userRouter);
app.use("/book",bookRouter);
app.use("/author",authorRouter);

//db connection
connectDb();

//listen to port
app.listen(port, () => {
    console.log("Port Connected Successfully...");
});