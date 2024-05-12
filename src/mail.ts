import { createTransport } from "nodemailer";

const user = process.env.ETHEREAL_USER;
const pass = process.env.ETHEREAL_PASS;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

export default transporter;
