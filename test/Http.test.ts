import Http, { GET } from "../src/Infrastructure/Http";
import _ from "lodash";

const isJSON = (str: string) => {
  try {
    const json = JSON.parse(str);
    if (Object.prototype.toString.call(json).slice(8, -1) !== "Object") {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

describe("Http Test", () => {
  test("Test 1", async () => {
    const http = new Http();
    const resp: object[] | object = await http.request({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: GET,
    });

    expect(typeof resp === "undefined").toBeFalsy();
    expect(_.isArray(resp)).toBeTruthy();

    // resp.forEach(object => {
    //   expect(isJSON(JSON.stringify(object))).toBeTruthy();
    // });
  });

  test("Test 2", async () => {
    const http = new Http();
    const resp: object = await http.request({
      url: "https://jsonplaceholder.typicode.com/posts/1",
      method: GET,
    });

    expect(typeof resp === "undefined").toBeFalsy();
    expect(_.isObject(resp)).toBeTruthy();
    expect(isJSON(JSON.stringify(resp))).toBeTruthy();
  });
});
