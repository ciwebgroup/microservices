import { Request, Response } from "express";
import sgMail from  "@sendgrid/mail";
import axios from "axios";

const scoreThreshold = parseFloat(process.env.SCORE_THRESHOLD || '0.5') || 0.5;
const secret = process.env.RECAPTCHA_SECRET_KEY || '';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export const handleVerify = async (req: Request, res: Response) => {
  try {
    const { token, formData } = req.body;

    if (!token) {
      return res.status(400).send("Token is required");
    }

    const remoteip: string = (Array.isArray(req.headers['x-forwarded-for']) 
    ? req.headers['x-forwarded-for'][0] 
    : req.headers['x-forwarded-for']) 
    || (Array.isArray(req.headers['x-real-ip']) 
    ? req.headers['x-real-ip'][0] 
    : req.headers['x-real-ip']) 
    || "";

    console.log('New Request From: ', remoteip);

    // Perform ReCAPTCHA verification
    const verificationResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret,
        response: token,
        remoteip
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const verificationData = verificationResponse.data;

    console.log('verificationData', verificationData);

    if (verificationData.success && verificationData.score >= scoreThreshold) {
      

      // @TODO:
      // 1. Agency Analytics
      // 2. Send email to user
      // 3. Send to What Convertsaa
      // 4. Send go Google Analytics as Conversion

      // const forwardData = forwardResponse.data;

      if (formData.recipient && formData.subject && formData.sender){
        await sgMail.send({
          to: formData.recipient,
          from: formData.sender,
          subject: formData.subject,
          text: formData.comments,
          html: `<p>${formData.comments}</p>`
        })
      }

      // Return the response from the endpoint
      res.status(200).json({
        // formResponse: forwardData,
        threshold: scoreThreshold,
        details: verificationData,
      });
    } else {
      // Handle low-score or verification failure
      res.status(400).json({
        error: "Low ReCAPTCHA score or verification failed",
        threshold: scoreThreshold,
        details: verificationData,
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};
