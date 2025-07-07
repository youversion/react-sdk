import { ApiClient } from "./client";
import { Version } from "./types/version";

export class BibleClient {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getBibleVersion(versionId: number): Promise<Version> {
    return this.client.get<Version>("/bible/version", { version: versionId });
  }
}
