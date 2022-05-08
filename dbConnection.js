const mongoose = require('mongoose');
 // Connection URI
 const uri =
 "mongodb://localhost:27017/todos-app";

 mongoose.connect(uri);

async function run() {
try {
  await mongoose.connect(uri);

  console.log("Connected successfully to database");
} catch (err) {
  console.log(err);
  process.exit(1);
}
}
run()
