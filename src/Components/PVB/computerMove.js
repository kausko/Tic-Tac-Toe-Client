import Helper from "./Helper";

const MAX_VALUE = 99999999;

export default function computerMove(board, symbols) {

  const { huPlayer, aiPlayer } = symbols;

  function evaluate() {
    if (Helper.playerWon(board, huPlayer)) {
      return -10;
    }
    else if (Helper.playerWon(board, aiPlayer)) {
      return +10;
    }
    else {
      return 0;
    }
  }

  function minimax(depth, isMaximizingPlayer) {
    const score = evaluate();

    if (Math.abs(score) === 10) {
      return score;
    }

    if (!Helper.isMovesLeft(board, symbols)) {
      return 0;
    }

    let bestVal = MAX_VALUE;
    let leftMoves = Helper.getEmptyIndexes(board, symbols);

    if (isMaximizingPlayer) {
      bestVal *= (-1);

      leftMoves.forEach(function (move) {
        board[move] = aiPlayer;
        const value = minimax(depth + 1, false)
        bestVal = Math.max(bestVal, value)
        board[move] = move;
      });
      return bestVal
    }
    else {

      leftMoves.forEach(function (move) {
        board[move] = huPlayer;
        const value = minimax(depth + 1, true)
        bestVal = Math.min(bestVal, value);
        board[move] = move;
      });
      return bestVal
    }
  }

  function findBestMove() {
    let bestVal = (-1) * MAX_VALUE;
    let bestMove = undefined;
    var leftMoves = Helper.getEmptyIndexes(board, symbols);

    leftMoves.forEach((move) => {
      board[move] = aiPlayer;
      const moveVal = minimax(0, false);
      board[move] = move;
      if (moveVal > bestVal) {
        bestMove = move;
        bestVal = moveVal;
      }
    });
    return bestMove;
  }

  let ret = -1;
  ret = findBestMove();
  return ret;
}