import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  const { pathname, query } = parse(req.url || "/", true);
  const {
    theme,
    image,
    uawValue,
    uawChange,
    transactionsValue,
    transactionsChange,
    volumeValue,
    volumeChange,
    balanceValue,
    balanceChange,
  } = query || {};

  const arr = (pathname || "/").slice(1).split(".");
  let dappSlug = "";

  if (arr.length === 0) {
    dappSlug = "";
  } else if (arr.length === 1) {
    dappSlug = arr[0];
  } else {
    dappSlug = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    dappSlug: decodeURIComponent(dappSlug),
    theme: theme === "dark" ? "dark" : "light",
    image,
    uawValue,
    uawChange,
    transactionsValue,
    transactionsChange,
    volumeValue,
    volumeChange,
    balanceValue,
    balanceChange,
  };
  return parsedRequest;
}
