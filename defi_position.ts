/**
 * Sample request generator usage.
 * Contributed by jjohnsonvng:
 * https://github.com/alexfernandez/loadtest/issues/86#issuecomment-211579639
 */
import "dotenv/config";
import loadtest from "loadtest";
import { addresses } from "./address";

const getRandomAddress = () =>
  addresses[Math.floor(Math.random() * addresses.length)];

const protocols = [
  "aftermath-finance",
  "bluemove",
  "cetus",
  "flowx",
  "kriya",
  "navi",
  "scallop",
  "native-staking",
  "suilend",
  "turbos-finance",
  "typus",
  "alpha-fi",
  "bluefin",
  "elixir",
  "sui-ns",
];

const RPS = Number(process.env.RPS) || 10;
const DURATION = Number(process.env.DURATION) || 120;

const options: loadtest.LoadTestOptions = {
  url: "https://api.getnimbus.io/v2/address/0x692853c81afc8f847147c8a8b4368dc894697fc12b929ef3071482d27339815e/positions?protocol=scallop",
  concurrency: Math.min(10, RPS / 20),
  method: "GET",
  body: "",
  agentKeepAlive: true,
  requestsPerSecond: RPS,
  maxSeconds: DURATION,
  requestGenerator: (params, options, client, callback) => {
    const address = getRandomAddress();
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    options.href = `${options.url}/v2/${address}/positions?protocol=${protocol}`;
    options.search = `?protocol=${protocol}`;
    options.query = `protocol=${protocol}`;
    options.path = `/v2/address/${address}/positions?protocol=${protocol}`;

    options.headers["x-api-key"] = process.env.API_KEY;
    options.headers["Content-Type"] = "application/json";

    const cb = (a) => {
      // if (a.statusCode !== 200) {
      //   console.log(a.statusCode);
      //   console.log(options.path);
      // }
      callback(a);
    };
    const request = client(options, cb);
    return request;
  },
};

loadtest.loadTest(options, (error, result) => {
  if (error) {
    return console.error(`Got an error: ${error}`);
  }

  // const { histogramMs, ...rest } = result
  // console.log("Tests run successfully", {rest})
  result.show();
});
