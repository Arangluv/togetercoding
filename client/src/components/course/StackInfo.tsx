import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubWrapper = styled.div`
  background-color: #34495e;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 1.5vw 0;
  h2 {
    font-size: 2vw;
    font-weight: 600;
    background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;
const StackIconContainer = styled.div`
  width: 80%;
  height: 15vh;
  margin-top: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconItem = styled.div`
  width: 10vh;
  height: 10vh;
  display: flex;
  margin: 0 0.5vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    color: ${(props) => props.theme.textColor};
    margin-top: 0.5vw;
    font-weight: 600;
    background-color: #2c3e50;
    border-radius: 20px;
    padding: 5px 15px;
  }
`;
const ItemImage = styled.div`
  width: 8vh;
  height: 8vh;
  border-radius: 100%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
export default function StackInfo() {
  return (
    <Wrapper>
      <SubWrapper>
        <h2>All in One Front Stack</h2>
        <StackIconContainer>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
          <IconItem>
            <ItemImage>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp"
                alt=""
              />
            </ItemImage>
            <span>React</span>
          </IconItem>
        </StackIconContainer>
      </SubWrapper>
    </Wrapper>
  );
}
