import React, { useState } from 'react'
import styles from "./App.module.css";
import CardDeck from "./components/CardDeck";
// import useSWR, { mutate } from "swr";
import Buttons from "./components/Buttons";

interface Card {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
}

const mockCards: Card[] = [
  {
    id: "1and3011",
    imageURL:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
    title: "Inferno",
    summary:
      "Robert Langdon budzi się we florenckim szpitalu i za sprawą tajemniczego przedmiotu zostaje celem obławy. Ucieka z pomocą doktor Sienny, podążając śladem wskazówek zawartych w poemacie Dantego.",
    rating: 5.3,
  },
  {
    id: "2301abc",
    imageURL:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg",

    title: "Star Wars: Episode VII - The Force Awakens",
    summary: "Lorem ipsum....",
    rating: 8.2,
  },
];

// Gdyby backend istniał to powyżej należałby zamienić na ten fragment
// const putFetcher = async (url: string) => {
//   const response = await fetch(url, { method: "PUT" });
//   if (!response.ok) throw new Error("Failed to update recommendation");
//   return response;
// };


const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [action, setAction] = useState<"yes" | "no" | null>(null);

  const handleActionClick = async (action: "yes" | "no") => {
    if (cards.length === 0) return;

    setAction(action);

    // Ta częśc do wymiany
    setTimeout(() => {
      setCards((prevCards) => prevCards.slice(1));
      setAction(null); // Reset after animation
    }, 0);

    // Gdyby backend istniał to powyżej należałby zamienić na ten fragment
    // const currentCard = cards[0];

    // const url = `/recommendations/${currentCard.id}/${
    //   action === "yes" ? "accept" : "reject"
    // }`;
    // try {
    //   // Optimistic update: remove the current card from UI immediately
    //   await mutate(url, putFetcher(url), {
    //     optimisticData: () => {setCards((prevCards) => prevCards.slice(1)),
    //     rollbackOnError: true,
    //   });
    // } catch (error) {
    //   console.error("Error updating recommendation:", error);
    // } finally {
    //   setTimeout(() => {
    //     setAction(null); // Reset after animation
    //   }, 300);
    // }
  };

  return (
    <div className={styles.App}>
      <h1>Movie Tinder</h1>
      {cards.length ? <p>To go: {cards.length}</p> : <p>That's all folks!</p>}
      <CardDeck cards={cards} action={action} />
      {cards.length ? <Buttons onActionClick={handleActionClick} /> : null}
    </div>
  );
}
export default App