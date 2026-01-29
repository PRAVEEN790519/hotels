const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL = 'mongodb://127.0.0.1:27017/testdb';
const mongoURL =process.env.MONGODB_URL; 
// MongoDB connect
mongoose.connect(mongoURL)
  .then(() => {
    console.log('✅ MongoDB successfully CONNECTED');
  })
  .catch((error) => {
    console.log('❌ MongoDB connection FAILED');
    console.error(error);
  });

// Optional: connection events (learning purpose)
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('⚠️ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected');
});

module.exports = mongoose;
