import { Roboto, Montserrat } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});
