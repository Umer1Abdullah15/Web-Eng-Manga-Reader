const bcrypt = require('bcryptjs');

const hashPassword = async () => {
  const plainPassword = "password123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();
