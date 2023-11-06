import { CustomText } from "../../components/styled-custom";

export type RTemplate = {
  img: string;
  title?: React.ReactNode;
  shortDescription?: string;
  time?: React.ReactNode;
};
function RelateTemplate(props: RTemplate) {
  return (
    <div className="relate-template dFlex py12">
      <div className="image">
        <img className="w100" src={props.img} alt="" />
      </div>
      <div className="content-relate dFlex directionColumn pt12">
        <CustomText className="semiBold pb8">{props.title}</CustomText>
        <CustomText className="pb8 gray">{props.time}</CustomText>
        <div
            className="content-detail textEllipsis"
            dangerouslySetInnerHTML={{
              __html: props?.shortDescription ? props.shortDescription : ''
            }}
          ></div>
      </div>
    </div>
  );
}

export default RelateTemplate;
