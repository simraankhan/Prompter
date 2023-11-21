import mongoose from "mongoose";

let isConnected = false;

export const conntectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.REACT_APP_MONGODB_URI) return;

  try {
    await mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
      dbName: "share-prompt",
    });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
