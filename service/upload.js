// const multer = require("multer");

// // File kaha save hogi uski setting
// const storage = multer.diskStorage({

//   // uploads folder me image save karo
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   // file ka naam kya hoga
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }

// });

// // multer middleware export kar rahe hai
// module.exports = multer({ storage });