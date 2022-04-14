const mongoose = require("mongoose");
const { NODE_ENV, MONGO_URL_TEST, MONGO_URL_PROD, MONGO_URL_DEV } = process.env;
main().catch((err) => console.log(err));

async function main() {
  let mongoUrl;

  console.table({
    NODE_ENV,
    MONGO_URL_TEST,
    MONGO_URL_PROD,
    MONGO_URL_DEV,
  });
  switch (NODE_ENV) {
    case "test":
      mongoUrl = MONGO_URL_TEST;
      break;
    case "production":
      mongoUrl = MONGO_URL_PROD;
      break;
    case "development":
      mongoUrl = MONGO_URL_DEV;
      break;
    default:
      mongoUrl = MONGO_URL_DEV;
  }
  await mongoose.connect(mongoUrl);
  console.log("CONNECTED TO MONGODB, Env =>", NODE_ENV);
}
