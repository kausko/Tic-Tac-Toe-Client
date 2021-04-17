import PopCard from "./PopCard"
import { RobotOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useHistory } from "react-router"
import { Button, notification, Space, Typography } from "antd"

function New() {
	const [loading, setLoading] = useState(false)

	const history = useHistory()

	const handlePVP = () => {
		setLoading(true)
		fetch(process.env.REACT_APP_BASE_URI + "/game", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				history.push({
					pathname: `/${json.gameID}`,
					state: json,
				})
				notification.info({
					message: (
						<Typography.Text copyable={{ text: json.gameID }}>
							Game {json.gameID} created
						</Typography.Text>
					),
					duration: 0,
				})
			})
			.catch((err) => {
				setLoading(false)
				notification.error({ message: err.message })
			})
	}

	const handlePVC = () => history.push("/computer")

	return (
		<PopCard
			title="New Game"
			content={
				<Space>
					<Button
						icon={<UsergroupAddOutlined />}
						onClick={handlePVP}
						loading={loading}
					>
						Vs Player
					</Button>
					<Button
						icon={<RobotOutlined />}
						onClick={handlePVC}
						loading={loading}
					>
						Vs Computer
					</Button>
				</Space>
			}
			placement="bottom"
		/>
	)
}

export default New
