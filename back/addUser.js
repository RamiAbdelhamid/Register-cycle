const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");
const User = require("./models/User"); // تأكد من المسار الصحيح لملف المودل

async function addUserManually() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const newUser = await User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
      is_deleted: false,
    });

    console.log("User added successfully:", newUser.toJSON());
  } catch (err) {
    console.error("Error adding user:", err);
  }
}

addUserManually();
