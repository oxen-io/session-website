import { mkdirSync, writeFile } from 'fs';

import { Feed } from 'feed';
import { IPost } from '../types/cms';
import METADATA from '@/constants/metadata';

const baseUrl = METADATA.HOST_URL;
const date = new Date();
const feed = new Feed({
  title: 'Session Blog',
  description: 'Send Messages, Not Metadata!',
  id: `${baseUrl}/`,
  link: baseUrl,
  language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `${baseUrl}/assets/images/logo-icon-black.png`,
  favicon: `${baseUrl}/favicon.ico`,
  copyright: `All rights reserved ${date.getFullYear()}, OPTF`,
  updated: date, // optional, default = today
  generator: 'Next.js using Feed for Node.js', // optional, default = 'Feed for Node.js'
  feedLinks: {
    rss2: `${baseUrl}/rss/feed.xml`,
    json: `${baseUrl}/rss/feed.json`,
    atom: `${baseUrl}/rss/atom.xml`,
  },
});

METADATA.TAGS.forEach((tag) => {
  feed.addCategory(tag);
});

export default function generateRSSFeed(posts: IPost[]) {
  posts.forEach((post) => {
    const postLink = `${baseUrl}/blog/${post.slug}`;
    const postContent = `<p>${post.description}</p><p><a href="${postLink}">Read more</a></p>`;
    feed.addItem({
      title: post.title,
      id: postLink,
      link: postLink,
      description: post.description,
      content: postContent,
      date: new Date(post.publishedDate),
    });
  });

  mkdirSync(`./public/rss`, { recursive: true });
  writeFile(`./public/rss/feed.xml`, feed.rss2(), (err) => {
    console.error(err);
  });
  writeFile(`./public/rss/feed.json`, feed.json1(), (err) => {
    console.error(err);
  });
  writeFile(`./public/rss/atom.xml`, feed.atom1(), (err) => {
    console.error(err);
  });
}
