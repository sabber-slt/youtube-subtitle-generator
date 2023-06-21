import { Request, Response } from "express";
import youtubedl from "youtube-dl-exec";

// This function downloads a 720p video from a given URL using the youtubedl library and returns the URL of the downloaded video.
export const dlVideo720Handler = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    youtubedl(`${url}`, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    }).then((output) => {
      const q720 = output.formats.find((format) => format.format_id === "22");

      res.status(200).send(q720?.url);
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// This function downloads a 1080p video from a given URL using the youtubedl library and returns the URL of the downloaded video.
export const dlVideo1080Handler = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    youtubedl(`${url}`, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
    }).then((output) => {
      const q1080 = output.formats.find((format) => format.format_id === "137");
      res.status(200).send(q1080?.url);
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
