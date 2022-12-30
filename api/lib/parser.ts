import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  const { pathname, query } = parse(req.url || "/", true);
  const {
    image,
    uawValue,
    uawChange,
    transactionsValue,
    transactionsChange,
    volumeValue,
    volumeChange,
    balanceValue,
    balanceChange,
    updatedAt,
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
    image,
    uawValue,
    uawChange,
    transactionsValue,
    transactionsChange,
    volumeValue,
    volumeChange,
    balanceValue,
    balanceChange,
    updatedAt,
  };
  return parsedRequest;
}
