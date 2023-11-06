import { IconButton, makeStyles } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useEffect, useState } from "react";
import { ClassNames } from "@emotion/react";

function Scroll(props: any) {
  const { showBelow } = props;

  const [show, setShow] = useState(showBelow ? false : true);
  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleScroll = () => {
    if (window.scrollY > showBelow) {

      if (!show) setShow(true);
    } else {

      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div className="back-to-top">
      {show && (
        <IconButton onClick={handleClick}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
}

export default Scroll;
