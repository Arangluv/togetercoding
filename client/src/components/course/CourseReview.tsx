import styled from "styled-components";
import StudentReview from "../review/StudentReview";

const Wrapper = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  margin-top: 4vw;
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4vw;
  h2 {
    font-size: 2vw;
    font-weight: 700;
    background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
    color: transparent;
    -webkit-background-clip: text;
  }
  small {
    font-size: 1.3vw;
    margin-top: 0.5vw;
    font-weight: 600;
    color: #bdc3c7;
    filter: brightness(1.1);
  }
`;
const ReviewContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const ReviewItem = styled.article`
  width: 100;
  height: 35vh;
  border-radius: 20px;
  padding: 2vw 3vw;
  position: relative;
  background-color: #2d3436;
  h2 {
    font-weight: 600;
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
  }
  p {
    font-size: 1.2vw;
    margin-top: 2vw;
    height: 19vh;
    overflow: hidden;
    line-height: 1.5;
    color: ${(props) => props.theme.textColor};
    white-space: pre-wrap;
  }
`;
const ReviewProfile = styled.div`
  width: 100%;
  height: 8vh;
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  justify-content: flex-end;
  div {
    width: 30%;
    height: 100%;
    display: flex;
    display: flex;
    align-items: center;
    padding: 0.5vw;
    span {
      font-weight: 600;
      color: #dfe6e9;
      margin-left: 0.5vw;
      text-decoration: underline;
    }
    div {
      width: 6vh;
      height: 6vh;
      border-radius: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 100%;
      }
    }
  }
`;
export default function CourseReview() {
  return (
    <Wrapper>
      <Title>
        <h2>수강생들의 리뷰에요</h2>
        <small>가치있는 컨텐츠로 증명합니다</small>
      </Title>
      <ReviewContainer>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
        <ReviewItem>
          <h2>
            오랜시간을 투자해서 들어야하는 만큼 엄청난 퀄리티를 가진 강의!
          </h2>
          <p>
            처음 강의 듣기 시작할 땐 단순히 클론프로젝트 몇개 만들면 되겠지 하는
            마음으로 들었다가 제대로 집중하지 않으면 안되겠다 라는 생각이 든
            강의였어요. 리액트를 어느정도 사용해봤고 백엔드 개발도 해본 입장으로
            클라이언트와 서버를 넘나들며 여러가지로 정말 많은 것을 배웠습니다.
            기본기부터 시작해서 중간중간 퀄리티 높은 중, 고급 팁까지 많은 정보가
            담긴 강의입니다. Next.
          </p>
          <ReviewProfile>
            <div>
              <div>
                <img
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/evernewie-avatar.jpg"
                  alt=""
                />
              </div>
              <span>slfzkvmfl2</span>
            </div>
          </ReviewProfile>
        </ReviewItem>
      </ReviewContainer>
    </Wrapper>
  );
}
