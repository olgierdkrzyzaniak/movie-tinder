import { render, screen, fireEvent } from "@testing-library/react";
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

  test("displays 'That's all folks!' when no cards left", () => {
    render(<App />);
    
    // Simulate rejecting all cards
    const rejectButton = screen.getByRole("button", { name: /reject/i });
    fireEvent.click(rejectButton); // Reject first card
    fireEvent.click(rejectButton); // Reject second card

    expect(screen.getByText(/That's all folks!/i)).toBeInTheDocument();
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
    render(<CardDeck cards={mockCards} action={null} handleActionClick={() => {}} />);
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
    render(<Card card={mockCard} action={null} handleActionClick={() => {}} />);
    expect(screen.getByText(/Mock Movie/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a mock summary./i)).toBeInTheDocument();
    expect(screen.getByText("7.5")).toBeInTheDocument();
  });

  test("renders card image with correct src and alt", () => {
    render(<Card card={mockCard} action={null} handleActionClick={() => {}} />);
    const image = screen.getByAltText(/Grapefruit slice atop a pile of other slices/i);
    expect(image).toHaveAttribute("src", mockCard.imageURL);
  });

  test("calls handleActionClick on drag end", () => {
    const handleActionClick = jest.fn();
    render(<Card card={mockCard} action={null} handleActionClick={handleActionClick} />);

    const cardElement = screen.getByText(/Mock Movie/i);
    fireEvent.dragEnd(cardElement, { offset: { x: -150 } }); // Simulate swipe left

    expect(handleActionClick).toHaveBeenCalledWith("no");
  });
});
