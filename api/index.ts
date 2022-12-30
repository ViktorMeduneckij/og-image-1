import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./lib/chromium";
import { parseRequest } from "./lib/parser";
import { getHtml } from "./lib/template";
//TODO change this.
const isDev = true;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const parsedReq = parseRequest(req);

  const html = getHtml(parsedReq);

  const file = await getScreenshot(html, isDev);
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.end(file);
}
