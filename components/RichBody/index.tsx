import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import {
  Block,
  BLOCKS,
  Document,
  Inline,
  INLINES,
  MARKS,
} from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import EmbedContent from '@/components/EmbedContent';
import sanitize from '@/utils/sanitize';

interface Props {
  body: Document;
  headingClasses?: string; // custom h1-h4 styles
  classes?: string; // custom styles for regular text (color, font weight, etc.)
}

export default function RichBody(props: Props): ReactElement {
  const { body, headingClasses, classes } = props;
  const protocols = ['https://', 'http://']; // used for checking if hyperlinks are local i.e. #mac, #linux, #windows
  const isLocal = (url: string) => {
    let result = true;
    protocols.forEach((protocol) => {
      if (url.indexOf(protocol) >= 0) {
        result = false;
      }
    });
    return result;
  };
  const hasLocalID = (node: Block | Inline) => {
    let id = '';
    node.content.forEach((child) => {
      if (child.nodeType === 'hyperlink' && isLocal(child.data.uri)) {
        id = child.data.uri.split('#')[1];
      }
    });
    return id;
  };
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span>
          <strong className="font-bold">{text}</strong>
        </span>
      ),
      [MARKS.ITALIC]: (text) => (
        <span>
          <em className="italic">{text}</em>
        </span>
      ),
      [MARKS.UNDERLINE]: (text) => (
        <span className={classNames('underline')}>{text}</span>
      ),
      [MARKS.CODE]: (text) => (
        <code className={classNames('font-mono tracking-wide')}>{text}</code>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <Link href={node.data.uri} scroll={!isLocal(node.data.uri)}>
          <a
            className={classNames('text-primary-dark font-extralight')}
            target={isLocal(node.data.uri) ? '_self' : '_blank'}
            rel="noreferrer"
          >
            {children}
          </a>
        </Link>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const target = node.data.target;
        const asset = target.fields;
        if (target.sys.contentType.sys.id === 'markup') {
          // markup content
          const frontTags: string[] = [];
          const endTags: string[] = [];
          const styles: any = {};
          if (asset.color) {
            styles.color = sanitize(asset.color);
          }
          if (asset.strikethrough) {
            frontTags.push('<s>');
            endTags.push('</s>');
          }
          let htmlContent =
            frontTags.join('') + asset.content + endTags.join('');
          htmlContent = sanitize(htmlContent);
          return (
            <span
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={styles}
            />
          );
        }
        if (!asset.file) {
          // embedded link
          return (
            <figure>
              <EmbedContent
                content={asset.meta}
                classes={'inline-block align-middle mx-1'}
              />
              {asset.caption && (
                <figcaption
                  className={classNames('inline-block align-middle mx-1')}
                >
                  <em>{asset.caption}</em>
                </figcaption>
              )}
            </figure>
          );
        } else {
          // embedded media
          const media = asset.file.fields;
          const url = media.file.url.replace('//', 'https://');
          switch (media.file.contentType) {
            case 'image/jpeg':
            case 'image/png':
              const imageWidth = asset.width ?? media.file.details.image.width;
              const imageHeight =
                asset.height ?? media.file.details.image.height;
              return (
                <figure
                  className={classNames('inline-block align-middle mx-1')}
                >
                  <Image
                    src={url}
                    alt={asset.title}
                    width={imageWidth}
                    height={imageHeight}
                  />
                  {asset.caption && (
                    <figcaption className="inline-block mx-1 align-middle">
                      <em>
                        <Link href={asset.sourceUrl}>
                          <a
                            className={classNames(
                              'text-primary-dark font-extralight'
                            )}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {asset.caption}
                          </a>
                        </Link>
                      </em>
                    </figcaption>
                  )}
                </figure>
              );
            default:
              return null;
          }
        }
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={classNames('leading-relaxed pb-6')}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          id={hasLocalID(node)}
          className={classNames(
            'text-3xl leading-snug mb-5',
            'lg:text-5xl',
            headingClasses
          )}
        >
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          id={hasLocalID(node)}
          className={classNames(
            'text-2xl leading-snug mb-5',
            'lg:text-3xl',
            headingClasses
          )}
        >
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3
          id={hasLocalID(node)}
          className={classNames(
            'text-xl leading-snug mb-2',
            'lg:text-2xl',
            headingClasses
          )}
        >
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4
          id={hasLocalID(node)}
          className={classNames(
            'text-md leading-snug mb-2',
            'lg:text-xl',
            headingClasses
          )}
        >
          {children}
        </h4>
      ),
      [BLOCKS.HR]: (node, children) => (
        <hr className={classNames('border-gray-300 w-24 mx-auto pb-6')} />
      ),
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="ml-4 list-decimal">{children}</ol>;
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="ml-4 list-disc">{children}</ul>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li>{children}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <div
          className={classNames(
            'border-gray-100 border-l-6 py-6 px-4 mb-6 ml-10 mr-4'
          )}
        >
          <blockquote
            className={classNames(
              'text-base text-black italic -mb-6',
              'lg:text-lg'
            )}
          >
            {children}
          </blockquote>
        </div>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const asset = node.data.target.fields;
        if (!asset.file) {
          // embedded link
          return (
            <figure>
              <EmbedContent content={asset.meta} />
              {asset.caption && (
                <figcaption className={classNames('pb-4')}>
                  <em>{asset.caption}</em>
                </figcaption>
              )}
            </figure>
          );
        } else {
          // embedded media
          const media = asset.file.fields;
          const url = media.file.url.replace('//', 'https://');
          switch (media.file.contentType) {
            case 'image/jpeg':
            case 'image/png':
              const imageWidth = media.file.details.image.width;
              const imageHeight = media.file.details.image.height;
              return (
                <figure className={classNames('text-center mb-8', 'lg:px-24')}>
                  <Image
                    src={url}
                    alt={asset.title}
                    width={imageWidth}
                    height={imageHeight}
                  />
                  {asset.caption && (
                    <figcaption className="mt-1">
                      <em>
                        <Link href={asset.sourceUrl}>
                          <a
                            className={classNames(
                              'text-primary-dark font-extralight'
                            )}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {asset.caption}
                          </a>
                        </Link>
                      </em>
                    </figcaption>
                  )}
                </figure>
              );
            default:
              return null;
          }
        }
      },
    },
  };

  const richBody = documentToReactComponents(body, options);
  return <div className={classNames(classes)}>{richBody}</div>;
}
