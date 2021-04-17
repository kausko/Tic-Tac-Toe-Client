import { Row, Card, Col, Statistic, Typography } from "antd"
import { Link } from "react-router-dom"

function Game({ game, sessionID, updateBoard }) {
	const empty = () => {}

	const condition =
		game.players[sessionID].token === "X"
			? !(game.moves % 2)
			: !!(game.moves % 2)
	return (
		<Row align="middle" justify="center" gutter={[8, 8]}>
			<Col span={12}>
				<Statistic title="You" value={game?.players?.[sessionID]?.token}/> 
			</Col>
			<Col span={12}>
				<Statistic title="Opponent" value={game?.players?.[game?.players?.[sessionID]?.opponent]?.token}/> 
			</Col>
			{game.board.map((row, i) =>
				row.map((col, j) => (
					<Col key={j} span={8}>
						<Card
							hoverable={game.status === "playing" && condition && col === " "}
							onClick={
								game.status === "playing" && condition && col === " "
									? updateBoard(i, j)
									: empty
							}
						>
							<Statistic
								value={col}
								valueStyle={{
									color:
										game?.result?.i?.some((v) => v === i) &&
										game?.result?.j?.some((v) => v === j)
											? condition
												? "red"
												: "green"
											: "white",
								}}
							/>
						</Card>
					</Col>
				))
			)}
			<Col>
				<Typography.Title>
					{game.status === "draw"
						? "It's a draw"
						: game.status === "over"
						? condition
							? "You lose"
							: "You win"
						: condition
						? "Your Turn"
						: "Opponent's Turn"}
				</Typography.Title>
			</Col>
			<Col span={24}></Col>
			{game.status !== "playing" && (
				<Col>
					<Link to="/">Exit</Link>
				</Col>
			)}
		</Row>
	)
}

export default Game
