import { ReactElement, useEffect } from 'react';

import { Layout } from '@/components/ui';
import { METADATA } from '@/constants';
import WhitepaperRedirect from '@/components/WhitepaperRedirect';

export default function Whitepaper(): ReactElement {
  return (
    <Layout title="Whitepaper" metadata={METADATA.LIGHTPAPER_PAGE}>
      <WhitepaperRedirect />
    </Layout>
  );
}
