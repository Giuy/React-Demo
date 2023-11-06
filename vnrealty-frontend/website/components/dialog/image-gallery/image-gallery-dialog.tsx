import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type ImageGalleryDialogProps = {
  images: any[] | undefined;
  imageVariableName?: string;
  isShowDialog?: boolean;
  onClose: () => void;
};

const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = (
  props: ImageGalleryDialogProps
) => {
  const { t } = useTranslation();
  const [imageView, setImageView] = useState<string | undefined>(
    props.images && props.images[0]
  );
  const [imagePlace, setImagePlace] = useState<number>(1);

  useEffect(() => {
    setImageView(props.images && props.images[0]);
    setImagePlace(1);
  }, [props.isShowDialog]);

  const closeViewImage = () => {
    setImageView(undefined);
    props.onClose();
  };

  const onArrowClick = (e: React.MouseEvent) => {
    const isPrev = e.currentTarget.className.includes("prev");
    const index = imageView && props.images?.findIndex((x) => x === imageView);
    const imageCount = props.images ? props.images.length : 0;

    if (isPrev) {
      let item: any;
      if (index && index > 0) {
        item = props.images && props.images[index - 1];
        setImageView(item);
      } else {
        item = props.images && props.images[imageCount - 1];
        setImageView(item);
      }
      setImagePlace((props.images?.findIndex((x) => x === item) || 0) + 1);
    } else {
      let item: any;
      if (index && index < imageCount - 1) {
        item = props.images && props.images[index + 1];
        setImageView(item);
      } else if (index === imageCount - 1) {
        item = props.images && props.images[0];
        setImageView(item);
      } else if (index === 0) {
        item = props.images && props.images[1];
        setImageView(item);
      }
      setImagePlace((props.images?.findIndex((x) => x === item) || 0) + 1);
    }
  };

  return props.isShowDialog ? (
    <div className="image-gallery-dialog-container">
      {imageView && (
        <div className="image-detail">
          <div className="d-flex justify-content-center h100">
            <div className="slide-button prev" onClick={onArrowClick}>
              <ArrowLeft />
            </div>
            <div className="image-frame">
              <div className="image-box">
                <Image
                  src={imageView[props.imageVariableName as any] || ""}
                  alt=""
                  layout="fill"
                />
              </div>
              <div className="image-index">
                {imagePlace} {t("of")} {props.images ? props.images.length : 0}
              </div>
            </div>
            <div className="slide-button next" onClick={onArrowClick}>
              <ArrowRight />
            </div>
            <div className="close-button">
              <Close onClick={closeViewImage} />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ImageGalleryDialog;
