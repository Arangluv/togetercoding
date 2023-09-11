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
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function IssuePart() {
  const subLectureId = useLocation().pathname.split("/")[3];
  const issueData = useGetIssueQuery(subLectureId);
  // interface IssueProps {
  //   _id: string;
  //   owner: string;
  //   ownerProfileUrl: null | string;
  //   ownerNickname: string;
  //   title: string;
  //   subLectureId: string;
  //   responseState: false;
  //   content: string;
  //   referenceImg: string | null;
  //   createdAt: string;
  //   issueReply: [];
  // }
  console.log("issueData");
  console.log(issueData);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div style={{ width: "100%", padding: "1vw" }}>
      {issueData?.length ? (
        issueData?.map((issue) => {
          return (
            <Accordion
              expanded={expanded === issue._id}
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
}
