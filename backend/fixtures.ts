import config from "./config";
import User from "./models/User";
import mongoose from "mongoose";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ["users"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await User.create(
    {
      username: "admin@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      role: "admin",
      token: crypto.randomUUID(),
      displayName: "admin",
    },
    {
      username: "user@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      token: crypto.randomUUID(),
      displayName: "user",
    }
  );

  await db.close();
};

void run();
