import { ApiClient } from "./client";
import { Book, Chapter, Collection, Verse, Version } from "./types";

/**
 * Client for interacting with Bible API endpoints.
 */
export class BibleClient {
  private client: ApiClient;

  /**
   * Creates a new BibleClient instance.
   * @param client The API client to use for requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches a Bible version by its ID.
   * @param id The version ID.
   * @returns The requested Version object.
   */
  async getVersion(id: number): Promise<Version> {
    return this.client.get<Version>(`bibles/${id}`);
  }

  /**
   * Fetches all books for a given Bible version.
   * @param versionId The version ID.
   * @returns An array of Book objects.
   */
  async getBooks(versionId: number): Promise<Collection<Book>> {
    return this.client.get<Collection<Book>>(`bibles/${versionId}/books`);
  }

  /**
   * Fetches a specific book by USFM code for a given version.
   * @param versionId The version ID.
   * @param book The Book Identifier code of the book.
   * @returns The requested Book object.
   */
  async getBook(versionId: number, book: string): Promise<Book> {
    return this.client.get<Book>(`bibles/${versionId}/books/${book}`);
  }

  /**
   * Fetches all chapters for a specific book in a version.
   * @param versionId The version ID.
   * @param book The Book Identifier code of the book.
   * @returns An array of Chapter objects.
   */
  async getChapters(
    versionId: number,
    book: string
  ): Promise<Collection<Chapter>> {
    return this.client.get<Collection<Chapter>>(
      `bibles/${versionId}/books/${book}/chapters`
    );
  }

  /**
   * Fetches a specific chapter for a book in a version.
   * @param versionId The version ID.
   * @param book The Book Identifier code of the book.
   * @param chapter The chapter number.
   * @returns The requested Chapter object.
   */
  async getChapter(
    versionId: number,
    book: string,
    chapter: number
  ): Promise<Chapter> {
    return this.client.get<Chapter>(
      `bibles/${versionId}/books/${book}/chapters/${chapter}`
    );
  }

  /**
   * Fetches all verses for a specific chapter in a book and version.
   * @param versionId The version ID.
   * @param book The Book Identifier code of the book.
   * @param chapter The chapter number.
   * @returns An array of Verse objects.
   */
  async getVerses(
    versionId: number,
    book: string,
    chapter: number
  ): Promise<Collection<Verse>> {
    return this.client.get<Collection<Verse>>(
      `bibles/${versionId}/books/${book}/chapters/${chapter}/verses`
    );
  }

  /**
   * Fetches a specific verse from a chapter, book, and version.
   * @param versionId The version ID.
   * @param book The Book Identifier code of the book.
   * @param chapter The chapter number.
   * @param verse The verse number.
   * @returns The requested Verse object.
   */
  async getVerse(
    versionId: number,
    book: string,
    chapter: number,
    verse: number
  ): Promise<Verse> {
    return this.client.get<Verse>(
      `bibles/${versionId}/books/${book}/chapters/${chapter}/verses/${verse}`
    );
  }
}
