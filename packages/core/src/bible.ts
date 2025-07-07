import { ApiClient } from "./client.js";
import { Version } from "./types/version.js";

export class BibleClient {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getBibleVersion(versionId: number): Promise<Version> {
    return this.client.get<Version>("/bible/version", { version: versionId });
  }
}
