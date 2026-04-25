import app from "./src/app.js";
import connectDB from "./src/config/db.js";

console.log("🚀 BOOTING SERVER...");

// fallback (lokal vs railway)
const PORT = process.env.PORT || 3000;

// safety check (biar gak silent undefined)
if (!process.env.PORT) {
  console.warn("⚠️ WARNING: process.env.PORT is undefined, using fallback 3000");
}

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB READY");

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Bound to 0.0.0.0:${PORT}`);
    });

    server.on("error", (err) => {
      console.error("❌ SERVER ERROR:", err);
    });

    process.on("uncaughtException", (err) => {
      console.error("💥 UNCAUGHT EXCEPTION:", err);
    });

    process.on("unhandledRejection", (err) => {
      console.error("💥 UNHANDLED REJECTION:", err);
    });
  } catch (err) {
    console.error("❌ FAILED TO START SERVER:", err);
    process.exit(1);
  }
};

startServer();