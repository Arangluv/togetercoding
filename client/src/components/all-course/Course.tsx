import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const CourseContainer = styled.article<ToggleState>`
  width: 100%;
  height: ${(props) => (props.toggleState === "list" ? "20vw" : "25vw")};
  border-radius: 10px;
  margin-bottom: 2vw;
  display: flex;
  flex-direction: ${(props) =>
    props.toggleState === "list" ? "row" : "column"};
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  &:hover {
    cursor: pointer;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;
const CourseImageBox = styled.div<ToggleState>`
  width: ${(props) => (props.toggleState === "list" ? "40%" : "100%")};
  height: ${(props) => (props.toggleState === "list" ? "100%" : "70%")};
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: ${(props) =>
    props.toggleState === "list" ? "0px" : "10px"};
  border-bottom-left-radius: ${(props) =>
    props.toggleState === "list" ? "10px" : "0px"};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }
`;
const CourseInfoBox = styled.div<ToggleState>`
  width: ${(props) => (props.toggleState === "list" ? "60%" : "100%")};
  height: ${(props) => (props.toggleState === "list" ? "100%" : "30%")};
  padding: 2vw;
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: ${(props) =>
    props.toggleState === "list" ? "baseline" : "center"};
  position: relative;
  h2 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 1.6vw;
    margin-bottom: 0.5vw;
    text-shadow: 1px 1px 2px #f1c40f;
  }
  span {
    font-weight: 500;
    font-size: 1.2vw;
    text-shadow: 1px 1px 1px #8e44ad;
    color: #ecf0f1;
    margin-bottom: 1vw;
  }
  p {
    width: 80%;
    line-height: 1.5;
    color: #bdc3c7;
  }
`;
const CourseTagBox = styled.div`
  width: 80%;
  height: 3vw;
  position: absolute;
  bottom: 1vw;
  display: flex;
`;
const TagBox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 0 2vw;
  margin-right: 1vw;
  border-radius: 15px;
  background-color: #8e44ad;
  text-shadow: 1px 1px 3px white;
`;
interface ToggleState {
  toggleState: "list" | "module";
}
interface IProps {
  toggleState: "list" | "module";
  thumbnail: string;
  urlName: string;
  name: string;
  subName: string;
  lectureTag: string[];
  description: string;
  _id: string;
}
export default function Course({
  toggleState,
  thumbnail,
  name,
  urlName,
  subName,
  lectureTag,
  _id,
  description,
}: IProps) {
  const navigator = useNavigate();
  return (
    <CourseContainer
      toggleState={toggleState}
      onClick={() => navigator(`/${urlName}`)}
    >
      <CourseImageBox toggleState={toggleState}>
        <img src={thumbnail} />
      </CourseImageBox>
      <CourseInfoBox toggleState={toggleState}>
        <h2>{name}</h2>
        <span>{subName}</span>
        {toggleState === "list" ? <p>{description}</p> : null}
        {toggleState === "list" ? (
          <CourseTagBox>
            {lectureTag.map((tag, idx) => (
              <TagBox key={idx}>{tag}</TagBox>
            ))}
          </CourseTagBox>
        ) : null}
      </CourseInfoBox>
    </CourseContainer>
  );
}
