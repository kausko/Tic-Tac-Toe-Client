import { Input, notification } from "antd";
import { useState } from "react";
import { useHistory } from "react-router";
import PopCard from "./PopCard";

function Join() {

  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const handleSearch = value => {
    setLoading(true);
    fetch(process.env.REACT_APP_BASE_URI + '/game', {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ gameID: value })
    })
    .then(res => res.json())
    .then(json => history.push({
      pathname: `/${json.gameID}`,
      state: json
    }))
    .catch(err => {
      setLoading(false)
      notification.error({ message: err.message })
    })
  }

  return(
    <PopCard
      title="Join Game"
      content={
        <Input.Search
          loading={loading}
          placeholder="Enter Match ID"
          className="grow"
          onSearch={handleSearch}
        />
      }
      placement="top"
    />
  )
}

export default Join