/**
 * Sample request generator usage.
 * Contributed by jjohnsonvng:
 * https://github.com/alexfernandez/loadtest/issues/86#issuecomment-211579639
 */
import "dotenv/config";
import loadtest from "loadtest";
import { addresses } from "./address";

const RPS = Number(process.env.RPS) || 10;

const getRandomAddress = () =>
  addresses[Math.floor(Math.random() * addresses.length)];

const options: loadtest.LoadTestOptions = {
  url: "https://api.getnimbus.io/v2/address/0x692853c81afc8f847147c8a8b4368dc894697fc12b929ef3071482d27339815e/holding?chain=SUI&force_refresh=true&includePnl=false",
  concurrency: 100,
  method: "GET",
  body: "",
  requestsPerSecond: RPS,
  maxSeconds: 30,
  requestGenerator: (params, options, client, callback) => {
    const address = getRandomAddress();
    options.href = `${options.url}${address}/holding?includePnl=false&chain=SUI`;
    options.search = `?chain=SUI&includePnl=false`;
    options.query = `chain=SUI&includePnl=false`;
    options.path = `/v2/address/${address}/holding?includePnl=false&chain=SUI`;

    options.headers["x-api-key"] = process.env.API_KEY;
    options.headers["Content-Type"] = "application/json";

    // const cb = (a) => {
    // 	if (a.statusCode !== 200) {
    // 		console.log(address)
    // 	}
    // 	callback(a)
    // }
    const request = client(options, callback);
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
