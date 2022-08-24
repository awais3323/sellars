const app = require("./app");
const cloudinary = require("cloudinary");
const dontenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaught Exception", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shuting down the server becuase of UnCaught Expression`);
  process.exit(1);
});

// const port = process.env.PORT
// is liye humne dot net istmaal kia hia aur port ka path dia tha usko
dontenv.config({ path: "backend/config/.env" });

port = process.env.PORT || 3000;

connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// is main hum ne path (PORT) dia hai but path hum nee config.env main diya hai
const server = app.listen(port, () => {
  console.log(`server is now working on on : ${port}`);
});

//Unhandled promise rejection for ex: (if the server is crash becuase of the string that is added to connect databse)
process.on("unhandledRejection", (err) => {
  console.log("Error", err.message);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});
