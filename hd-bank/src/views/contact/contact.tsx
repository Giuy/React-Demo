import { useTranslation } from "react-i18next";
import { CustomText } from "../../components/styled-custom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HeaderBar from "../../components/header-bar";
import { useEffect, useState } from "react";
import FooterSite from "../../components/footer";
import ContactBanner from "../../assets/images/contact-banner.png"
import Logo from "../../assets/images/logo.png"
import { CustomTextField } from "../../components/custom-text-field";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import { MuiTelInput } from "mui-tel-input";
import { Alert, Button, InputAdornment, Snackbar } from "@mui/material";
import { AppRepositories } from "../../apis/api-repositories";
import { appLoading, currentLanguage } from "../../helpers/utils";
import PhoneIcon from '@mui/icons-material/Phone';
import { CommonConfigDto, ContactTypesEnum } from "../../apis/general-client";

function Contact() {
    const { t } = useTranslation();
    const [name, setName] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [sendStatus, setSendStatus] = useState<boolean>();
    const [error, setError] = useState<boolean>();
    const [admin, setAdmin] = useState<CommonConfigDto>();

    useEffect(() => {
        async function fetchData() {
            const admin = await AppRepositories.getCommonConfig();
            setAdmin(admin);
        }
        fetchData();

        window.scrollTo(0, 0); 
    }, []);

    const handleSend = async () => {
        const nameRule = name.length > 0;
        const messageRule = message.length <= 3000;
        const phoneRule = phone.length === 10 || phone.length === 0;
        const emailRule = mail.includes('@');
        if (name && mail && message && nameRule && messageRule && phoneRule && emailRule) {
            appLoading.show();
            setError(false);
            const res = await AppRepositories.sendMessage({
                customerName: name,
                customerPhone: phone,
                customerEmail: mail,
                content: message,
                receiveStatus: true,
                contactType: ContactTypesEnum.Contact
            });
            if (res!.succeeded) {
                setSendStatus(res!.succeeded);
                setName('');
                setPhone('');
                setMail('');
                setMessage('');
            }
            appLoading.dismiss();
        } else {
            setError(true);
        }

    }

    const handlePhone = (value: string) => {
        setPhone(value)
    }

    // const data = [
    //     {
    //         title: "TRỤ SỞ HỒ CHÍ MINH",
    //         address: "Tầng 3, 4 nhà số 519 Nguyễn Thị Định, P. Cát Lái, TP. Thủ Đức, TP. HCM ",
    //         phone: "028.37421280"
    //     },
    // ]

    return (
        <div className="w100">
            <HeaderBar navFromNavigate="7" typeBanner={7}/>
            <div className="contact-container">

                <CustomText className="semiBold dFlex justifyCenter mb20 mt20">{t('contactTitle')}</CustomText>
                <div className="contact-content">
                    <div className="contact-address">
                        <div className="address">
                            <CustomText className="title">TRỤ SỞ HỒ CHÍ MINH</CustomText>
                            <CustomText>Địa chỉ: <span>{currentLanguage.isEN 
                                ? (admin?.addressEn ? admin?.addressEn : "") 
                                : (admin?.addressVi ? admin?.addressVi : "")}</span></CustomText>
                            <CustomText>Điện thoại: <span>{admin?.hotLine ? admin?.hotLine : ""}</span></CustomText>
                            <Button color="error" endIcon={<NavigateNextIcon />}>Xem địa chỉ</Button>
                        </div>
                    </div>
                    <div className="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2907194983386!2d106.7003604!3d10.7890314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4aacfb708b%3A0xab8767ed5c89168a!2zMTkgTmd1eeG7hW4gxJDDrG5oIENoaeG7g3UsIMSQYSBLYW8sIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1sen!2s!4v1668137236540!5m2!1sen!2s" width="600" height="450" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            
                    </div>
                </div>
            </div>
            <div className="contact-info">
                <div className="contact-left">
                    <div className="back-ground">
                        <img src={ContactBanner} alt="" className="w100 h100" />
                    </div>
                    <div className="content">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                        <CustomText className="greenLight">{t('contactHDAMC')}</CustomText>
                        <CustomText className="cyan">{t('contactBy')}</CustomText>
                        <CustomText className="deepblue">{t('professionalSpecialist')}</CustomText>
                    </div>
                </div>
                <div className="contact-right">
                    <div className="contact-form">
                        <CustomText className="fontXL mb12 deepblue bold">{t('contact')}</CustomText>
                        <CustomTextField
                            className="contact-input"
                            label=""
                            iconStart={<PeopleOutlinedIcon />}
                            inputProps={{
                                value: name,
                                placeholder: t('enterYourName'),
                            }}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        ></CustomTextField>

                        <CustomTextField
                            className="contact-input"
                            label=""
                            iconStart={<EmailIcon />}
                            inputProps={{
                                value: mail,
                                placeholder: t('enterYourEmail'),
                            }}
                            type="text"
                            onChange={(e) => setMail(e.target.value)}
                        ></CustomTextField>
                        <CustomTextField
                            className="contact-input"
                            label=""
                            iconStart={<PhoneIcon />}
                            inputProps={{
                                value: phone,
                                placeholder: t('enterYouPhone'),
                            }}
                            type="number"
                            onChange={(e) => {setPhone(e.target.value)}}
                        ></CustomTextField>
                        <CustomTextField
                            className="contact-input"
                            label=""
                            iconStart={<MessageIcon />}
                            inputProps={{
                                value: message,
                                placeholder: t('yourMessage'),
                            }}
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                        ></CustomTextField>
                        {error && <div className="warning w100 mb12">
                            <CustomText className="red">{t('enterRequiredField')}</CustomText>
                            <CustomText className="red">{t('nameHasSpecialCharacter')}</CustomText>
                            <CustomText className="red">{t('phoneNumberCharacter')}</CustomText>
                            <CustomText className="red">{t('emailMisMatch')}</CustomText>
                            <CustomText className="red">{t('messageOver')}</CustomText>
                        </div>}
                        <Button onClick={handleSend} className="btn" variant="contained" color="success">{t('send')}</Button>
                        {sendStatus && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={sendStatus} autoHideDuration={2000} onClose={() => setSendStatus(false)}>
                            <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                                {t('sendSuccess')}
                            </Alert>
                        </Snackbar>}
                    </div>
                </div>
            </div>
            <FooterSite />
        </div>


    );
}

export default Contact
