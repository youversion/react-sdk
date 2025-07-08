import { describe, it, expect, beforeEach } from '@jest/globals';
import { ApiClient } from '../client';
import { BibleClient } from '../bible';

describe('BibleClient', () => {
  let apiClient: ApiClient;
  let bibleClient: BibleClient;

  beforeEach(() => {
    apiClient = new ApiClient({
      baseUrl: 'https://api-dev.youversion.com',
      appId: 'test-app',
      version: 'v1'
    });
    bibleClient = new BibleClient(apiClient);
  });

  describe('getVersion', () => {
    it('should fetch a Bible version by ID', async () => {
      const version = await bibleClient.getVersion(1);
      
      expect(version).toEqual({
        id: 1,
        abbreviation: 'ESV',
        copyright: '© 2001 by Crossway',
        language: {
          name: 'English',
          iso_639_3: 'eng',
          iso_639_1: 'en',
          local_name: 'English',
          text_direction: 'ltr'
        },
        local_abbreviation: 'ESV',
        local_title: 'English Standard Version',
        info: 'The ESV Bible',
        info_url: 'https://www.esv.org',
        title: 'English Standard Version'
      });
    });
  });

  describe('getBooks', () => {
    it('should fetch all books for a version', async () => {
      const books = await bibleClient.getBooks(1);
      
      expect(books.data).toHaveLength(2);
      expect(books.nextCursorToken).toBe('next_token');
      expect(books.data[0]).toEqual({
        usfm: 'GEN',
        title: 'Genesis',
        abbreviation: 'Gen',
        canon: 'OT'
      });
    });
  });

  describe('getBook', () => {
    it('should fetch a specific book', async () => {
      const book = await bibleClient.getBook(1, 'GEN');
      
      expect(book).toEqual({
        usfm: 'GEN',
        title: 'Genesis',
        abbreviation: 'Gen',
        canon: 'OT'
      });
    });
  });

  describe('getChapters', () => {
    it('should fetch all chapters for a book', async () => {
      const chapters = await bibleClient.getChapters(1, 'GEN');
      
      expect(chapters.data).toHaveLength(2);
      expect(chapters.nextCursorToken).toBe('next_token');
      expect(chapters.data[0]).toEqual({
        usfm: 'GEN.1',
        title: 'Genesis 1'
      });
    });
  });

  describe('getChapter', () => {
    it('should fetch a specific chapter', async () => {
      const chapter = await bibleClient.getChapter(1, 'GEN', 1);
      
      expect(chapter).toEqual({
        usfm: 'GEN.1',
        title: 'Genesis 1'
      });
    });
  });

  describe('getVerses', () => {
    it('should fetch all verses for a chapter', async () => {
      const verses = await bibleClient.getVerses(1, 'GEN', 1);
      
      expect(verses.data).toHaveLength(2);
      expect(verses.nextCursorToken).toBe('next_token');
      expect(verses.data[0]).toEqual({
        usfm: 'GEN.1.1',
        reference: 'Genesis 1:1',
        content: 'In the beginning, God created the heavens and the earth.'
      });
    });
  });

  describe('getVerse', () => {
    it('should fetch a specific verse', async () => {
      const verse = await bibleClient.getVerse(1, 'GEN', 1, 1);
      
      expect(verse).toEqual({
        usfm: 'GEN.1.1',
        reference: 'Genesis 1:1',
        content: 'In the beginning, God created the heavens and the earth.'
      });
    });
  });
});