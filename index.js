import React from "react";
// one

const person = {
  name: "Taylor",
  returnThis: () => this
};

// two

class Cat {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi I'm ${this.name}, miaow`;
  }
}

const getCatName = ({ sayHi }) => sayHi();

const catGreeting = getCatName(new Cat("Francois"));

// three

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  handleUpdateCount(type) {
    return function() {
      this.setState(({ count }) => ({
        count: type === "inc" ? count + 1 : count - 1
      }));
    };
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleUpdateCount("inc")}>+</Button>

        <p data-testid="count">{this.state.count}</p>

        <Button onClick={this.handleUpdateCount("dec")}>-</Button>
      </React.Fragment>
    );
  }
}

export { person, catGreeting, Counter };
