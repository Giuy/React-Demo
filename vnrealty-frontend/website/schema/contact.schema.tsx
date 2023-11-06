import * as yup from "yup";

const ContactSchema = yup.object().shape({
  customerName: yup.string().required("Full name is required"),
  customerEmail: yup.string().email("Email is invalid").required("Email is required"),
  customerPhone: yup.string().required("Phone Number is required"),
  customerAddress: yup.string().required("Address is required"),
  content: yup.string().required("Content is required"),
});

export default ContactSchema;
