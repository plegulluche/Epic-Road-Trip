const mongoose = require('mongoose');
const dotenv = require('dotenv');

// HANDLE UNCAUGHTEXCEPTION ERROR AND SHUTTING DOWN APP GRACEFULLY
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 🤯! Shutting down ....');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// DB

// mongoose.connect(
//     process.env.ATLAS_URI + process.env.DB_NAME,
//     {useNewUrlParser: true, useUnifiedTopology: true,}
// ).then(() => console.log('connected to mongodb'))
// .catch((err) => console.log('Failed to connect mongodb', err));

// START SERVER
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server running on port ${port} ...`);
});

// HANDLE UNHANDLEDREJECTION ERROR AND SHUTTING DOWN APP GRACEFULLY
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 🤯! Shutting down ...');
  // CLOSING SERVER
  server.close(() => {
    // CLOSING APP AFTER ALL PENDING REQUESTS ARE PROCESSED
    process.exit(1);
  });
});
