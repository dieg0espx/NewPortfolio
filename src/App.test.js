import { render, screen } from "@testing-library/react";
import App from "./App";

test("presents Diego Espinosa and both systems", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1, name: /diego espinosa/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /agent dashboard/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /ai takeoff/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /espinosa9de@gmail.com/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /espinosa9mx@gmail.com/i })).toBeInTheDocument();
});
