import styled from "styled-components";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { uploadProgressState } from "../atom/atoms";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
`;

interface IProps {
  progressValue: number;
}
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function UploadProgress({ progressValue }: IProps) {
  const [uploadState, setUploadState] = useRecoilState(uploadProgressState);
  console.log("UploadProgress에서 progress value ?");
  console.log(uploadState);
  useEffect(() => {
    if (uploadState === 100) {
      setUploadState(0);
    }
  }, [uploadState]);
  return (
    <Wrapper>
      <CircularProgressWithLabel value={progressValue} />
    </Wrapper>
  );
}
