const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    console.error('.env file not found');
    process.exit(1);
}

const envConfig = dotenv.parse(fs.readFileSync(envPath));
const prismaDir = path.join(__dirname, '..', 'prisma');

// Base template for new schema files
const template = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

// Find all DATABASE_URL_* keys
const dbKeys = Object.keys(envConfig).filter(key => key.startsWith('DATABASE_URL_'));

dbKeys.forEach(key => {
    const dbName = key.replace('DATABASE_URL_', '').toLowerCase();
    const schemaPath = path.join(prismaDir, `${dbName}.prisma`);

    if (!fs.existsSync(schemaPath)) {
        console.log(`Creating schema file: ${schemaPath}`);
        fs.writeFileSync(schemaPath, template);
    } else {
        console.log(`Schema file already exists: ${schemaPath}`);
    }
});

console.log('All schema files initialized.');
