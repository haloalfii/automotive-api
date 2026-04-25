import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT;

console.log("BOOTING SERVER...");

connectDB()
  .then(() => {
    console.log("DB READY");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });

    server.on("error", (err) => {
      console.error("SERVER ERROR:", err);
    });
  })
  .catch((err) => {
    console.error("DB FAILED:", err);
    process.exit(1);
  });
