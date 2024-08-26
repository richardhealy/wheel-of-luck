// backend/src/index.ts
import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify();

server.register(cors, {
  origin: 'http://localhost:5173', // Frontend Vite dev server address
});

const options = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6', 'Prize 7', 'Prize 8', 'Prize 9', 'Prize 10'];

server.post('/spin', async (request, reply) => {
  // Randomly select a winning prize
  const winningIndex = Math.floor(Math.random() * options.length);
  const winningPrize = options[winningIndex];

  return { 
    result: winningPrize
  };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();