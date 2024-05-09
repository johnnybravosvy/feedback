const bcrypt = require("bcrypt");
const { Admin } = require("../models/Admin");

const CreateAdmin = async () => {
    const password = "feedbackadmin";
    const username = "admin";

    const checkAdmin = await Admin.findOne({
        username,
    });

    if (checkAdmin) {
        console.log("Admin already exist");
    } else {
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        await Admin.create({ password: hashPassword, username: username });
    }
};

module.exports = CreateAdmin;
