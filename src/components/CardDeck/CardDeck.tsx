import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./CardDeck.module.css";
import { Star } from "react-feather";

interface CardType {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
}

interface CardDeckProps {
  cards: CardType[];
  action: "yes" | "no" | null;
}

interface CardProps {
  card: CardType;
  action: "yes" | "no" | null;
  handleActionClick: (action: "yes" | "no") => void; 
}

const animationVariants = {
  enter: { opacity: 0, x: 0, rotate: 0 },
  animate: { opacity: 1 },
  exit: (action: string) => ({
    opacity: 0,
    x: action === "yes" ? 500 : -500, 
    rotate: action === "yes" ? 45 : -45, 
  }),
};


export const Card: React.FC<CardProps> = ({ card, action, handleActionClick }) => {
  return (
    <motion.div
      key={card.id}
      className={styles.card}
      initial="enter"
      animate="animate"
      exit={action ? "exit" : undefined}
      custom={action}
      variants={animationVariants}
      transition={{ duration: 0.3 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        const offsetX = info.offset.x;

        
        if (offsetX < -100) {
          handleActionClick("no"); 
        } 
        // dobra w poleceniu było żeby tylko odrzucać można było swipem, ale gdyby jednak okazało się że akceptować też można to uncomment
        // else if (offsetX > 100) {
        //   handleActionClick("yes"); 
        // }
      }}
    >
      <img
        className={styles.pic}
        src={card.imageURL}
        alt="Grapefruit slice atop a pile of other slices"
      />
      <h3 className={styles.cardHeading}>{card.title}</h3>
      <div className={styles.rating}>
        <Star style={{ color: "gold", marginBottom: "4px" }} />
        <p>{card.rating}</p>
      </div>
      <p className={styles.cardSummary}>{card.summary}</p>
    </motion.div>
  );
};


const CardDeck: React.FC<CardDeckProps & { handleActionClick: (action: "yes" | "no") => void }> = ({ cards, action, handleActionClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        <AnimatePresence>
          {cards.slice(0, 1).map((card) => (
            <Card key={card.id} card={card} action={action} handleActionClick={handleActionClick} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};



export default CardDeck;
