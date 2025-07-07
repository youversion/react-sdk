import { ApiClient, BibleClient } from "@repo/core";

const config = {
  baseUrl: "https://api-dev.youversion.com",
  appId: "V8lOX2LMfC6PGBawNiyywXbFTHafIvOjDIr9U82Zy5qGsrjv",
};

async function main() {
  const apiClient = new ApiClient(config);
  const bibleClient = new BibleClient(apiClient);

  try {
    const versionId = 206;
    const version = await bibleClient.getBibleVersion(versionId);
    console.log("Bible Version:", version);
  } catch (error) {
    console.error("Error fetching Bible version:", error);
  }
}

main();
