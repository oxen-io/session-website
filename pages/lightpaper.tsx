import { ReactElement, useEffect } from 'react';

import { Layout } from '@/components/ui';
import { METADATA } from '@/constants';
import RedirectPage from '@/components/RedirectPage';
import { useRouter } from 'next/router';

export default function Lightpaper(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.push('/lightpaper/pdf');
  }, [router]);

  return (
    <Layout title="Lightpaper" metadata={METADATA.LIGHTPAPER_PAGE}>
      <RedirectPage />
    </Layout>
  );
}
