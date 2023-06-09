import { Request, Response } from "express";

export const dlSubtitleHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const filepaths = `./subtitles/${id}`;
    res.download(filepaths);
  } catch (error) {
    res.status(404).send("File not found");
  }
};
