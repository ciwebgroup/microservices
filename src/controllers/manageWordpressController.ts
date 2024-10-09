import { Request, Response } from "express";

export const handleAction = async (req: Request, res: Response) => {
  try {
    // Get Variables from POST/GET/Whatever
    // const { token, formData, config } = req.body

    // Return the response from the endpoint
    res.status(200).json({
      // formResponse: forwardData,
      message: "Cool"
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: (error as Error).message,
    });
  }
};
