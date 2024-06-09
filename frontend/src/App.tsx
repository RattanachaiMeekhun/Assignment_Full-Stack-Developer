import NavBar from "./components/navigation/NavBar";
import { AppRouter } from "./router/AppRouter";
import { Layout } from "antd";

const { Header, Content } = Layout;
function App() {
  return (
    <>
      <Layout>
        <Header style={{ padding: 0 }}>
          <NavBar />
        </Header>
        <Content style={{ minHeight: "100vh" }}>
          <AppRouter />
        </Content>
      </Layout>
    </>
  );
}

export default App;
