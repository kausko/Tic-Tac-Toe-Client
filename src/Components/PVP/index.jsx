import { Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import socket from "../../Global/socket";
import Game from "../Game";
import { Choice, checkVictory} from "../Game/utils";

export default function PVP() {
  const { gameID } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [game, setGame] = useState(null);
  const [sessionID, setSessionID] = useState("")

  useEffect(() => {
    const sessionID = location.state.sessionID
    if (!sessionID) {
      history.push('/')
    }
    setSessionID(sessionID);
    socket.auth = { sessionID, gameID }
    socket.connect();

    socket.on("game:update", ({ game }) => {
      socket.sessionID = sessionID;
      socket.gameID = gameID;
      if (!game)
        history.push('/')
      setGame(game);
    })

    return () => {
      socket.off("game:update");
      socket.disconnect();
    }
  },[])

  const chooseToken = token => () => {
    let newGame = {...game};
    const opponent = newGame.players[sessionID].opponent;
    newGame.players[sessionID].token = token;
    newGame.players[opponent].token = token === "X" ? "O" : "X";
    newGame.status = "playing";
    setGame(newGame);
    socket.emit("game:update", { game: newGame });
  }

  const updateBoard = (i,j) => () => {
    let newGame = {...game};
    let { board, moves } = {...newGame};
    board[i][j] = moves % 2 ? "O": "X";
    moves++;
    const result = checkVictory(board);
    if (!!result) {
      newGame.result = result;
      newGame.status = "over";
    }
    if (moves === 9)
      newGame.status = "draw";

    newGame.moves = moves;
    newGame.board = board;
    setGame(newGame);
    socket.sessionID = sessionID;
    socket.gameID = gameID;
    socket.emit("game:update", { game: newGame });
  }

  if (!game) return <Spin/>;
  
  if (game.status === "waiting") return <Typography.Title>Waiting for the other player</Typography.Title>

  if (game.status === "choosing") {
    if (game.players[sessionID].type === "challenger")
      return(
        <Typography.Title>Waiting for the other player to choose their token</Typography.Title>
      )
    return(
      <Choice chooseToken={chooseToken}/>
    )
  }

  return <Game game={game} sessionID={sessionID} updateBoard={updateBoard}/>
}