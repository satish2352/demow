const UserRole = require('./model/userRoles');
const mongoose = require('mongoose');


async function initializeUserRoles() {
    try {
        const count = await UserRole.countDocuments();

        if (count === 0) {
            // Insert initial data if collection is empty
            await UserRole.create([
                {
                    roleId: 1,
                    roleTitle: 'Superadmin',
                    description: 'Administrator with full privileges',
                },
                {
                    roleId: 2,
                    roleTitle: 'Admin',
                    description: 'Admin with respective privileges',
                },
                {
                    roleId: 3,
                    roleTitle: 'NGO',
                    description: 'Admin with respective privileges',
                },
                {
                    roleId: 4,
                    roleTitle: 'Doctor',
                    description: 'Admin with respective privileges',
                },
                {
                    roleId: 5,
                    roleTitle: 'Sevika',
                    description: 'Admin with respective privileges',
                },
                {
                    roleId: 6,
                    roleTitle: 'Screener',
                    description: 'Admin with respective privileges',
                },
                // Add more initial roles as needed
            ]);
            console.log('UserRoles collection initialized with initial data.');
        }
    } catch (err) {
        console.error('Error initializing UserRoles collection:', err);
        throw err;
    }
}

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = { connectMongoDb, initializeUserRoles }