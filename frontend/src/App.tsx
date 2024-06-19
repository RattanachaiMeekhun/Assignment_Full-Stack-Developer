import { AppRouter } from "./router/AppRouter";
import { Layout } from "antd";

const { Content } = Layout;
function App() {
  return (
    <>
      <Layout>
        <Content style={{ minHeight: "100vh" }}>
          <AppRouter />
        </Content>
      </Layout>
    </>
  );
}

export default App;
