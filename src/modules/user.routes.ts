import { Router } from "express";
import { subtitleHandler } from "./subtitle.controller";
import { dlSubtitleHandler } from "./downloadSubtitle";
import { dlVideo720Handler, dlVideo1080Handler } from "./downloadVideo";
import { audioHandler } from "./downloadAudio";

const router = Router();

router.post("/subtitles", subtitleHandler);
router.post("/video720", dlVideo720Handler);
router.post("/video1080", dlVideo1080Handler);
router.post("/audio", audioHandler);
router.get("/subtitles/:id", dlSubtitleHandler);

export default router;
