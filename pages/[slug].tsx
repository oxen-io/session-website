import { ReactElement } from 'react';
import { GetStaticPropsContext, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { IPage } from '@/types/cms';
import { fetchEntryBySlug, fetchPages, generateLinkMeta } from '@/services/cms';
import { hasRedirection, IRedirection } from '@/services/redirect';

import Container from '@/components/Container';
import { Headline, Layout } from '@/components/ui';
import RichBody from '@/components/RichBody';
import Custom404 from '@/pages/404';
import Download from '@/pages/download';

interface Props {
  page?: IPage;
  redirection?: IRedirection;
}

export default function Page(props: Props): ReactElement {
  const router = useRouter();
  const { page, redirection } = props;
  // dynamic redirects require a custom fallback solution
  if (redirection) {
    if (typeof window !== 'undefined') {
      console.log('pushing link', redirection);
      router.push(redirection.destination);
    }
    return <Download />;
  }

  if (!page) {
    if (typeof window !== 'undefined') {
      if (router.isFallback) {
        router.push('/404', router.asPath);
      }
    }
    return <Custom404 />;
  }

  const pageTitle = page ? page.title : '';
  return (
    <Layout title={pageTitle}>
      <section>
        {page?.headline && (
          <Headline
            color="gray-dark"
            classes={classNames('font-mono pt-16', 'lg:pt-4 lg:pb-10')}
            containerWidths={{
              sm: '10rem',
              md: '34rem',
              lg: '768px',
            }}
          >
            {page.headline}
          </Headline>
        )}
        <Container classes={classNames('pt-0 px-4 pb-24', 'lg:pb-32')}>
          <div className={'lg:max-w-screen-md lg:mx-auto'}>
            <RichBody
              body={page?.body}
              headingClasses={'text-gray font-medium mt-6'}
              classes={classNames(
                'text-sm text-gray-lighter font-helvetica font-extralight leading-loose',
                'lg:text-base'
              )}
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = String(context.params?.slug);

  const redirection = await hasRedirection('/' + slug);
  if (redirection)
    return {
      props: { redirection },
      revalidate: 3600, // refresh redirections hourly
    };

  const page: IPage = await fetchEntryBySlug(slug, 'page');

  if (!page) {
    return { notFound: true };
  }

  // embedded links in page body need metadata for preview
  page.body = await generateLinkMeta(page.body);

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { entries: pages, total: totalPages } = await fetchPages();
  const paths = pages.map((page) => {
    return {
      params: {
        slug: page.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
