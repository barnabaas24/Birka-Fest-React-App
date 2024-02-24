import { useState } from "react";
import {
  ContestantData,
  useContestantsContext,
} from "../context/ContestantsContext";

function findWinner(contestants: ContestantData[], winnerBarcode: string) {
  return contestants.find((contestant) => {
    return contestant.barcode === winnerBarcode;
  });
}

export function Scan() {
  const { contestants } = useContestantsContext();
  const [winnerInput, setWinnerInput] = useState("");
  const [winner, setWinner] = useState<ContestantData>();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWinner(findWinner(contestants, winnerInput));
        }}
      >
        <input
          placeholder="Search for user"
          type="text"
          value={winnerInput}
          onChange={(e) => setWinnerInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {winner && winner.name}
    </>
  );
}
