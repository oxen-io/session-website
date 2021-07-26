import { ReactElement, useEffect, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { IEmbed, INoembed, isNoembed } from '@/services/embed';

interface Props {
  content: IEmbed | INoembed; // is sanitized in embed service
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { content, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  if (isNoembed(content)) {
    useEffect(() => {
      if (null !== htmlRef.current) {
        htmlRef.current.innerHTML = content.html;
      }
    }, []);
    return (
      <div className={classNames('embed-content', classes)} ref={htmlRef}></div>
    );
  } else {
    return (
      <Link href={content.url}>
        <a target="_blank">
          <div
            className={classNames(
              'embed-content',
              'bg-white border border-gray-300 my-6 mx-auto max-w-sm',
              classes
            )}
          >
            {content.image && (
              <div className={classNames('w-full')}>
                <img
                  src={content.image}
                  alt="link thumbnail image"
                  className={classNames('object-cover')}
                />
              </div>
            )}
            <div className={classNames('p-3 text-black text-sm')}>
              <p
                className={classNames('font-bold')}
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              {content.description && (
                <p dangerouslySetInnerHTML={{ __html: content.description }} />
              )}
              {content.site_name && (
                <p
                  className={classNames('text-gray-500 font-normal')}
                  dangerouslySetInnerHTML={{ __html: content.site_name }}
                />
              )}
            </div>
          </div>
        </a>
      </Link>
    );
  }
}