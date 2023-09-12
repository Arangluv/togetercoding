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
import LectureCurriculumsItem from "./LectureCurriculumsItem";
import { useLocation } from "react-router-dom";
import { useLectureListQuery } from "../../hooks/lecture";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { lectureListState, subLectureListState } from "../../atom/atoms";
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
  // padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: 0,
}));

interface SubLectureListProps {
  githubUrl: string;
  isTaken: boolean;
  issue: [];
  lectureLink: string;
  name: string;
  notice: string;
  studentNote: [];
  _id: string;
}
export default function AccordionLecture() {
  const urlName = useLocation().pathname.split("/")[1]; // ex) html-css-basic

  const [chapters, setChapter] = React.useState<string[]>([]);
  const lectureListData = useLectureListQuery(urlName ? urlName : "");
  const [lectureList, setLectureList] = useRecoilState(lectureListState);
  const [subLectureList, setSubLectureList] =
    useRecoilState(subLectureListState);
  React.useEffect(() => {
    if (!lectureListData) {
      return;
    }
    const chapterList = lectureListData.map((lecture) => lecture.name);
    const subLectureList: SubLectureListProps[] = [];
    lectureListData.forEach((mainTheme) => {
      mainTheme.subLecture.forEach((subLecture) => {
        subLectureList.push(subLecture);
      });
    });
    setSubLectureList(subLectureList);
    setChapter(chapterList);
    setLectureList(lectureListData);
  }, [lectureListData]);
  // console.log(lectureListData)

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
  let lectureCount = 0;
  return (
    <div>
      {lectureList
        ? lectureList.map((mainLecture) => {
            return (
              <Accordion
                key={mainLecture._id}
                expanded={chapters.includes(mainLecture.name)}
              >
                <AccordionSummary
                  onClick={() => handleClick(mainLecture.name)}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                >
                  <Typography>{mainLecture.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {mainLecture.subLecture.map((subLecture) => {
                    lectureCount = lectureCount + 1;
                    return (
                      <LectureCurriculumsItem
                        key={subLecture._id}
                        name={subLecture.name}
                        lectureId={subLecture._id}
                        isTaken={subLectureList[lectureCount - 1].isTaken}
                        mainLectureId={mainLecture._id}
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })
        : null}
    </div>
  );
}
