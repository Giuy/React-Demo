import { useTranslation } from "react-i18next";
import Image from "next/image";

type HomeOurCommitmentsProps = {
  homeInfo?: any;
  ourCommitments?: any[];
};

const HomeOurCommitments: React.FC<HomeOurCommitmentsProps> = ({
  homeInfo,
  ourCommitments,
}) => {
  const { t } = useTranslation();

  return (
    <div className="home-component">
      <div className="our-commitments">
        {homeInfo && homeInfo.data && (
          <div className="our-commitments-title">
            <p className="title mb20">{homeInfo?.data.title}</p>
            <p className="mb20">{homeInfo?.data.shortDescriptions}</p>
          </div>
        )}
        <div className="row d-flex justify-content-center flex-wrap">
          {ourCommitments &&
            ourCommitments.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb40" key={item.id}>
                {item.data && (
                  <div className="commitment">
                    <div className="row">
                      <div className="col-12 text-center">
                        <div className="commitment-images">
                          <Image
                            src={item?.data?.image?.fileUrl}
                            alt={item?.data.title}
                            layout="fill"
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <p className="content mt12 semiBold">
                          {t(item?.data.title)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeOurCommitments;
