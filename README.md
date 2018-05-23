# What the hell is `this`

`this` in Javascript is a pretty common stumbling block for a lot of developers. This is for a few reasons, but one of them is that its value can change based on where the function containing `this` is invoked.

It's much easier to write about `this` than talk about `this` as it's easy to distinguish between the word this and the javascript `this` thanks to code blocks! So that's good.

## What is `this`?

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

`this` causes us an issue in react as well, say I have an input component, and a form component, the form maintains the state of the inputs, and I have to pass the value for the input and the `onChange` function down to the input.

```jsx
const Input = ({ labelText, id, onChange, value, ...rest }) => (
  <label htmlFor={id}>
    {labelText}
    <input id={id} value={value} onChange={onChange} name={name} {...rest} />
  </label>
);

class Form extends React.Component {
  constructor() {
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  handleInput({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <Input
          labelText="First Name"
          id="fName"
          value={this.state.firstName}
          onChange={this.handleInput}
          name={"firstName"}
        />
        <Input
          labelText="Last Name"
          id="lName"
          value={this.state.lastName}
          onChange={this.handleInput}
          name={"lastName"}
        />
        <button>Submit</button>
      </form>
    );
  }
}
```

Here we will have an issue, as in our `Input` component we won't be calling `handleInput` as `this.handleInput`, it will be called as `onChange`, meaning the context of what `this` should be will be lost, so we have to explicitly set what `this` is, as otherwise we will not have access to `setState`.

We can do this with bind:

```js
class Form extends React.Component {
  constructor() {
    this.state = {
      firstName: "",
      lastName: ""
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    return <someStuff />;
  }
}
```

We've now explicitly bound `this` to be the `Form` class, so `this.setState` will work properly, even when used by the `Input` component.

This is also a good way to introduce the way that arrow functions bind `this`. In an arrow function `this` will always be whatever `this` was in the lexical context of the function's delaration. That is to say, if an arrow function is defined in the global scope, then `this` will always be the global object, no matter what it is executed on.

```js
const yetAnotherPerson = {
  name: "Taylor",
  returnThis: () => this,
  returnThisProperly: function() {
    return this;
  }
};

yetAnotherPerson.returnThis(); // returns the window object

yetAnotherPerson.returnThisProperly(); // returns the yetAnotherPerson object
```

Because at the time of writing the object literal the value of `this` is the global object, any arrow functions that refer to `this` declared inside will always refer to the global object, whereas the function declaration has the `this` of whatever it is called on.

We can use this to our advantage, as the lexical `this` inside of a class is the this of the class, meaning we can bypass explicitly binding `this`, with the babel `transform-class-properties` plugin this makes things especially nice for react.

```js
class Form extends React.Component {
  state = {
    firstName: "",
    lastName: ""
  };

  handleInput = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  render() {
    return <someStuff />;
  }
}
```

And everything will behave as intended!

## Exercises

Open index.js and edit the code to make the tests pass, the author has had some awful confusion around `this`.

To run the tests use `npm test`. This will run jest in watch mode so the tests will re-run whenever you save the file.
