import { Request, Response } from "express";
import youtubedl from "youtube-dl-exec";

/**
 * This TypeScript function handles a request to extract the audio from a YouTube video URL and returns
 * the URL of the extracted audio.
 *
 * Args:
 *   req (Request): The `req` parameter is an object representing the HTTP request made to the server.
 * It contains information such as the request method, headers, URL, and body.
 *   res (Response): The `res` parameter is the response object that is used to send a response back to
 * the client making the request. It contains methods such as `status()` to set the HTTP status code,
 * `send()` to send a response body, and `json()` to send a JSON response.
 */
export const audioHandler = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    youtubedl(`${url}`, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    }).then((output) => {
      const audio = output.formats.find((format) => format.format_id === "140");
      res.status(200).send(audio?.url);
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
