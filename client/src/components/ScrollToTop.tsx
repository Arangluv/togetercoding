import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props: any) {
  const { pathname } = useLocation();
  console.log("scroll to top 실행!");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return <>{props.children}</>;
}
