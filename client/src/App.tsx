import styled from "styled-components";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/MainPart/Footer";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
function App() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

export default App;
