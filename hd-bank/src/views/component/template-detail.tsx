import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ShareIcon from "@mui/icons-material/Share";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import RelateTemplate, { RTemplate } from "./relate-template";
import { CustomText } from "../../components/styled-custom";
import { useParams } from "react-router";
import { AppRepositories } from "../../apis/api-repositories";
import { ActivityDto, ContactTypesEnum, CreateContactCustomerDto, NewsDto, RecruitmentDto } from "../../apis/general-client";
import moment from "moment";
import { appLoading, currentLanguage, shuffleArray } from "../../helpers/utils";
import { useTranslation } from "react-i18next";
import HeaderBar from "../../components/header-bar";
import FooterSite from "../../components/footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Alert, Button, Modal, Snackbar } from "@mui/material";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import { CustomTextField } from "../../components/custom-text-field";
import { MuiTelInput } from "mui-tel-input";
import PhoneIcon from '@mui/icons-material/Phone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FacebookShareButton, FacebookIcon } from "react-share";


export type DTemplate = {
  match?: any;
  title?: React.ReactNode;
  content?: React.ReactNode;
  time?: React.ReactNode;
  isAdmin?: React.ReactNode;
};

function DetailTemplate(props: DTemplate) {
  const { t } = useTranslation();
  const [news, setNews] = React.useState<NewsDto>();
  const [job, setJob] = useState<RecruitmentDto>();
  const [activity, setActivity] = useState<ActivityDto>();
  const [dataRelate, setDataRelate] = useState<any[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sendStatus, setSendStatus] = useState<boolean>();
  const { id } = useParams();
  const location = useLocation() as any;
  const navigate = useNavigate();
  const parentPage = {
    isNews: location.state === 'news',
    isRecruit: location.state === 'recruit',
    isActivities: location.state.type === 'activities'
  }
  const currentLanguageCode = Cookies.get("i18next") || "vi";
  const viLanguage = currentLanguageCode === 'vi';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      if (id && parentPage.isNews) {
        let data = await AppRepositories.getNewById(id);
        if (data?.categoryId) {
          let newsByCategory = await AppRepositories.getNewsByCategory(data.categoryId);
          let temp = newsByCategory.filter(v => v.id !== id);
          let tempShuffle = shuffleArray([...temp]);
          setDataRelate(tempShuffle);
        }
        setNews(data);
      }
      if (id && parentPage.isRecruit) {
        let data = await AppRepositories.getJobById(id);
        if (data.category?.id) {
          let jobs = await AppRepositories.getJobByCategory(data.category?.id);
          let temp = jobs.filter(v => v.id !== id);
          let tempShuffle = shuffleArray([...temp]);
          setDataRelate(tempShuffle);
        }
        setJob(data);
      }
      if (id && parentPage.isActivities) {
        let data = await AppRepositories.getActivitiesById(id);
        if (data?.activityCategoryId) {
          let activities = await AppRepositories.getActivitiesByCategory(data.activityCategoryId);
          let temp = activities.filter(v => v.id !== id);
          let tempShuffle = shuffleArray([...temp]);
          setDataRelate(tempShuffle);
        }
        setActivity(data);
      }
    };
    getData();
  }, [id]);

  const handleFile = (value: any) => {
    const fileInput = value.target.files;
    if (fileInput && fileInput[0]) {
      setSelectedFile(fileInput[0]);
    } else {
      setSelectedFile(undefined);
    }
  }

  const submitCV = async () => {
    if(selectedFile) {
      appLoading.show();
      let file = await AppRepositories.uploadFile(selectedFile, selectedFile?.name) as any;
      if (file) {
        const model = {
          customerName: name,
          customerPhone: phone,
          customerEmail: mail,
          attachFile: file.fileUrl,
          contactType: ContactTypesEnum.Recruitment
        } as CreateContactCustomerDto;
        const upload = await AppRepositories.uploadCV(model);
        if (upload.succeeded) {
          setName('');
          setPhone('');
          setMail('');
          setSelectedFile(undefined);
          setOpenModal(false);
          setSendStatus(upload.succeeded);
        }
      }
      appLoading.dismiss();
    }
  }

  const handleBackToCategory = () => {
    if (parentPage.isNews) {
      navigate('/news', {state: news?.categoryId})
    }
    if (parentPage.isRecruit) {
      navigate('/hire', {state: '2'})
    }
    if (parentPage.isActivities) {
      if (location.state.industry === 4) {
        navigate('/trading')
      } else {
        navigate('/business-fields', {state: {industry: location.state.industry.toString()}})
      }
    }
  }

  return (
    <div className="detail-template">
      <HeaderBar navFromNavigate={parentPage.isNews ? '5' : parentPage.isRecruit ?  '6' : ''} />
      <div className="breadcrumb">
          <Link className="pl8" to={"/"}>{t("homePage")}</Link>
          <KeyboardArrowRightIcon />
          <div onClick={() => handleBackToCategory()} className="pointer">
            <CustomText className="deepblue">
          {parentPage.isNews && (viLanguage ? news?.category?.categoryName : news?.category?.categoryNameEN)}
          {parentPage.isRecruit && (viLanguage ? job?.category?.categoryNameVi : job?.category?.categoryNameEn)}
          {parentPage.isActivities && (viLanguage ? activity?.activityCategory?.categoryName : activity?.activityCategory?.categoryNameEN)}
            </CustomText>
          </div>
          <KeyboardArrowRightIcon />
          <CustomText className="title">
          {parentPage.isNews && (viLanguage ? news?.title : news?.titleEN)}
          {parentPage.isRecruit && (viLanguage ? job?.jobTitle : job?.jobTitleEN)}
          {parentPage.isActivities && (viLanguage ? activity?.titleVi : activity?.titleEn)}
          </CustomText>
      </div>
      <div className="detail">
        <CustomText className="title-detail textCenter semiBold deepblue fontXL">
          {parentPage.isNews && (viLanguage ? news?.title : news?.titleEN)}
          {parentPage.isRecruit && (viLanguage ? job?.jobTitle : job?.jobTitleEN)}
          {parentPage.isActivities && (viLanguage ? activity?.titleVi : activity?.titleEn)}
        </CustomText>
        <div className="time-detail dFlex justifyCenter">
          <div className="dFlex pt24 pb16">
            <div className="semiBold pr12">{news?.createdBy}</div>
            <div className="circle gray pr8">{<FiberManualRecordIcon />}</div>
            <div className="gray pr12">
              {parentPage.isNews && news?.created
                ? moment(news?.created).format("DD-MM-YYYY HH:mm")
                : ""}
              {parentPage.isRecruit && job?.created
                ? moment(job?.created).format("DD-MM-YYYY HH:mm")
                : ""}
              {parentPage.isActivities && activity?.created
                ? moment(activity?.created).format("DD-MM-YYYY HH:mm")
                : ""}
            </div>
            <div className="circle gray pr8">{<FiberManualRecordIcon />}</div>
            <div className="gray">{<ShareIcon />}</div>
            <FacebookShareButton
              url={window.location.href}
            >
              <FacebookIcon round size={24} />
            </FacebookShareButton>
          </div>
        </div>
        {parentPage.isNews && news && (<div
          className="content-detail"
          dangerouslySetInnerHTML={{
            __html:
              news?.content && viLanguage
                ? news.content
                : news?.contentEN ?? "",
          }}
        ></div>)}
        {parentPage.isRecruit && job && (
          <>
          <CustomText className="bold">{t('jobRequiment')}</CustomText>
            <div
              className="content-detail"
              dangerouslySetInnerHTML={{
                __html: job?.requirements && viLanguage
                  ? job.requirements
                  : job?.requirementsEN ?? "",
              }}>
            </div>
            <CustomText className="bold">{t('jobDescription')}</CustomText>
            <div
              className="content-detail"
              dangerouslySetInnerHTML={{
                __html: job?.responsibilities && viLanguage
                  ? job.responsibilities
                  : job?.responsibilitiesEN ?? "",
              }}>

            </div>
            <CustomText className="bold">{t('salaryAndBenefit')}</CustomText>
            <div
              className="content-detail"
              dangerouslySetInnerHTML={{
                __html: job?.salaryAndBenefits && viLanguage
                  ? job.salaryAndBenefits
                  : job?.salaryAndBenefitsEN ?? "",
              }}>
            </div>
            <div className="dFlex w100 justifyCenter">
               <Button onClick={() => setOpenModal(true)} variant="contained" color="error" className="white">{t('applyNow')}</Button>
            </div>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="modal-detail">
                <div className="content">
                  <CustomText className="textCenter mb12 fontL bold">{parentPage.isRecruit && (viLanguage ? job?.jobTitle : job?.jobTitleEN)}</CustomText>
                  <CustomTextField
                    className="contact-input"
                    label=""
                    iconStart={<PeopleOutlinedIcon />}
                    inputProps={{
                      value: name,
                      placeholder: t('enterYourName'),
                    }}
                    type="text"
                    onChange={(e) => setName(e.target.value)}>
                  </CustomTextField>
                  <CustomTextField
                    className="contact-input"
                    label=""
                    iconStart={<EmailIcon />}
                    inputProps={{
                      value: mail,
                      placeholder: t('enterYourEmail'),
                    }}
                    type="text"
                    onChange={(e) => setMail(e.target.value)}>
                  </CustomTextField>
                  <CustomTextField
                    className="contact-input"
                    label=""
                    iconStart={<PhoneIcon />}
                    inputProps={{
                      value: phone,
                      placeholder: t('enterYouPhone'),
                    }}
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}>
                  </CustomTextField>
                  {selectedFile && <CustomText className="mb12">{selectedFile.name}</CustomText>}
                  <Button variant="contained" component="label" className="mb12">
                    {t("uploadCV")}
                    <input
                      onChange={(e) => handleFile(e)}
                      type="file"
                      accept="application/pdf"
                      hidden
                    />
                  </Button>
                  <Button onClick={() => submitCV()} variant="contained" color="success" component="label">
                      {t('send')}
                  </Button>
                </div>
              </div>
            </Modal>
            {sendStatus && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={sendStatus} autoHideDuration={2000} onClose={() => setSendStatus(false)}>
              <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                {t('sendSuccess')}
              </Alert>
            </Snackbar>}
          </>
        )}
        {parentPage.isActivities && activity && (
        <><div
            className="content-detail"
            dangerouslySetInnerHTML={{
              __html: activity?.contentVi && viLanguage
                ? activity.contentVi
                : activity?.contentEn ?? "",
            }}
          ></div></>
        )}
      </div>
      <div className="pt32 detail">
        {dataRelate && dataRelate.length > 0 &&<div className="relate pt24 pb24 deepblue">{t("relateContent")}</div>}
        {parentPage.isNews && dataRelate && dataRelate.slice(0, 3).map((item: any, index: number) => (
          <Link to={"/detail/" + item.id} state={'news'} key={index}>
            <RelateTemplate
            shortDescription={viLanguage ? item.descriptions : item.descriptionsEN}
            time={moment(item.created).format("DD-MM-YYYY HH:mm")}
            title={viLanguage ? item.title : item.titleEN}
            img={item.imageUrl}
          ></RelateTemplate>
          </Link>

        ))}
        {parentPage.isRecruit && dataRelate && dataRelate.slice(0, 3).map((item: any, index: number) => (
          <Link to={"/detail/" + item.id} state={'recruit'}  key={index}>
            <RelateTemplate
            shortDescription={viLanguage ? item.responsibilities : item.responsibilitiesEN}
            time={moment(item.created).format("DD-MM-YYYY HH:mm")}
            title={viLanguage ? item.jobTitle : item.jobTitleEN}
            img={item.imageUrl}
          ></RelateTemplate>
          </Link>
          
        ))}
        {parentPage.isActivities && dataRelate && dataRelate.slice(0, 3).map((item: any, index: number) => (
          <Link to={"/detail/" + item.id} state={{type: 'activities', industry: location.state.industry}} key={index}>
            <RelateTemplate
            shortDescription={viLanguage ? item.descriptionsVi : item.descriptionsEn}
            time={moment(item.created).format("DD-MM-YYYY HH:mm")}
            title={viLanguage ? item.titleVi : item.titleEn}
            img={item.coverImage}
          ></RelateTemplate>
          </Link>

        ))}
      </div>
      <FooterSite />

    </div>
  );
}

export default DetailTemplate;
