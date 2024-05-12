import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "@/db";
import transporter from "@/mail";

export async function sendVerificationEmail(email: string, code: string) {
  // Send the email
  const message = {
    from: "martine.bogan@ethereal.email",
    to: email,
    subject: `Verifieer je emailadres`,
    text: `Beste ${email}, je verificatiecode is ${code}`,
    html: `
        <p>Verifieer alsjeblieft je emailadres door de volgende code in te voeren:</p>
        <h1>${code}</h1>
        <p>Deze code verloopt over 15 minuten. Deze code is vertrouwelijk, deel deze niet met anderen.</p>
    `,
  };

  await transporter.sendMail(message);
}

export async function generateVerificationCode(userId: string, email: string) {
  // Remove any previous verification tokens
  await prisma.emailConfirmation.deleteMany({
    where: {
      userId,
    },
  });

  // Generate a new verification token
  const token = generateRandomString(6, alphabet("0-9", "A-Z"));

  // Generate an expiry date for the token
  const expiry = createDate(new TimeSpan(15, "m"));

  // Save the verification token
  await prisma.emailConfirmation.create({
    data: {
      userId,
      email,
      code: token,
      expiresAt: expiry,
    },
  });

  return token;
}
