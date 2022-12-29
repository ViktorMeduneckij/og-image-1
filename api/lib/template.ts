import { ParsedRequest } from "./types";
import { readFileSync } from "fs";
import { sanitizeHtml } from "./sanitizer";
// const twemoji = require("twemoji");
// const twOptions = { folder: "svg", ext: ".svg" };
// const emojify = (text: string) => twemoji.parse(text, twOptions);

const roboto = readFileSync(
  `${__dirname}/../fonts/Roboto-Regular.woff2`
).toString("base64");

const robotoBold = readFileSync(
  `${__dirname}/../fonts/Roboto-Bold.woff2`
).toString("base64");

const poppins = readFileSync(
  `${__dirname}/../fonts/Poppins-Regular.woff2`
).toString("base64");

const poppinsBold = readFileSync(
  `${__dirname}/../fonts/Poppins-Bold.woff2`
).toString("base64");

function getCss(theme: string) {
  let background = "white";
  let foreground = "black";
  let radial = "lightgray";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
    radial = "dimgray";
  }
  return `
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${roboto})  format("woff2");
      }

      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${robotoBold})  format("woff2");
      }

      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${poppins})  format("woff2");
      }

      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${poppinsBold})  format("woff2");
      }

    body {
        background: ${background};
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto', sans-serif;
    }

    .logo {
        border-radius: 37px;
    }

    .headline {
        display: flex;
        align-items: center;
    }

    .headline-content {
        margin-left: 39px;
    }

    .heading {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 60px;
        color: #fff;
        text-transform: capitalize;
    }

    .body {
        display: flex;
        align-items: center;
        margin-top: 35px;
    }

    .stats {
        padding: 19px;
        background: #12223E;
        border-radius: 9px;
        text-align: left;
        width: 236px;
        margin-right: 19px;
    }

    .stats.no-margin-right {
        margin-right: 0;
    }

    .stats-name {
        color: #B3BBCC;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .stats-value {
        font-weight: 700;
        font-size: 33px;
        letter-spacing: -0.025em;
        color: #FFFFFF;
        margin-bottom: 15px;
    }

    .stats-change {
        color: #76B683;
        letter-spacing: -0.025em;
        font-weight: 500;
        font-size: 21px;
    }
`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    dappSlug,
    theme,
    image,
    // uawValue,
    // uawChange,
    // transactionsValue,
    // transactionsChange,
    // volumeValue,
    // volumeChange,
    // balanceValue,
    // balanceChange,
  } = parsedReq;

  const html = `<!DOCTYPE html>
  <html>
      <meta charset="utf-8">
      <title>Generated Image</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          ${getCss(theme)}
      </style>
      <body>
      <div class="spacer">
          <div>
            <div class="content">
            <div class="headline">
                <div class="logo-wrapper">
                    ${getImage(image)}
                </div>
                <div class="headline-content">
                    <div class="heading">
                        ${dappSlug.replace(/-/g, " ")}
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="stats">
                    <div class="stats-name">UAW</div>
                    <div class="stats-value">10000</div>
                    <div class="stats-change">3.28%</div>
                </div>
                <div class="stats">
                    <div class="stats-name">Transactions</div>
                    <div class="stats-value">200</div>
                    <div class="stats-change">9%</div>
                </div>
                <div class="stats">
                    <div class="stats-name">Volume</div>
                    <div class="stats-value">$222,3K</div>
                    <div class="stats-change">67%</div>
                </div>
                <div class="stats no-margin-right">
                    <div class="stats-name">Balance</div>
                    <div class="stats-value">$321,3M</div>
                    <div class="stats-change">17%</div>
                </div>
            </div>
          </div>
        </div>
      </body>
  </html>`;

  return html;
}

function getImage(src: string, width = "210", height = "210") {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${src}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}
