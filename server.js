const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

// ✅ Load environment variables
dotenv.config();

// ✅ Debug: Confirm env loaded
console.log("✅ .env exists?", fs.existsSync('.env'));
console.log("✅ MONGO_URI loaded from env:", process.env.MONGO_URI);

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // ✅ Add this line
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ Add this line

// ⛓️ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});