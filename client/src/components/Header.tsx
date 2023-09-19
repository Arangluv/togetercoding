import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { studentLoginState } from "../atom/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentLogout } from "../api/api";
import { toast } from "react-toastify";
const StyledContainer = styled(Box)`
  width: 100%;
  padding: 1vw 2vw;
  display: flex;
  align-items: center;
  height: 6vw;
  justify-content: flex-end;
  color: ${(props) => props.theme.textColor};
  position: absolute;
  top: 0;
  z-index: 1;
`;
const StyledTypo = styled(Typography)`
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;
const LogoImgContainer = styled.div`
  width: 20%;
  height: 100%;
  position: absolute;
  left: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    font-size: 2.5vw;
  }
`;
export default function Header() {
  const setStudentLoginState = useSetRecoilState(studentLoginState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: studentLogout,
    onSuccess: () => {
      toast.success("로그아웃 성공!");
      setStudentLoginState({
        username: "",
        nickname: "",
        email: "",
        profileImg: "",
      });
      return queryClient.invalidateQueries(["loginState"]);
    },
    onError: () => {
      toast.error("로그아웃실패");
    },
  });
  const loginState = useRecoilValue(studentLoginState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigator = useNavigate();
  return (
    <React.Fragment>
      <StyledContainer
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <LogoImgContainer>
          <h1 onClick={() => navigator("/")}>같이코딩</h1>
        </LogoImgContainer>
        <StyledTypo
          sx={{ minWidth: 100 }}
          onClick={() => navigator("all-courses")}
        >
          전체강의
        </StyledTypo>
        <StyledTypo
          sx={{ minWidth: 100 }}
          onClick={() => navigator("/reviews")}
        >
          리뷰
        </StyledTypo>
        <StyledTypo
          sx={{ minWidth: 100 }}
          onClick={() => navigator("/columns")}
        >
          칼럼
        </StyledTypo>
        {loginState.email === "" ? null : (
          <StyledTypo
            sx={{ minWidth: 100 }}
            onClick={() => navigator("/profile/dashboard")}
          >
            대쉬보드
          </StyledTypo>
        )}
        <StyledTypo sx={{ minWidth: 100 }} onClick={() => navigator("/faq")}>
          FAQ
        </StyledTypo>
        {loginState.email === "" ? (
          <StyledTypo
            sx={{ minWidth: 100 }}
            onClick={() => navigator("/login")}
          >
            로그인
          </StyledTypo>
        ) : null}
        {loginState.email === "" ? null : (
          <Tooltip title="프로필설정">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        )}
      </StyledContainer>
      {loginState.email === "" ? null : (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => navigator("/profile")}
            style={{ display: "flex", justifyContent: "center" }}
          >
            프로필
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => mutate()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );
}
