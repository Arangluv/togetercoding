import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMainThemeMutation } from "../../hooks/lecture";
import { useQueryClient } from "@tanstack/react-query";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 100vh;
  overflow-y: scroll;
  padding: 1vw;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 50vh;
`;

const NameLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 1vw;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    margin-bottom: 1vw;
    small {
      color: ${(props) => props.theme.errorColor};
      font-size: 1.1vw;
      margin-left: 1vw;
    }
  }
  input[type="text"] {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    width: 80%;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: transparent;
    padding: 0.8vw 0.5vw;
    border-radius: 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 1.2vw;
  }
`;
const SubmitLabel = styled.label`
  height: auto;
  width: 80%;
  display: flex;
  input[type="submit"] {
    display: none;
  }
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 1.3vw;
    font-weight: 600;
    padding: 1vw 6vw;
    border-radius: 10px;
    background-color: ${(props) => props.theme.successColor};
    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.successColor};
      background-color: ${(props) => props.theme.textColor};
    }
  }
`;
const ExtraErrorSpan = styled.span`
  display: flex;
  color: ${(props) => props.theme.errorColor};
  font-size: 1.1vw;
  margin-bottom: 1vw;
`;
interface IProps {
  lectureId: string;
}
interface DProps {
  lectureName: string;
  extraError?: string;
}
export default function MainThemeMake({ lectureId }: IProps) {
  const queryClient = useQueryClient();
  const { register, formState, handleSubmit } = useForm<DProps>();
  const { mainThemeMutate, mainThemeLoading } = useMainThemeMutation({
    queryClient,
    lectureId,
  });
  const onValid = (data: DProps) => {
    mainThemeMutate({ lectureId, lectureName: data.lectureName });
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <NameLabel htmlFor="lectureName">
          <span>
            대주제 제목
            {formState.errors.extraError ? (
              <small>{formState.errors.lectureName?.message}</small>
            ) : null}
          </span>
          <input
            {...register("lectureName", {
              required: "챕터 제목을 입력헤주세요",
            })}
            id="lectureName"
            type="text"
          />
        </NameLabel>
        {formState.errors.extraError ? (
          <ExtraErrorSpan>{formState.errors.extraError.message}</ExtraErrorSpan>
        ) : null}
        <SubmitLabel>
          <span>저장!</span>
          <input type="submit" />
        </SubmitLabel>
      </Form>
    </Wrapper>
  );
}
