import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IssueItemContainer from "./IssueItemContainer";
import IssueTitle from "./IssueTitle";
import { useLocation } from "react-router-dom";
import { useGetIssueQuery } from "../../hooks/lecture";
import NoIssueAlarm from "./NoIssueAlarm";
import { useRecoilState, useSetRecoilState } from "recoil";
import { componentDidMountState, panelState } from "../../atom/atoms";
import { forwardRef } from "react";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  marginBottom: "10px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#353b48",
  color: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));
const IssuePart = React.forwardRef<HTMLDivElement>((props, ref) => {
  const subLectureId = useLocation().pathname.split("/")[3];
  const issueData = useGetIssueQuery(subLectureId);
  const [panel, setPanel] = useRecoilState(panelState);
  const setComponentDidMount = useSetRecoilState(componentDidMountState);
  console.log("-------자식컴포넌트에서 ref-------");
  console.log(ref);
  console.log("-------자식컴포넌트에서 ref 끝-------");
  React.useEffect(() => {
    if (!ref) {
      return;
    }
    setComponentDidMount(true);
  }, [ref]);
  const handleChange =
    (inputPanel: string) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      setPanel(newExpanded ? inputPanel : false);
    };

  return (
    <div style={{ width: "100%", padding: "1vw" }} ref={ref}>
      {issueData?.length ? (
        issueData?.map((issue) => {
          return (
            <Accordion
              expanded={panel === issue._id}
              onChange={handleChange(issue._id)}
              key={issue._id}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "#C2C9D1",
                  },
                }}
              >
                <Typography sx={{ width: "100%" }}>
                  <IssueTitle
                    title={issue.title}
                    responseState={issue.responseState}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <IssueItemContainer
                  _id={issue._id}
                  ownerNickname={issue.ownerNickname}
                  ownerProfileUrl={issue.ownerProfileUrl}
                  content={issue.content}
                  referenceImg={issue.referenceImg}
                  issueReply={issue.issueReply}
                ></IssueItemContainer>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <NoIssueAlarm />
      )}
    </div>
  );
});

export default IssuePart;
