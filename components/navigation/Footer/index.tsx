import { ReactComponent as GithubSVG } from '@/assets/svgs/github.svg';
import { GroupNotice } from '@/components/sections';
import Image from 'next/image';
import { ReactComponent as InstagramSVG } from '@/assets/svgs/instagram.svg';
import { ReactComponent as MastodonSVG } from '@/assets/svgs/mastodon.svg';
import Link from 'next/link';
import { ReactElement } from 'react';
import { ReactComponent as RssSVG } from '@/assets/svgs/rss.svg';
import { ReactComponent as TwitterSVG } from '@/assets/svgs/twitter.svg';
import { ReactComponent as YouTubeSVG } from '@/assets/svgs/youtube.svg';
import classNames from 'classnames';
import redact from '@/utils/redact';
import { useScreen } from '@/contexts/screen';

export default function Footer(): ReactElement {
  const { isSmall } = useScreen();
  const redactedClasses = redact({
    redactColor: 'primary',
    textColor: 'white',
    animate: true,
    classes: 'py-0.5 py-1',
  });
  const headingClasses = classNames(
    'text-white uppercase text-xl font-bold mb-2'
  );
  const linkClasses = classNames(
    'text-sm py-2 mr-2 font-semibold',
    'lg:py-0 lg:my-0',
    'transition-colors duration-300',
    'hover:text-white'
  );
  const socialLinkClasses = classNames(
    'text-primary',
    'transition duration-300',
    'hover:text-white'
  );
  const svgClasses = classNames(
    'fill-current w-7 h-7 m-1',
    'lg:my-0 lg:ml-0',
    'hover:animate-push'
  );
  return (
    <div className={classNames('bg-gray-dark')}>
      <div
        className={classNames(
          'lg:flex lg:justify-end lg:max-w-screen-xl lg:mx-auto'
        )}
      >
        {!isSmall && (
          <GroupNotice
            classes={classNames(
              'lg:flex lg:flex-col lg:justify-center lg:w-full lg:max-w-xl lg:px-0 lg:border-b-0 lg:border-r lg:my-2'
            )}
          />
        )}
        <footer className={classNames('text-primary-dark', 'lg:w-1/2 lg:mt-2')}>
          <div
            className={classNames(
              'flex flex-wrap pt-6 pb-4 px-8 border-b border-primary border-dashed',
              'md:pb-8',
              'lg:pt-2'
            )}
          >
            <div
              className={classNames(
                'flex flex-col w-1/2 mb-4',
                'md:w-1/4',
                'lg:w-1/3'
              )}
            >
              <h3 className={headingClasses}>About</h3>
              <Link href="/whitepaper">
                <a
                  className={linkClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whitepaper
                </a>
              </Link>
              <Link href="/privacy-policy">
                <a className={linkClasses}>Privacy Policy</a>
              </Link>
              <Link href="/terms-of-service">
                <a className={linkClasses}>Terms of Service</a>
              </Link>
              <Link href="/blog">
                <a className={linkClasses}>Blog</a>
              </Link>
              <Link href="/faq">
                <a className={linkClasses}>FAQ</a>
              </Link>
            </div>
            <div
              className={classNames(
                'flex flex-col w-1/2 mb-4',
                'md:w-1/4',
                'lg:w-1/3'
              )}
            >
              <h3 className={headingClasses}>Links</h3>
              <Link href="https://session.foundation">
                <a
                  className={linkClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Session Technology Foundation
                </a>
              </Link>
              <Link href="https://lokinet.org/">
                <a
                  className={linkClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lokinet
                </a>
              </Link>
              <Link href="/assets/downloads/Session-Brandmarks.zip">
                <a className={linkClasses}>Media Kit</a>
              </Link>
              <Link href="https://session.foundation/transparency-reports">
                <a
                  className={linkClasses}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Transparency Report
                </a>
              </Link>
            </div>
            <div
              className={classNames(
                'flex w-full',
                'md:w-1/2',
                'lg:block lg:w-1/3'
              )}
            >
              <div className={classNames('w-1/2 mb-4', 'lg:w-full')}>
                <h3 className={headingClasses}>Socials</h3>
                <div className={classNames('flex flex-wrap -ml-1')}>
                  <Link href="https://twitter.com/session_app">
                    <a
                      className={socialLinkClasses}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterSVG className={svgClasses} />
                    </a>
                  </Link>
                  <Link href="https://mastodon.social/@session">
                    <a
                      className={classNames(socialLinkClasses, '')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MastodonSVG
                        className={classNames(
                          svgClasses,
                          'border-primary border-2.5 rounded-full py-1',
                          'hover:border-white duration-300'
                        )}
                      />
                    </a>
                  </Link>
                  <Link href="https://www.instagram.com/getsession">
                    <a
                      className={socialLinkClasses}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramSVG className={svgClasses} />
                    </a>
                  </Link>
                  <Link href="https://www.youtube.com/@SessionTV">
                    <a
                      className={socialLinkClasses}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeSVG className={svgClasses} />
                    </a>
                  </Link>
                  <Link href="https://github.com/oxen-io">
                    <a
                      className={socialLinkClasses}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubSVG className={svgClasses} />
                    </a>
                  </Link>
                  <Link href="/feed">
                    <a className={socialLinkClasses} target="_self">
                      <RssSVG className={svgClasses} />
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className={classNames('flex flex-col w-1/2 mb-4', 'lg:w-full')}
              >
                <h3 className={headingClasses}>Support</h3>
                <a
                  href="https://sessionapp.zendesk.com/hc/en-us"
                  className={classNames(linkClasses)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Session Support
                </a>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              'py-6 px-8',
              'md:p-10 md:w-full md:max-w-3xl',
              'lg:py-5 lg:px-7 lg:mb-2 lg:max-w-lg'
            )}
          >
            <Image
              src="/assets/images/logo-white.png"
              alt="session logo"
              width="120px"
              height="26px"
            />
            <p
              className={classNames(
                'group text-white text-sm leading-6 tracking-wide'
              )}
            >
              Session is an <span className={redactedClasses}>end-to-end</span>{' '}
              encrypted messenger that removes{' '}
              <span className={redactedClasses}>sensitive</span> metadata
              collection,
              <br
                className={classNames('hidden', 'md:inline', 'lg:hidden')}
              />{' '}
              <span className={redactedClasses}>and is designed</span> for
              people who want privacy and freedom from{' '}
              <span className={redactedClasses}>any forms of</span>{' '}
              surveillance.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
