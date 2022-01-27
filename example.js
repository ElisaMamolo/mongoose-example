// example.js

const mongoose = require("mongoose");

mongoose
  //can be replaced with ip address
  .connect("mongodb://localhost/exampleApp")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

//model is a constructor function that creates objects gets 1st parameter -> name of model and 2nd is schema
//meaning all documents that are cats are going to have a property called name
const Cat = mongoose.model("Cat", { name: String });

/* this is now a function
kitty
  .save()
  .then((newCat) => console.log(`A new cat is created: ${newCat}!`))
  .catch((err) => console.log(`Error while creating a new cat: ${err}`));
  */
function addNewCat(catName) {
  //create an instance of the model
  //for seeing this in the db i need to save it in db
  const kitty = new Cat({ name: catName });

  kitty
    .save()
    .then((newCat) => console.log(`A new cat is created: ${newCat}!`))
    .catch((err) => console.log(`Error while creating a new cat: ${err}`));
}

function showCats() {
  console.log("All the CATS!");
  Cat.find()
    .then((catsFromDB) => {
      // catsFromDB is an array of Cat instances
      catsFromDB.forEach((oneCat) => console.log(` --> cat: ${oneCat.name}`));
    })
    .catch((err) =>
      console.log(`Error occurred during getting cats from DB: ${err}`)
    );
}

function addTenCats() {
  for (let i = 0; i < 10; i++) {
    addNewCat(`Ironhacker ${i}`);
  }
}

addTenCats();

/* We have to wait for our cats to save before displaying them
 Remember, it's async */
setTimeout(showCats, 1500);

/*find with callback
Cat.find({}, (err, cats) => {
  if (err) {
    console.log(`Error occurred during getting cats from DB: ${err}`);
    return;
  }
  console.log("Got all the CATS!");
  // cats is an array of Cat instances
  cats.forEach((cat) => console.log(` --> cat: ${cat.name}`));
});
*/

//find with promise
Cat.find()
  .then((catsFromDB) => {
    // catsFromDB is a placeholder and represents an array of Cat instances
    catsFromDB.forEach((oneCat) => console.log(` --> cat: ${oneCat.name}`));
  })
  .catch((error) =>
    console.log(`Error occurred during getting cats from DB: ${error}`)
  );
