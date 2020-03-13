import { Cfg } from "../src/Application/Cfg";

describe("Cfg Test", () => {
  test("Test 1", async () => {
    const client: string = "analytics.bunkerdb.com";
    const service: string = "bunker";

    const cfg = new Cfg(client, service);

    console.log(cfg.get());
  });
});
