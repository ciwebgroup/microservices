import { Request, Response } from "express";
import axios from "axios";

const scoreThreshold = parseFloat(process.env.SCORE_THRESHOLD || '0.5') || 0.5;

export const handleVerify = async (req: Request, res: Response) => {
  try {
    const { token, formData } = req.body;

    if (!token) {
      return res.status(400).send("Token is required");
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    // Perform ReCAPTCHA verification
    const verificationResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: secretKey || "",
        response: token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const verificationData = verificationResponse.data;

    if (verificationData.success && verificationData.score >= scoreThreshold) {
      const endpointUrl = process.env.ENDPOINT_URL;

      // Convert formData to URL-encoded string
      const formBody = new URLSearchParams(formData).toString();

      // Forward the form data to the specified endpoint
      const forwardResponse = await axios.post(endpointUrl || "", formBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const forwardData = forwardResponse.data;

      // Return the response from the endpoint
      res.status(200).json({
        formResponse: forwardData,
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
