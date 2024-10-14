import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import axios from "axios";
import decodeEmail from "../utils/decodeEmail";

const scoreThreshold = parseFloat(process.env.SCORE_THRESHOLD || "0.5") || 0.5;
const secret = process.env.RECAPTCHA_SECRET_KEY || "";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const handleVerify = async (req: Request, res: Response) => {
  try {
    const { token, formData, config } = req.body;

    if (!token) {
      return res.status(400).send("Token is required");
    }

    const remoteip: string =
      (Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"]) ||
      (Array.isArray(req.headers["x-real-ip"])
        ? req.headers["x-real-ip"][0]
        : req.headers["x-real-ip"]) ||
      "";

    console.log("New Request From: ", remoteip);

    // Perform ReCAPTCHA verification
    const verificationResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret,
        response: token,
        remoteip,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const verificationData = verificationResponse.data;

    console.log("verificationData", verificationData);

    if (verificationData.success && verificationData.score >= scoreThreshold) {

      console.log(config);
      if (
        config["notification-recipient"] &&
        config["notification-subject"] &&
        (config["notification-sender"] || formData.email)
      ) {
        /**
         * Sends Email Notification(s)
         */
        const emailPayload = {
          to: decodeEmail(config["notification-recipient"]),
          from: config["notification-sender"] ?? formData.email,
          subject: config["notification-subject"],
          text: formData.comments,
          html: Object.entries(formData)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join(""),
        };

        console.log("emailPayload", emailPayload);
        const sgResponse = await sgMail.send(emailPayload);
        console.log(sgResponse);

        /**
         * Sends to What Converts
         */
        if (config["wc-profileid"] && config["wc-profileid"].length) {

          const wcPayload = new URLSearchParams({
            'profile_id': config["wc-profileid"],
            'send_notification': "false",
            'lead_type': "web_form",
            'ip_address': remoteip,
            'wc_client_current': config["wc-cookie"] ?? null,
            'additional_fields[contact_name]': formData.name,
            'additional_fields[lead_content]': formData.comments,
            'email_address': formData.email,
            'phone_number': formData.phone,
            'lead_content': formData.comments
          });

          const wcResponse = await axios.post(
            "https://app.whatconverts.com/api/v1/leads",
            wcPayload.toString(), {
              auth: {
                username: process.env.WC_API_TOKEN || "",
                password: process.env.WC_API_SECRET || "",
              }
            }
          );
          console.log("wcResponse", wcResponse);
        }
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
