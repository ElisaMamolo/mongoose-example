const mongoose = require("mongoose");

mongoose
  //can be replaced with ip address
  .connect("mongodb://localhost/userDB")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    job: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const data = { name: "Alice", password: "ironhack2018", job: "Architect" };

///////////////////////CREATE

/* Mongoose allows us to use a callback pattern
// to handle the completion of the asynchronous operation
User.create(data, (error, user) => {
  if (error) {
    console.log("An error happened:", error);
    return;
  }
  console.log("The user is saved and its value is: ", user);
});
*/

//Create with promise
User.create(data)
  .then((user) => console.log("The user is saved and its value is: ", user))
  .catch((error) =>
    console.log("An error happened while saving a new user:", error)
  );

///////////////////////READ - FIND

//read To retrieve multiple documents from a database, we can use Model.find().
//expect to get an array of objects back.

// Please keep in mind that the point here is to understand what is the order
// and possible structure of the arguments of .find() Mongoose method

// Find all users
User.find({})
  .then((users) => {
    // handle users
  })
  .catch((error) => {
    // handle error
  });

// Find all users where (the name is 'Alice' and the age is >= 18)
User.find({ name: "Alice", age: { $gte: 18 } })
  .then((user) => {
    // handle users
  })
  .catch((error) => {
    // handle error
  });

// Find all users where the name is 'Alice' and only selecting the "name" and "age" fields
User.find({ name: "Alice" }, "name age")
  .then((user) => {
    // handle user
  })
  .catch((error) => {
    // handle error
  });

// Find all users and sort them by name descending
User.find({}, null, { sort: { name: -1 } })
  .then((users) => {
    // handle users
  })
  .catch((error) => {
    // handle error
  });

// Find all users where the name contains 'alice' (insensitive case)
User.find({ name: /alice/i })
  .then((users) => {
    // handle users
  })
  .catch((error) => {
    // handle error
  });

//find with callbacks
// Find all users using callbacks instead of promises
User.find({}, (error, users) => {
  if (error) {
    // ... handle error
  } else {
    // ... handle users
  }
});

//find only a single document
User.findOne({ name: "Alice" }).then(successCallback).catch(errorCallback);

User.findById("someMongoIdGoesHere129")
  .then(successCallback)
  .catch(errorCallback);

///////////////////////UPDATE

// For all users that as "@ironhack\.com" in its email, change the company to "Ironhack"
User.updateMany({ email: /@ironhack\.com/ }, { company: "Ironhack" })
  .then(successCallback)
  .catch(errorCallback);

// For the first "Alice" found, change the company to "Ironhack"
User.updateOne({ name: "Alice" }, { company: "Ironhack" })
  .then(successCallback)
  .catch(errorCallback);

// For the user with _id "5a3a7ecbc6ca8b9ce68bd41b", increment the salary by 4200
User.findByIdAndUpdate("5a3a7ecbc6ca8b9ce68bd41b", { $inc: { salary: 4200 } })
  .then(successCallback)
  .catch(errorCallback);

///////////////////////DELETE

// Delete all the users that have "@ironhack.com" in their email
User.deleteMany({ email: /@ironhack\.com/ })
  .then(successCallback)
  .catch(errorCallback);

// Delete the first "Alice" found
User.deleteOne({ name: "Alice" }).then(successCallback).catch(errorCallback);

// Delete the user with _id "5a3a7ecbc6ca8b9ce68bd41b"
User.findByIdAndRemove("5a3a7ecbc6ca8b9ce68bd41b")
  .then(successCallback)
  .catch(errorCallback);
