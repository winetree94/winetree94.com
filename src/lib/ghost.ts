import GhostContentAPI from "@tryghost/content-api";
import { GHOST_API_KEY } from "astro:env/server";

export const ghost = new GhostContentAPI({
  url: "https://cms.winetree94.com",
  key: GHOST_API_KEY,
  version: "v6.0",
});
