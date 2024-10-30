import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import CardDeck, { Card } from "./components/CardDeck";
import Buttons from "./components/Buttons";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("renders the header text", () => {
    render(<App />);
    expect(screen.getByText(/Movie Tinder/i)).toBeInTheDocument();
  });

  test("displays initial card count", () => {
    render(<App />);
    expect(screen.getByText(/To go: 2/i)).toBeInTheDocument();
  });
});

describe("CardDeck Component", () => {
  const mockCards = [
    {
      id: "1",
      imageURL: "https://example.com/image.jpg",
      title: "Mock Movie",
      summary: "This is a mock summary.",
      rating: 7.5,
    },
  ];

  test("renders Card component with card details", () => {
    render(<CardDeck cards={mockCards} action={null} />);
    expect(screen.getByText(/Mock Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a mock summary./i)).toBeInTheDocument();
  });
});

describe("Buttons Component", () => {
  test("renders accept and reject buttons", () => {
    render(<Buttons onActionClick={() => {}} />);
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reject/i })).toBeInTheDocument();
  });
    
});

describe("Card Component", () => {
  const mockCard = {
    id: "1",
    imageURL: "https://example.com/image.jpg",
    title: "Mock Movie",
    summary: "This is a mock summary.",
    rating: 7.5,
  };

  test("renders card title, summary, and rating", () => {
    render(<Card card={mockCard} action={null} />);
    expect(screen.getByText(/Mock Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a mock summary./i)).toBeInTheDocument();
    expect(screen.getByText("7.5")).toBeInTheDocument();
  });

  test("renders card image with correct src and alt", () => {
    render(<Card card={mockCard} action={null} />);
    const image = screen.getByAltText(/Grapefruit slice atop a pile of other slices/i);
    expect(image).toHaveAttribute("src", mockCard.imageURL);
  });
});
