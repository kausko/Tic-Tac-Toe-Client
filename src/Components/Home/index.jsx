import { Col, Image, Row } from "antd";
import Join from "./Join";
import New from "./New";
// import { ReactComponent as Image } from "./tictactoe.svg";

function Home() {
  return(
    <Row 
      align="middle"
      justify="space-around"
      className="grow"
    >
      <Col xs={0} md={12}>
        <Image
          src={process.env.PUBLIC_URL + "/tictactoe.svg"}
          preview={false}
        />
      </Col>
      <Col xs={24} md={8}>
        <Row
          align="middle"
          justify="space-around"
          className="grow"
          gutter={[0,12]}
        >
          <Col xs={24}>
            <Join/>
          </Col>
          <Col xs={24}>
            <New/>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Home;