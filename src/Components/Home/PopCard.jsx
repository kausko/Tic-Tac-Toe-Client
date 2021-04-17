import { Card, Popover, Statistic } from "antd";

function PopCard({ title, content, placement }) {
  return(
    <Popover content={content} trigger="click" placement={placement}>
      <Card hoverable>
        <Statistic value={title}/>
      </Card>
    </Popover>
  )
}

export default PopCard;