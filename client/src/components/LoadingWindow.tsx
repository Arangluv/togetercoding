import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface IProps {
  loading: boolean;
}
export default function LoadingWindow({ loading }: IProps) {
  return (
    <Overlay>
      <PulseLoader color="#192a56" loading={loading} size={30}></PulseLoader>
    </Overlay>
  );
}
