import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Wrapper = styled.ul`
  width: 20%;
  height: 82vh;
  display: flex;
  flex-direction: column;
  display: flex;
  /* align-items: center; */
  padding-top: 15vh;
  padding-left: 2vw;
`;
const ListItem = styled.li`
  width: 100%;
  height: 7vh;
  margin: 5px 0;
  a {
    text-decoration: none;
    font-size: 1.3vw;
    color: ${(props) => props.theme.textColor};
    /* border: 1px solid white; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-in-out;
    svg {
      width: 2vw;
      height: 2vw;
      margin-right: 1vw;
    }
    &:hover {
      background-color: rgb(127, 140, 141, 0.2);
    }
  }
`;
export default function ProfileList() {
  const profileMatch = useMatch("/profile");
  const historyMatch = useMatch("/profile/payment-history");
  const certificatesMatch = useMatch("/profile/certificates");
  const dashboardMatch = useMatch("/profile/dashboard");
  return (
    <Wrapper>
      <ListItem>
        <Link
          to="/profile"
          style={{
            backgroundColor: profileMatch
              ? "rgb(127, 140, 141, 0.2)"
              : "transparent",
          }}
        >
          <AccountCircleIcon />
          프로필
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="dashboard"
          style={{
            backgroundColor: dashboardMatch
              ? "rgb(127, 140, 141, 0.2)"
              : "transparent",
          }}
        >
          <DashboardIcon />
          대쉬보드
        </Link>
      </ListItem>
      <ListItem>
        <Link
          to="payment-history"
          style={{
            backgroundColor: historyMatch
              ? "rgb(127, 140, 141, 0.2)"
              : "transparent",
          }}
        >
          <ReceiptLongIcon />
          구매내역
        </Link>
      </ListItem>
    </Wrapper>
  );
}
