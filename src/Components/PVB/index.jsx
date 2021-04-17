import { useState } from "react";
import Game from "../Game";
import { Choice, checkVictory } from "../Game/utils";
import computerMove from "./computerMove";

const defaultPlayer = {
  token: "",
  opponent: ""
}

export default function PVB() {
  const [result, setResult] = useState(null);
  const [moves, setMoves] = useState(0);
  const [computer, setComputer] = useState({...defaultPlayer});
  const [me, setMe] = useState({...defaultPlayer});
  const [status, setStatus] = useState("choosing");
  const [board, setBoard] = useState([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);
  
  const chooseToken = token => () => {
    setMe({ token, opponent: "computer" });
    let compToken = token === "X" ? "O" : "X"
    setComputer({ token: compToken, opponent: "me" });
    if (compToken === "X") {
      let newBoard = [...board];
      const index = computerMove(newBoard.flat().map((v,i) => v !== " " ? v : i), { huPlayer: token, aiPlayer: compToken })
      const row = Math.floor(index/3);
      const col = index%3;
      // const [row, col] = findBestMove(newBoard, compToken, token);
      newBoard[row][col] = compToken;
      setBoard(newBoard);
      setMoves(moves => moves+1);
    }
    setStatus("playing");
  }

  const isFinished = (newBoard, newMoves) => {
    let victory = checkVictory(newBoard);
    if (!!victory) {
      setStatus("over")
      setResult(result);
      return true;
    }
    if (newMoves === 9){
      setStatus("draw");
      return true;
    }
    return false;
  }

  const updateBoard = (i,j) => () => {
    let newBoard = [...board]
    let newMoves = moves;
    newBoard[i][j] = me.token;
    newMoves++;
    if(!isFinished([...newBoard], newMoves)) {
      // const [row, col] = findBestMove(newBoard, computer.token, me.token);
      const index = computerMove(newBoard.flat().map((v,i) => v !== " " ? v : i), { huPlayer: me.token, aiPlayer: computer.token })
      const row = Math.floor(index/3);
      const col = index%3;
      newBoard[row][col] = computer.token;
      newMoves++;
      isFinished(newBoard, newMoves);
    }
    setMoves(newMoves);
    setBoard(newBoard);
  }

  if (status === "choosing")
    return <Choice chooseToken={chooseToken}/>
  return (
    <Game 
      game={{
        moves,
        players: { me, computer },
        status,
        board,
        result
      }} 
      sessionID="me" 
      updateBoard={updateBoard}/>
  );
}