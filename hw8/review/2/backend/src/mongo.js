require("dotenv-defaults").config();
const mongoose = require("mongoose");
function connectMongo() {
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log("Failed to connect mongodb ");
    console.error(error);
  });

  db.once("open", () => {
    console.log("MongoDB connected!");
  });
}

const mongo = {
  connect: connectMongo,
};
export default mongo