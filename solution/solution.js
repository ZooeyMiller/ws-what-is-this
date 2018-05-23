const person = {
  name: "Zooey",
  returnThis: function() {
    return this;
  }
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  sayHi = () => {
    return `Hi I'm ${this.name}, miaow`;
  };
}

const getCatName = ({ sayHi }) => sayHi();

const catGreeting = getCatName(new Cat("Francois"));

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
    return () => {
      this.setState(({ count: prevCount }) => ({
        count: type === "inc" ? prevCount + 1 : prevCount - 1
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
