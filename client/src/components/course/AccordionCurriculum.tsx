import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CurriculumsItem from "./CurriculumsItem";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
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
  flexDirection: "row-reverse",
  color: "white",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: 0,
}));

export default function AccordionCurriculum() {
  const [chapters, setChapter] = React.useState<string[]>([]);
  React.useEffect(() => {
    setChapter(["chapter1", "chapter2"]);
  }, []);
  const handleClick = (chapterName: string) => {
    if (chapters.includes(chapterName)) {
      const targetIndex = chapters.findIndex((item) => item === chapterName);
      chapters.splice(targetIndex, 1);
      setChapter([...chapters]);
      return;
    }
    chapters.push(chapterName);
    setChapter([...chapters]);
    return;
  };
  return (
    <div>
      <Accordion
        expanded={chapters.includes("chapter1")}
        onClick={() => handleClick("chapter1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
          <CurriculumsItem />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={chapters.includes("chapter2")}
        onClick={() => handleClick("chapter2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <CurriculumsItem />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
