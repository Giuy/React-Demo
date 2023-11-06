import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type VideoDialogProps = {
  videoLink: string | undefined;
  isShowDialog?: boolean;
  onClose: () => void;
};

const VideoDialog: React.FC<VideoDialogProps> = (props: VideoDialogProps) => {
  const { t } = useTranslation();
  const [video, setVideo] = useState<string | undefined>(props.videoLink || "");

  useEffect(() => {
    setVideo(props.videoLink || "");
  }, [props.isShowDialog]);

  const closeDialog = () => {
    setVideo(undefined);
    props.onClose();
  };

  return props.isShowDialog ? (
    <div className="dialog-container video-dialog-container">
      {video && (
        <div className="video-detail">
          <div className="d-flex justify-content-center h100">
            <div className="w-100 my-auto">
              <div className="video-box">
                <iframe
                  width="100%"
                  height="100%"
                  src={video}
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
            <div className="close-button">
              <Close onClick={closeDialog} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default VideoDialog;
