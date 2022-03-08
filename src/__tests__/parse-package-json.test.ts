import * as path from "path";

import parsePackageJson from "../parse-package-json";

describe("parse-package-json", () => {
  test("parse", async () => {
    const result = await parsePackageJson(
      path.resolve(__dirname, "../../package.json")
    );

    if (result.error) throw result.error;

    expect(result.data).toBeInstanceOf(Array);
  });
});
