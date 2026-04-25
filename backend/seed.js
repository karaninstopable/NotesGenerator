const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Note = require('./models/Note');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let admin = await User.findOne({ email: 'admin@example.com' });
    if (admin) {
      console.log('⚠️  Admin already exists — login with admin@example.com / admin123');
    } else {
      admin = await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin created successfully!');
      console.log('📧 Email:    admin@example.com');
      console.log('🔑 Password: admin123');
      console.log('⚠️  Change the password after first login!');
    }

    // Create sample notes for admin if none exist
    const existingNotes = await Note.countDocuments({ user: admin._id });
    if (existingNotes === 0) {
      await Note.insertMany([
        {
          title: 'Welcome to NoteVault!',
          content: 'This is your first note. You can create, edit, pin, and delete notes. Use the + New Note button to get started.',
          tags: ['welcome', 'getting-started'],
          color: '#dbeafe',
          isPinned: true,
          user: admin._id,
        },
        {
          title: 'Admin Tips',
          content: 'As an admin, you can view all users in the Admin Panel, manage their roles, activate/deactivate accounts, and view their notes.',
          tags: ['admin', 'tips'],
          color: '#dcfce7',
          isPinned: false,
          user: admin._id,
        },
      ]);
      console.log('✅ Sample notes created for admin');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
