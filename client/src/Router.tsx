import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
import { useQuery } from "@tanstack/react-query";
import { loginState } from "./api/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { studentLoginState } from "./atom/atoms";
import KakaoLoading from "./pages/KakaoLoading";
import { useEffect } from "react";
import Admin from "./pages/Admin";
import UploadLecture from "./components/admin/UploadLecture";
import MakeLecture from "./components/admin/MakeLecture";
import UploadDetailLecture from "./components/admin/UploadDetailLecture";
import ScrollToTop from "./components/ScrollToTop";
import Faq from "./pages/Faq";
import FaqContent from "./components/faq-content/FaqContent";
import PaymentScreen from "./components/payment/PaymentScreen";
import StudentIssue from "./components/admin/StudentIssue";
import StudentComment from "./components/admin/StudentComment";
import Legal from "./pages/Legal";
import TermsAndConditions from "./components/legal/TermsAndConditions";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import RefundPolicy from "./components/legal/RefundPolicy";
import Success from "./components/payment/Success";
import Fail from "./components/payment/Fail";
import PaymentStatus from "./components/admin/PaymentStatus";
function Router() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["loginState"],
    queryFn: loginState,
  });
  const setStudentLogin = useSetRecoilState(studentLoginState);
  const test = useRecoilValue(studentLoginState);
  useEffect(() => {
    if (!isLoading && data) {
      const { name, nickname, profileImg, email } = data;
      if (name === undefined) {
        return;
      }
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
            <Route path="faq" element={<Faq />}>
              <Route path=":name" element={<FaqContent />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="join" element={<Join />} />
            <Route path="reviews" element={<Review />} />
            <Route path="columns" element={<Columns />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="html-css-basic" element={<BasicHtmlCss />} />
            <Route
              path=":lectureName/purchase-check"
              element={<PaymentScreen />}
            />
            <Route path="/legal" element={<Legal />}>
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
            </Route>
          </Route>
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/fail" element={<Fail />} />
          <Route path="/kakao-login" element={<KakaoLoading />} />
          <Route path="/:urlName/lectures" element={<Lectures />}>
            <Route path=":lectureId" element={<LectureScreen />} />
          </Route>
          <Route path="/admin-panel" element={<Admin />}>
            <Route index element={null} />
            <Route path="upload-lecture" element={<UploadLecture />} />
            <Route path="make-lecture" element={<MakeLecture />} />
            <Route path="issues" element={<StudentIssue />} />
            <Route path="comments" element={<StudentComment />} />
            <Route path="payment-status" element={<PaymentStatus />} />
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
