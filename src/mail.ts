import { createTransport } from "nodemailer";
import { TransportOptions } from "nodemailer";

const user = process.env.ETHEREAL_USER;
const pass = process.env.ETHEREAL_PASS;
const domain = process.env.DOMAIN;
const key = process.env.DKIM_KEY;

const production = process.env.NODE_ENV === "production";

const transporter = createTransport({
  host: production ? "localhost" : "smtp.ethereal.email",
  port: production ? 25 : 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user,
    pass,
  },
  // Only add DKIM settings in production
  ...(production && {
    dkim: {
      domainName: domain,
      keySelector: "default",
      privateKey: key,
    },
  }),
} as TransportOptions);

export default transporter;
