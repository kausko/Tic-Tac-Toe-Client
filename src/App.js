import { Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import PVP from "./Components/PVP";
import PVB from "./Components/PVB";

function App() {

  return(
    <Layout>
      <PageHeader 
        title="TicTacToe"
      />
      <Content>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/computer">
              <PVB/>
            </Route>
            <Route path="/:gameID">
              <PVP/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Content>
    </Layout>
  );
}

export default App;