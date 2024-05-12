"use server";

const verifyToken = async (token: string) => {
  const secretKey = process.env.SECRET_KEY_RECAPTCHA;

  const formData = `secret=${secretKey}&response=${token}`;
  let res;

  try {
    res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
  } catch (e) {
    return {
      success: false,
      message: "Er is iets misgegaan",
    };
  }

  const data = await res.json();
  if (data && data?.success && data?.score > 0.5) {
    return {
      score: data.score,
      success: true,
      message: "Recaptcha is succesvol",
    };
  } else {
    return {
      success: false,
      message: "Recaptcha is niet succesvol",
    };
  }
};

export default verifyToken;
