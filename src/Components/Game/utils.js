import { Button, Col, Row, Space, Typography } from "antd";

export function Choice({ chooseToken }) {
  return(
    <Row align="middle" justify="center" gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title>Choose your token</Typography.Title>
      </Col>
      <Col>
        <Space>
        {["X", "O"].map(v => <Button key={v} size="large" onClick={chooseToken(v)}>{v}</Button>)}
        </Space>
      </Col>
    </Row>
  )
}

/**
 * @param  {string[][]} board
 */
 export const checkVictory = board => {
  const series = [0,1,2];
    
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== " ")
      return { i: series, j: series };
    
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== " ")
      return { i: series, j: series.reverse() };
    
    for (let i = 0; i < 3; i++) {

      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] !== " ")
        return { i: Array(3).fill(i), j: series };

      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] !== " ")
        return { j: Array(3).fill(i), i: series };
    }
    return null;
}