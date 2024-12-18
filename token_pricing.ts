/**
 * Load test for token pricing API
 */
import "dotenv/config";
import loadtest from "loadtest";
import { tokens } from "./token";

const RPS = Number(process.env.RPS) || 10;
const DURATION = Number(process.env.DURATION) || 120;
const BATCH_SIZE = 50; // Number of tokens per request

// Get random tokens from the token list
const getRandomTokens = () => {
  const shuffled = [...tokens].sort(() => 0.5 - Math.random());
  return shuffled
    .slice(0, BATCH_SIZE)
    .map((t) => t.token_address)
    .join(",");
};

const options: loadtest.LoadTestOptions = {
  url: "https://api.getnimbus.io/tokens/sui/price",
  concurrency: 10,
  method: "POST",
  agentKeepAlive: true,
  requestsPerSecond: RPS,
  maxSeconds: DURATION,
  //   body: {
  //     addresses:
  //       "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
  //   },
  contentType: "application/json",
  headers: {
    accept: "application/json",
    "x-api-key": process.env.API_KEY,
  },
  requestGenerator: (params, options, client, callback) => {
    const addresses = getRandomTokens();

    const message = JSON.stringify({
      addresses,
    });

    options.headers["Content-Length"] = message.length;
    options.headers["Content-Type"] = "application/json";

    const request = client(options, callback);
    // console.log(request);
    request.write(message);
    return request;
  },
};

loadtest.loadTest(options, (error, result) => {
  if (error) {
    return console.error(`Got an error: ${error}`);
  }
  result.show();
});
