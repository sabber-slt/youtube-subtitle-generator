import { Router } from "express";
import { subtitleHandler } from "./subtitle.controller";
import { dlSubtitleHandler } from "./downloadSubtitle";

const router = Router();

router.post("/subtitles", subtitleHandler);
router.get("/subtitles/:id", dlSubtitleHandler);

export default router;
