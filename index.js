function returnThis() {
  return this;
}

returnThis(); // returns the window object

window.returnThis(); // also returns the window object

const person = {
  name: "Zooey",
  returnThis
};

person.returnThis(); // returns { name: "Zooey", returnThis: f }

const returnThisTwo = person.returnThis; // we want { name: "Zooey", returnThis: f }

returnThisTwo(); // we get the window object

const person2 = {
  name: "Charli"
};

// we assign the method in this way as during the creation of
// the object `person2` is not defined
person2.returnThis = returnThis.bind(person2);

const returnThisThree = person2.returnThis;

returnThisThree(); // gives us { name: "Charli", returnThis: f } 🎉
