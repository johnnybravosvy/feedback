const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

exports.Admin = Admin;

// async function AdminAccount() {
//   try {
//     const adminCount = await Admin.countDocuments();
//     if (adminCount === 0) {
//       const hashPassword = await bcrypt.hash("feedbackadmin", 10);
//       const newAdmin = new Admin({
//         username: "admin",
//         password: hashPassword,
//       });
//       await newAdmin.save();
//       console.log("account created");
//     } else {
//       console.log("account already exists");
//     }
//   } catch (err) {
//     console.log("unable to create admin");
//   }
// }
// AdminAccount();

// const Course = mongoose.model('Course', courseSchema);

// async function createCourse(){
//     const course = new Course({
//         name: 'Node.js Course',
//         author: 'Mosh',
//         tags: ['node', 'backend'],
//         isPublished: true
//     })

//     const result = await course.save();
// }

// createCourse();
