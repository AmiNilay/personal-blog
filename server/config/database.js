const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Ensure environment variables are loaded
dotenv.config();

// Define some colors for our console logs for a better DX (Developer Experience)
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  }
};

const connectDB = async () => {
  try {
    // With Mongoose v6+, options like useNewUrlParser are no longer needed.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a cool, colorful success message
    console.log(
      `${colors.fg.cyan}${colors.bright}MongoDB Connected: ${conn.connection.host}${colors.reset}`
    );
  } catch (error) {
    // Log a clear, colorful error message
    console.error(
      `${colors.fg.red}${colors.bright}Error: ${error.message}${colors.reset}`
    );
    
    // Exit the process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;