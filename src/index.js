import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const connectionToDatabase = async () => {
  await initMongoConnection();
  setupServer();
};

connectionToDatabase();
