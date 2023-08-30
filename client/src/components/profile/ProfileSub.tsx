import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRecoilValue } from "recoil";
import { studentLoginState } from "../../atom/atoms";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { profileChange } from "../../api/api";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  width: 80%;
  padding-right: 5vw;
  height: 82vh;
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
`;
const Title = styled.div`
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid #ecf0f1;
  display: flex;
  align-items: center;
  padding-bottom: 1vw;
  h2 {
    font-size: 1.3vw;
    font-weight: 600;
    color: #ecf0f1;
  }
`;
const ProfileForm = styled.form`
  width: 100%;
  height: auto;
  margin-top: 2vw;
  background-color: rgba(99, 110, 114, 0.5);
  border-radius: 20px;
  display: flex;
`;
const ProfileImageBox = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    margin-top: 2vw;
    font-size: 1.3vw;
    color: #ecf0f1;
  }
`;
const ProfileImageLabel = styled.label`
  width: 13vw;
  height: 13vw;
  border: 1px solid #bdc3c7;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
  svg {
    width: 6vw;
    height: 6vw;
    color: white;
  }
  input[type="file"] {
    display: none;
  }
`;
const ProfileContent = styled.div`
  width: 70%;
  height: 100%;
  /* border: 1px solid red; */
  padding: 2vw;
  padding-left: 3vw;
`;
const ProfileContentSubBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 2vw;
  label {
    &#email {
      input[type="text"] {
        background-color: rgba(127, 140, 141, 0.3);
        /* border: none; */
        &::placeholder {
          color: #bdc3c7;
        }
      }
    }
    display: flex;
    flex-direction: column;
    input[type="text"] {
      background-color: transparent;
      width: 40%;
      border: 1px solid ${(props) => props.theme.textColor};
      padding: 0.7vw;
      color: ${(props) => props.theme.textColor};
      font-size: 1.1vw;
      border-radius: 10px;
      transition: all 0.2s ease-in-out;
    }
    input[type="text"]:focus {
      outline: none;
      border-color: #7f8c8d;
    }
    span {
      color: ${(props) => props.theme.textColor};
      font-weight: 600;
      margin-bottom: 1vw;
    }
  }
  /* border: 1px solid red; */
`;
const ProfileSubmitBox = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  /* justify-content: flex-end; */
  label[for="profile_save"] {
    span {
      font-size: 1.3vw;
      padding: 1vw 5vw;
      color: ${(props) => props.theme.textColor};
      border-radius: 10px;
      background-color: #e74c3c;
      transition: all 0.2s ease-in-out;
      &:hover {
        cursor: pointer;
        filter: brightness(1.2);
      }
    }
    height: 100%;
    display: flex;
    align-items: center;
    input[type="submit"] {
      display: none;
    }
  }
`;
interface DProps {
  nickname: string;
  name: string;
  profileImage: FileList;
}
export default function ProfileSub() {
  const loginState = useRecoilValue(studentLoginState);
  const { mutate, isLoading } = useMutation({
    mutationFn: profileChange,
    onSuccess: () => {
      toast.success("변경 성공!");
      // todo Query 초기화
      return;
    },
    onError: () => {
      toast.error("실패 ㅠㅠ");
    },
  });
  const [preview, setPreview] = useState("");
  const {
    register,
    watch,
    formState,
    setError,
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm<DProps>();
  // console.log("watch ?");
  // console.log(watch());
  // console.log("formState ?");
  // console.log(formState.errors);
  useEffect(() => {
    if (watch("profileImage")[0]) {
      const profilePreview = URL.createObjectURL(watch("profileImage")[0]);
      setPreview(profilePreview);
    }
    return () => URL.revokeObjectURL(preview);
  }, [watch("profileImage")]);
  useEffect(() => {
    // 초기 프로필 값 세팅
    if (loginState.username) {
      setValue("name", loginState.username);
    }
    if (loginState.nickname) {
      setValue("nickname", loginState.nickname);
    }
    if (loginState.profileImg) {
      setPreview(loginState.profileImg);
    }
  }, [loginState]);

  // 1. 사용자가 전부 변경하는 경우
  // 2. 사용자가 하나만 변경하는 경우 (모든 경우에 해당)
  // 3. 사영자가 닉네임 이름을 변경하고 프로필사진을 변경하지 않은 경우
  // 4. 사용자가 사진만 변경하는 경우 -> 기존에 있는 사진을 지운다 (backend)
  const onValid = (data: DProps) => {
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("name", data.name);
    formData.append("email", loginState.email);
    if (data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }
    mutate(formData);
  };
  return (
    <Wrapper>
      <Title>
        <h2>프로필 수정</h2>
      </Title>
      <ProfileForm onSubmit={handleSubmit(onValid)}>
        <ProfileImageBox>
          <ProfileImageLabel htmlFor="profile_image">
            <input
              {...register("profileImage", {
                required: false,
                // validate: (value) => {
                //   console.log("validation 내부에서 vlaue ?");
                //   console.log(value);
                //   if (value && value[0] && value[0].type) {
                //     return value[0].type.startsWith("image/")
                //       ? undefined
                //       : "이미지 파일만 올려주세요";
                //   }
                //   return "Please select an image.";
                // },
              })}
              id="profile_image"
              type="file"
              accept=".png,.jpg,.jpeg"
            />
            {preview ? (
              <img src={preview} alt="student profile image" />
            ) : (
              <PersonAddIcon />
            )}
          </ProfileImageLabel>
          <span>프로필 이미지 등록하기</span>
        </ProfileImageBox>
        <ProfileContent>
          <ProfileContentSubBox>
            <label htmlFor="user_name">
              <span>닉네임</span>
              <input
                {...register("nickname", {
                  required: "닉네임을 입력해주세요",
                  minLength: {
                    value: 2,
                    message: "최소 2글자 이상입니다",
                  },
                })}
                id="user_name"
                type="text"
              />
            </label>
          </ProfileContentSubBox>
          <ProfileContentSubBox>
            <label htmlFor="name">
              <span>이름</span>
              <input
                {...register("name", {
                  required: "이름을 입력해주세요",
                  minLength: {
                    value: 2,
                    message: "최소 2글자 이상입니다",
                  },
                })}
                id="name"
                type="text"
              />
            </label>
          </ProfileContentSubBox>
          <ProfileContentSubBox>
            <label htmlFor="email" id="email">
              <span>가입이메일</span>
              <input
                id="email"
                type="text"
                readOnly
                placeholder="디폴트 가입이메일"
              />
            </label>
          </ProfileContentSubBox>
          <ProfileSubmitBox>
            <label htmlFor="profile_save">
              <span>프로필 저장</span>
              <input id="profile_save" type="submit" />
            </label>
          </ProfileSubmitBox>
        </ProfileContent>
      </ProfileForm>
    </Wrapper>
  );
}
