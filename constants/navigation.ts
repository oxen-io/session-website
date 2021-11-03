export interface INavItem {
  href: string;
  alt: string;
  target: '_self' | '_blank';
  rel?: string;
  items?: INavList;
}

interface INavList {
  [key: string]: INavItem; // key is what user sees
}

const NAV_ITEMS: INavList = {
  GitHub: {
    href: 'https://github.com/oxen-io',
    alt: 'Link to Oxen GitHub page',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  Blog: {
    href: '/blog',
    alt: `Link to Session's blogposts`,
    target: '_self',
  },
  FAQ: {
    href: '/faq',
    alt: `Link to Session's FAQs`,
    target: '_self',
  },
  Technicals: {
    href: '/technicals',
    alt: 'Heading of Session Technical Links',
    target: '_self',
    items: {
      Lightpaper: {
        href: '/lightpaper',
        alt: 'Link to Session Lightpaper',
        target: '_blank',
      },
      Whitepaper: {
        href: '/whitepaper',
        alt: 'Link to Session Whitepaper',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      Documentation: {
        href: 'https://docs.oxen.io/products-built-on-oxen/session',
        alt: 'Link to Session Docs on the Oxen website',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    },
  },
};

const NAVIGATION = {
  NAV_ITEMS,
};

export default NAVIGATION;
