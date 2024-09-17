import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('Por favor, defina a variável DATABASE_URL no arquivo .env.local');
}

let cachedClient = null;
let cachedDb = null;

const connectMongo = async () => {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    cachedClient = await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    cachedDb = cachedClient.connection.db;
    console.log('Conectado ao MongoDB');
    return { client: cachedClient, db: cachedDb };
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
};

export default connectMongo;
