# MongoDB Installation Guide for Nadeeka Warnakula

## Windows Installation

### Option 1: Install MongoDB Community Server

1. Download MongoDB Community Server:
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select:
     - Version: Latest Stable Release
     - Platform: Windows x64
     - Package: msi

2. Run the installer:
   - Double-click the downloaded .msi file
   - Follow the installation wizard with default settings
   - Choose "Complete" setup type

3. Configure MongoDB as a Windows Service:
   - During installation, select "Install MongoDB as a Service"
   - Use default settings for data directory (C:\Program Files\MongoDB\Server\[version]\data)

4. Start MongoDB:
   - The service should start automatically
   - You can verify by opening Command Prompt and running:
     ```
     net start MongoDB
     ```

### Option 2: Install MongoDB Compass (GUI Tool)

1. Download MongoDB Compass:
   - Visit [MongoDB Compass Download](https://www.mongodb.com/try/download/compass)
   - Download the Windows version

2. Install Compass:
   - Run the installer and follow the wizard

### Verify Installation

1. Open Command Prompt or PowerShell
2. Run:
   ```
   mongo --version
   ```
   or
   ```
   mongod --version
   ```

3. Start MongoDB service if not running:
   ```
   net start MongoDB
   ```

## Running the Application

After MongoDB is installed and running:

1. Start the backend server:
   ```
   cd backend
   python server.py
   ```

2. In a separate terminal, start the frontend:
   ```
   cd frontend
   npm start
   ```

## Troubleshooting

### If MongoDB service won't start:
1. Check if the data directory exists:
   ```
   mkdir "C:\Program Files\MongoDB\Server\[version]\data\db"
   ```

2. Start MongoDB manually:
   ```
   "C:\Program Files\MongoDB\Server\[version]\bin\mongod.exe" --dbpath="C:\Program Files\MongoDB\Server\[version]\data\db"
   ```

### If you get connection errors:
1. Ensure MongoDB service is running:
   ```
   net start MongoDB
   ```

2. Check if MongoDB is listening on port 27017:
   ```
   netstat -an | findstr 27017
   ```

### Alternative: Use MongoDB Atlas (Cloud)
If you prefer not to install MongoDB locally:

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Update the backend [.env](file:///c%3A/Users/samsung/OneDrive/Desktop/Chem%20Site/chem_website-new/backend/.env) file:
   ```
   MONGO_URL=mongodb+srv://[username]:[password]@[cluster-url]/nadeeka_warnakula?retryWrites=true&w=majority
   ```