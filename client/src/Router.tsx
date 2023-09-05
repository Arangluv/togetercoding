import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import ProfileSub from "./components/profile/ProfileSub";
import PaymentHistory from "./components/profile/PaymentHistory";
import Certificates from "./components/profile/Certificates";
import DashBoard from "./components/profile/DashBoard";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Review from "./pages/Review";
import Columns from "./pages/Columns";
import AllCourses from "./pages/AllCourses";
import BasicHtmlCss from "./pages/BasicHtmlCss";
import Lectures from "./pages/Lectures";
import LectureScreen from "./components/lectures/LectureScreen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loginState } from "./api/api";
import { useSetRecoilState } from "recoil";
import { studentLoginState } from "./atom/atoms";
import KakaoLoading from "./pages/KakaoLoading";
import { useEffect } from "react";
import Admin from "./pages/Admin";
import UploadLecture from "./components/admin/UploadLecture";
import MakeLecture from "./components/admin/MakeLecture";
import UploadDetailLecture from "./components/admin/UploadDetailLecture";
import ScrollToTop from "./components/ScrollToTop";
function Router() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["loginState"],
    queryFn: loginState,
  });
  const setStudentLogin = useSetRecoilState(studentLoginState);
  useEffect(() => {
    if (!isLoading && data) {
      const { name, nickname, profileImg, email } = data;
      setStudentLogin({
        username: name,
        nickname,
        profileImg,
        email,
      });
    }
  }, [data]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileSub />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="payment-history" element={<PaymentHistory />} />
              <Route path="certificates" element={<Certificates />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
            <Route path="reviews" element={<Review />} />
            <Route path="columns" element={<Columns />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="html-css-basic" element={<BasicHtmlCss />} />
          </Route>
          <Route path="/kakao-login" element={<KakaoLoading />} />
          <Route path="/html-css-basic/lectures" element={<Lectures />}>
            <Route path=":lectureId" element={<LectureScreen />} />
          </Route>
          <Route path="/admin-panel" element={<Admin />}>
            <Route index element={null} />
            <Route path="upload-lecture" element={<UploadLecture />} />
            <Route path="make-lecture" element={<MakeLecture />} />
          </Route>
          <Route
            path={"/admin-panel/upload-lecture/:lectureId"}
            element={<UploadDetailLecture />}
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default Router;