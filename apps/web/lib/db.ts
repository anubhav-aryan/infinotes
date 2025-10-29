import { connectDatabase } from '@infilects/database';

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) return;
  await connectDatabase();
  isConnected = true;
}
