const { writeFile } = require('fs');
const { yargs } = require('yargs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const environmentContent = `
  export const environment = {
    production: ${isProduction},
    firebase: {
      projectId: '${process.env['FIREBASE_PROJECT_ID']}',
      appId: '${process.env['FIREBASE_APP_ID']}',
      storageBucket: '${process.env['FIREBASE_STORAGE_BUCKET']}',
      locationId: '${process.env['FIREBASE_LOCATION_ID']}',
      apiKey: '${process.env['FIREBASE_API_KEY']}',
      authDomain: '${process.env['FIREBASE_AUTH_DOMAIN']}',
      messagingSenderId: '${process.env['FIREBASE_MESSAGING_SENDER_ID']}',
      measurementId: '${process.env['FIREBASE_MEASUREMENT_ID']}',
    },
  }
`;

writeFile(targetPath, environmentContent, function (err: any) {
  if (err) {
    console.error(err);
  }

  console.log(`Set environment variables to ${targetPath}`);
});
