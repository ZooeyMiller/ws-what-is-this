# What the hell is `this`

`this` in Javascript is a pretty common stumbling block for a lot of developers. This is for a few reasons, but one of them is that its value can change based on where the function containing `this` is invoked.

It's much easier to write about `this` than talk about `this` as it's easy to distinguish between the word this and the javascript `this` thanks to code blocks! So that's good.

# What is `this` usually?

If used in the global scope `this` will be the global object, in the browser this is the `window` object. I will be talking about things as if they are in the browser but it is the same in node, with the global or module object.

The window object is the default local scope, so it is what `this` defaults to if there is not a more specific object for `this` to be bound to.

In strict mode there is no default local scope so `this` is `undefined`

This is easier to understand a little when we consider that any global variable or function is set on the global object. so if I have some code:

```js
function returnThis() {
  return this;
}

returnThis(); // returns the window object

window.returnThis(); // also returns the window object
```

To call any function or use any variable is essentially shorthand for doing `window.myFunction/Variable`, so we can understand that in this scenario `this` is effectively whatever object the function is being called on, in this case window.

so if we take this example:

```js
const person = {
  name: "Zooey",
  returnThis
};

person.returnThis(); // returns { name: "Zooey", returnThis: Function }
```

The returnThis function returns something different, because `this` is the object that the function was called on. This is how `this` is bound for [function declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) which are one of the multiple ways to define functions in javascript.

Say, for example we pulled the method off of the object and assigned it to a variable, the `this` would become the window object, when we wanted it to be the object that we pulled it off.

```js
const returnThisTwo = person.returnThis; // we want { name: "Zooey", returnThis: f }

returnThisTwo(); // we get the window object
```

We can get around this problem by explicity telling the function what `this` should be using `.bind`

```js
const person2 = {
  name: "Charli"
};
// we assign the method in this way as during the creation of
// the object `person2` is not defined
person2.returnThis = returnThis.bind(person2);

const returnThisThree = person2.returnThis;

returnThisThree(); // gives us { name: "Charli", returnThis: f } 🎉
```

Explicit binding of `this` is also helpful for destructuring, as `person.returnThis` will have a `this` of `person` but `returnThis` destructured from `person` will have a `this` of `window`.

One can explicitly bind `this` and call a function at the same time using `.call` or `.apply` but I have never seen either of these in actual code, just in examples so I'm not going to explain them, I encourage doing some independant reading if you want to know about them though!
