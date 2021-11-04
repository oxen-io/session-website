import { ReactComponent as AndroidSVG } from '@/assets/svgs/android_robot_head.svg';
import { ReactComponent as AppleSVG } from '@/assets/svgs/apple.svg';
import { Button } from '@/components/ui';
import Container from '@/components/Container';
import { ReactComponent as DesktopSVG } from '@/assets/svgs/desktop.svg';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import classNames from 'classnames';
import { useScreen } from '@/contexts/screen';

export default function Hero(): ReactElement {
  const { isSmall, isMedium, isLarge, isHuge, isEnormous } = useScreen();
  const headingClasses = classNames(
    'text-5xl font-semibold text-gray-dark',
    'lg:text-6xl'
  );
  const downloadLinkClasses = 'text-3xl font-bold text-primary mb-7';
  const downloadSVGClasses = 'inline-block mx-3 -mt-2 fill-current';
  return (
    <section>
      <Container
        hasMinHeight={true}
        heights={{ small: '100%', medium: '100%', large: '100vh - 112px' }}
        classes={classNames(
          'mt-12',
          'lg:mt-16 lg:flex lg:flex-col lg:justify-center lg:items-center'
        )}
      >
        <div
          className={classNames(
            'lg:-mt-16 lg:w-full lg:flex lg:justify-between lg:items-center',
            '3xl:-mt-64'
          )}
        >
          <div className={classNames('lg:-mt-16 lg:mr-8', 'xl:-mr-1')}>
            <h1 className={classNames(headingClasses)}>
              <span className="block">Send</span>
              <span className={'block glitch'} data-glitch-text={'Encrypted'}>
                Messages,
              </span>
              <span className="block">Not Metadata.</span>
            </h1>
            <div
              className={classNames(
                'flex flex-col mt-7 mb-4',
                'md:mb-12',
                'lg:hidden'
              )}
            >
              <Link href="/android">
                <a className={downloadLinkClasses}>
                  <AndroidSVG
                    className={classNames(downloadSVGClasses, 'w-8 h-8')}
                  />
                  <span>Android</span>
                </a>
              </Link>
              <Link href="/apk">
                <a className={downloadLinkClasses}>
                  <AndroidSVG
                    className={classNames(downloadSVGClasses, 'w-8 h-8')}
                  />
                  <span>APK</span>
                </a>
              </Link>
              <Link href="/iphone">
                <a className={downloadLinkClasses}>
                  <AppleSVG
                    className={classNames(downloadSVGClasses, 'w-6 h-6')}
                  />
                  <span>iPhone</span>
                </a>
              </Link>
              <Link href="/download">
                <a className={downloadLinkClasses}>
                  <DesktopSVG
                    className={classNames(downloadSVGClasses, 'w-7 h-7')}
                  />
                  <span>Desktop</span>
                </a>
              </Link>
            </div>
            <Link href="/download">
              <a className="hidden lg:block">
                <Button fontWeight="bold" size="large" classes="mt-4 px-12">
                  Download
                </Button>
              </a>
            </Link>
          </div>
          {(isSmall || isMedium) && (
            <div className={classNames('-mt-4 -ml-1')}>
              <Image
                src="/assets/images/ui-direct-message.png"
                alt="mobile app screenshot"
                width="1148px"
                height="2000px"
                layout="responsive"
                priority={true}
              />
            </div>
          )}
          {(isLarge || isHuge || isEnormous) && (
            <div className={classNames('max-w-2xl')}>
              <Image
                src="/assets/images/ui-showcase.png"
                alt="mobile app ui showcase"
                width="1112px"
                height="1000px"
                priority={true}
                loading="eager"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
