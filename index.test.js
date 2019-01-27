import React from "react";
import { render, fireEvent } from "react-testing-library";
import { person, catGreeting, Counter } from "./";

jest.useFakeTimers();

test("person.returnThis should return the person object", () => {
  expect(person.returnThis()).toBe(person);
});

test("catGreeting should not be broken", () => {
  expect(catGreeting).toBe("Hi I'm Francois, miaow");
});

test("Counter should behave as a counter", () => {
  const { getByText, getByTestId } = render(<Counter />);

  fireEvent.click(getByText("+"));
  fireEvent.click(getByText("+"));

  expect(getByTestId("count").textContent).toBe("2");

  fireEvent.click(getByText("-"));
  Simulate.click(getByText("-"));

  expect(getByTestId("count").textContent).toBe("0");
});
