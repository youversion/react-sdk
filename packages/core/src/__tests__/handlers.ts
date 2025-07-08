import { http, HttpResponse } from 'msw';
import { Book, Chapter, Collection, User, Verse, Version } from '../types';

const baseUrl = 'https://api-dev.youversion.com';

export const handlers = [
  // Authentication endpoints
  http.get(`${baseUrl}/auth/me`, () => {
    
    const user: User = {
      id: 1,
      first_name: 'Test',
      last_name: 'User',
      avatar_url: 'https://example.com/avatar.jpg'
    };
    
    return HttpResponse.json(user);
  }),

  // Bible version endpoints
  http.get(`${baseUrl}/v1/bibles/:id`, ({ params }) => {
    const version: Version = {
      id: Number(params.id),
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
    };
    
    return HttpResponse.json(version);
  }),

  // Books endpoints
  http.get(`${baseUrl}/v1/bibles/:versionId/books`, () => {
    const books: Collection<Book> = {
      data: [
        {
          usfm: 'GEN',
          title: 'Genesis',
          abbreviation: 'Gen',
          canon: 'OT'
        },
        {
          usfm: 'EXO',
          title: 'Exodus',
          abbreviation: 'Exo',
          canon: 'OT'
        }
      ],
      nextCursorToken: 'next_token'
    };
    
    return HttpResponse.json(books);
  }),

  http.get(`${baseUrl}/v1/bibles/:versionId/books/:bookId`, ({ params }) => {
    const book: Book = {
      usfm: params.bookId as string,
      title: params.bookId === 'GEN' ? 'Genesis' : 'Exodus',
      abbreviation: params.bookId === 'GEN' ? 'Gen' : 'Exo',
      canon: 'OT'
    };
    
    return HttpResponse.json(book);
  }),

  // Chapters endpoints
  http.get(`${baseUrl}/v1/bibles/:versionId/books/:bookId/chapters`, () => {
    const chapters: Collection<Chapter> = {
      data: [
        {
          usfm: 'GEN.1',
          title: 'Genesis 1'
        },
        {
          usfm: 'GEN.2',
          title: 'Genesis 2'
        }
      ],
      nextCursorToken: 'next_token'
    };
    
    return HttpResponse.json(chapters);
  }),

  http.get(`${baseUrl}/v1/bibles/:versionId/books/:bookId/chapters/:chapterId`, ({ params }) => {
    const chapter: Chapter = {
      usfm: `GEN.${params.chapterId}`,
      title: `Genesis ${params.chapterId}`
    };
    
    return HttpResponse.json(chapter);
  }),

  // Verses endpoints
  http.get(`${baseUrl}/v1/bibles/:versionId/books/:bookId/chapters/:chapterId/verses`, () => {
    const verses: Collection<Verse> = {
      data: [
        {
          usfm: 'GEN.1.1',
          reference: 'Genesis 1:1',
          content: 'In the beginning, God created the heavens and the earth.'
        },
        {
          usfm: 'GEN.1.2',
          reference: 'Genesis 1:2',
          content: 'The earth was without form and void, and darkness was over the face of the deep.'
        }
      ],
      nextCursorToken: 'next_token'
    };
    
    return HttpResponse.json(verses);
  }),

  http.get(`${baseUrl}/v1/bibles/:versionId/books/:bookId/chapters/:chapterId/verses/:verseId`, ({ params }) => {
    const verse: Verse = {
      usfm: `GEN.${params.chapterId}.${params.verseId}`,
      reference: `Genesis ${params.chapterId}:${params.verseId}`,
      content: 'In the beginning, God created the heavens and the earth.'
    };
    
    return HttpResponse.json(verse);
  })
];