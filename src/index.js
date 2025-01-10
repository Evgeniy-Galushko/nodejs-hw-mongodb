import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const connectionToDatabase = async () => {
  await initMongoConnection();
  setupServer();
};

connectionToDatabase();
