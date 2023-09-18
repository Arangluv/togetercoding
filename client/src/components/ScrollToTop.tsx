import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props: any) {
  const location = useLocation();
  const { pathname, state } = location;
  // 클릭하고 들어오면
  // state: {openIssue: true, _id: '6503f48364f17b6b299ad1f6'}
  // 페이지 내부에서 이동하거나,
  // state null;
  useEffect(() => {
    if (!state) {
      window.scrollTo(0, 0);
      return;
    }
  }, [pathname]);

  return <>{props.children}</>;
}
