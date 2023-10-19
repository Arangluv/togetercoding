import styled from "styled-components";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/MainPart/Footer";
import { useRecoilValue } from "recoil";
import { footerHeightState } from "./atom/atoms";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
  footerHeight: Number;
}
const Wrapper = styled.div<IProps>`
  width: 100%;
  height: auto;
  position: relative;
  padding-bottom: ${(props) => `${props.footerHeight}px`};
`;
function App() {
  const footerHeight = useRecoilValue(footerHeightState);
  const location = useLocation();
  useEffect(() => {
    if (!location.search) {
      return;
    }
    const loginValidQuery = location.search.split("?")[1]; // ?valid=false
    if (loginValidQuery === "valid=false") {
      toast.error(`다시 로그인해주세요`);
    }
  }, []);
  return (
    <Wrapper footerHeight={footerHeight ? footerHeight : 0}>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

export default App;
