// MongoDB initialization script for Nadeeka Warnakula
db = db.getSiblingDB('nadeeka_warnakula');

// Create collections
db.createCollection('users');
db.createCollection('teachers');
db.createCollection('courses');
db.createCollection('testimonials');
db.createCollection('announcements');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "register_number": 1 }, { unique: true });
db.users.createIndex({ "id_number": 1 }, { unique: true });
db.teachers.createIndex({ "id": 1 }, { unique: true });
db.courses.createIndex({ "id": 1 }, { unique: true });
db.courses.createIndex({ "is_active": 1 });
db.testimonials.createIndex({ "id": 1 }, { unique: true });
db.testimonials.createIndex({ "is_featured": 1 });
db.announcements.createIndex({ "id": 1 }, { unique: true });
db.announcements.createIndex({ "is_active": 1 });
db.announcements.createIndex({ "target_year": 1 });

print('SMARTCHEM database initialized successfully!');