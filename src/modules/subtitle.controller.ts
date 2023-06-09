import { Request, Response } from "express";
import fs from "fs";
import { setCORS } from "google-translate-api-browser";
import * as deepl from "deepl-node";
import dotenv from "dotenv";
var subsrt = require("subsrt");
import { Subtitle } from "../utils/types";

dotenv.config();

// for long videos use deepl api
const authKey = `${process.env.DEEPL_AUTH_KEY}`;
const translator = new deepl.Translator(authKey);

const translate = setCORS("");

type Props = {
  videoId: Subtitle[];
};

export const subtitleHandler = async (req: Request, res: Response) => {
  const { url } = req.body;

  const videoIds = url.match(/v=([^&]+)/)[1];
  try {
    const transcriptData = await fetch(
      `https://youtube-browser-api.netlify.app/transcript?videoId=${videoIds}`
    );
    const transcript = await transcriptData.json();

    if (!transcript.videoId) {
      res.send(
        "This video does not have subtitles. Please try another video. "
      );
    } else {
      const data: Props = transcript;
      const text = data?.videoId?.map((item) => item.text).join("\n");
      try {
        // const getTranslate = await translator.translateText(text, null, 'fa')          <******** if you use Deepl api uncomment thease two lines and comment the next line
        //  const result = getTranslate.text;
        const getTranslate = await translate(text, {
          to: "fa",
        });
        const result = getTranslate.text;

        const item = data?.videoId?.map((item, index) => {
          return {
            start: item.offset,
            end: item.offset + item.duration,
            text: result.split("\n")[index],
          };
        });

        const options = { format: "vtt" };
        const content = subsrt.build(item, options);
        const name = Date.now() + ".vtt";

        fs.writeFileSync(`./subtitles/${name}`, content);
        res.status(200).send({
          url: `http://localhost:5000/subtitles/${name}`,
        });
      } catch (error) {
        res.send(error);
      }
    }
  } catch (e: any) {
    console.log(e);
    res.send("This video does not have subtitles. Please try another video. ");
  }
};
