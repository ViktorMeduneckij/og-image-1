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

function getCss() {
  let background = "black";

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
        display: flex;
        height: 100vh;
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

    .content {
      background: #081936;
      border-radius: 16px;
      padding: 60px 60px 52px 60px;
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

    .stats-change, 
    .stats-change-negative {
        color: #76B683;
        letter-spacing: -0.025em;
        font-weight: 500;
        font-size: 21px;
    }

    .stats-change-negative {
      color: #DF5B55;
    }

    .footer {
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .updated-at {
      font-weight: 400;
      color: #B3BBCC;
    }
`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    dappSlug,
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
  } = parsedReq;

  const html = `<!DOCTYPE html>
  <html>
      <meta charset="utf-8">
      <title>Generated Image</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
          ${getCss()}
      </style>
      <body>
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
                    <div class="stats-value">${uawValue || "-"}</div>
                    <div class=${
                      uawChange > 0 ? "stats-change" : "stats-change-negative"
                    }>${uawChange ? `${uawChange}%` : "-"}</div>
                </div>
                <div class="stats">
                    <div class="stats-name">Transactions</div>
                    <div class="stats-value">${transactionsValue || "-"}</div>
                    <div class=${
                      transactionsChange > 0
                        ? "stats-change"
                        : "stats-change-negative"
                    }>${
    transactionsChange ? `${transactionsChange}%` : "-"
  }</div>
                </div>
                <div class="stats">
                    <div class="stats-name">Volume</div>
                    <div class="stats-value">${volumeValue || "-"}</div>
                    <div class=${
                      volumeChange > 0
                        ? "stats-change"
                        : "stats-change-negative"
                    }>${volumeChange ? `${volumeChange}%` : "-"}</div>
                </div>
                <div class="stats no-margin-right">
                    <div class="stats-name">Balance</div>
                    <div class="stats-value">${balanceValue || "-"}</div>
                    <div class=${
                      balanceChange > 0
                        ? "stats-change"
                        : "stats-change-negative"
                    }>${balanceChange ? `${balanceChange}%` : "-"}</div>
                </div>
            </div>
            <div class="footer">
              <svg xmlns="http://www.w3.org/2000/svg" width="243" height="40" viewBox="0 0 126.676 20.376" fill="#fff"><path d="M22.615 9.167L17.905 1a2.036 2.036 0 00-1.753-1H6.731a2.025 2.025 0 00-1.753 1.012L.268 9.176a2.043 2.043 0 000 2.024l4.71 8.164a2.015 2.015 0 001.753 1.012h9.42a2.025 2.025 0 001.753-1.012l4.71-8.164a2.059 2.059 0 00.001-2.033zm-11.174 8.025v-1.4a5.609 5.609 0 10-5.609-5.609 5.539 5.539 0 001.143 3.384l1.012-.986a4.16 4.16 0 01-.75-2.4 4.213 4.213 0 114.213 4.213v-1.4a2.809 2.809 0 10-2.817-2.809 2.765 2.765 0 00.375 1.4l1.047-1.021a1.343 1.343 0 01-.052-.375 1.439 1.439 0 111.439 1.439 1.3 1.3 0 01-.41-.07l-3.62 3.532a.56.56 0 01-.113.087c-.009.009-.026.009-.035.017a.407.407 0 01-.087.044c-.017.009-.035.009-.052.017l-.079.026a.111.111 0 00-.049.01c-.026 0-.052.009-.07.009-.026 0-.052-.009-.079-.009a.17.17 0 01-.061-.009l-.079-.026c-.017-.009-.035-.009-.052-.017a.354.354 0 01-.079-.044.191.191 0 01-.044-.026.5.5 0 01-.07-.061c-.009-.009-.026-.017-.035-.035a7.007 7.007 0 115.015 2.12zM28.285 3.62h4.309c4.169-.044 7.24 2.652 7.179 6.542.061 3.812-3.009 6.682-7.179 6.62h-4.309zm4.283 10.738c2.652 0 4.431-1.657 4.431-4.187 0-2.556-1.736-4.108-4.431-4.108h-1.6v8.3h1.6zM49.647 16.791H47.17v-.959a4.089 4.089 0 01-3.009 1.195c-2.093 0-3.411-1.221-3.411-2.948 0-1.779 1.439-2.87 3.733-2.87h2.477v-.436a1.613 1.613 0 00-1.83-1.736 3.372 3.372 0 00-2.617 1.361l-1.4-1.657a5.365 5.365 0 014.317-2.033 3.88 3.88 0 014.23 4.23v5.853zm-2.7-3.812h-2.106c-.881 0-1.378.34-1.378.994s.558 1.073 1.413 1.073a1.965 1.965 0 002.076-1.954zM57.383 17.027a3.947 3.947 0 01-2.957-1.195v4.544h-2.7V6.919h2.477v1.237a3.741 3.741 0 013.18-1.457 4.844 4.844 0 014.789 5.146 4.874 4.874 0 01-4.789 5.182zm-.5-7.894a2.462 2.462 0 00-2.495 2.713 2.477 2.477 0 002.495 2.73 2.551 2.551 0 002.556-2.713 2.537 2.537 0 00-2.553-2.73zM69.429 17.027a3.947 3.947 0 01-2.957-1.195v4.544h-2.7V6.919h2.485v1.237a3.741 3.741 0 013.172-1.457 4.844 4.844 0 014.789 5.146 4.874 4.874 0 01-4.789 5.182zm-.5-7.894a2.462 2.462 0 00-2.495 2.713 2.477 2.477 0 002.495 2.73 2.551 2.551 0 002.556-2.713 2.532 2.532 0 00-2.553-2.73zM84.014 16.791l-3.411-4.649h-1.971v4.649h-2.7V3.62h4.946c2.756 0 4.745 1.718 4.745 4.248a4.081 4.081 0 01-2.311 3.751l3.733 5.164h-3.031zm-5.39-7.021h2.253a1.811 1.811 0 002-1.893 1.825 1.825 0 00-2-1.875h-2.25zM96.094 16.791h-2.477v-.959a4.089 4.089 0 01-3.009 1.195c-2.093 0-3.411-1.221-3.411-2.948 0-1.779 1.439-2.87 3.733-2.87h2.477v-.436a1.613 1.613 0 00-1.832-1.736 3.372 3.372 0 00-2.617 1.361l-1.4-1.657a5.365 5.365 0 014.309-2.032 3.88 3.88 0 014.23 4.23v5.853zm-2.7-3.812h-2.111c-.881 0-1.378.34-1.378.994s.558 1.073 1.413 1.073a1.965 1.965 0 002.076-1.954zM108.062 1.823v14.959h-2.477v-1.221a3.741 3.741 0 01-3.175 1.457 4.849 4.849 0 01-4.789-5.164 4.849 4.849 0 014.789-5.164 3.842 3.842 0 012.957 1.178V1.823zm-5.146 7.31a2.551 2.551 0 00-2.556 2.713 2.532 2.532 0 002.556 2.73 2.462 2.462 0 002.495-2.713 2.486 2.486 0 00-2.495-2.73zM118.511 16.791h-2.477v-.959a4.089 4.089 0 01-3.009 1.195c-2.093 0-3.411-1.221-3.411-2.948 0-1.779 1.439-2.87 3.733-2.87h2.477v-.436a1.613 1.613 0 00-1.832-1.736 3.372 3.372 0 00-2.617 1.361l-1.4-1.657a5.365 5.365 0 014.309-2.032 3.88 3.88 0 014.23 4.23v5.853zm-2.687-3.812h-2.11c-.881 0-1.378.34-1.378.994s.558 1.073 1.413 1.073a1.965 1.965 0 002.076-1.954zM126.667 9.29h-.715a2.385 2.385 0 00-2.652 2.573v4.928h-2.7V6.917h2.477v1.178a3.412 3.412 0 012.713-1.3 2.723 2.723 0 01.881.122V9.29z"></path></svg>
              <p class="updated-at">date updated at ${updatedAt}</p>
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
