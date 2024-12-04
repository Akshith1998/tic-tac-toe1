import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xPlayerTurn, setXPlayerTurn] = useState(true);
  const [winner, setWinner] = useState();

  const handleBoxClick = (e) => {
    let index = e.target.id;
    if (boxes[index] || winner) return;
    let copyBoxes = [...boxes];
    copyBoxes[index] = xPlayerTurn ? "X" : "O";
    setXPlayerTurn(!xPlayerTurn);
    setBoxes(copyBoxes);
  };

  useEffect(() => {
    let winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let pattern of winningPattern) {
      let [a, b, c] = pattern;
      if (boxes[a] === boxes[b] && boxes[b] === boxes[c]) setWinner(boxes[a]);
    }
  }, [boxes]);

  return (
    <div className="App">
      <div className="boxWrapper" onClick={handleBoxClick}>
        {boxes.map((box, index) => {
          return (
            <div className="box" key={index} id={index}>
              {box}
            </div>
          );
        })}
      </div>
      {winner && <div>Winner is {winner}</div>}
    </div>
  );
}
