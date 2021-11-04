import { ReactElement, ReactNode, useEffect, useState } from 'react';

import { ReactComponent as CloseSVG } from '@/assets/svgs/close.svg';
import { INavItem } from '@/constants/navigation';
import Link from 'next/link';
import { ReactComponent as MenuSVG } from '@/assets/svgs/hamburger.svg';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useScreen } from '@/contexts/screen';

export interface DropdownProps {
  title: string | ReactNode; // social icons can be nav items
  navItem: INavItem;
}

export interface NavItemProps extends DropdownProps {
  isExpanded?: boolean;
  isIcon?: boolean;
  hoverEffect?: boolean;
}

function NavDropdown(props: DropdownProps): ReactElement {
  const { title, navItem } = props;

  const navItemClasses = classNames(
    'bg-gray-dark block w-full px-5 py-2 uppercase border-transparent border-b-3',
    'lg:px-2 lg:w-auto lg:bg-transparent'
  );

  const navItemHoverClasses = classNames(
    'transition-colors duration-300',
    'hover:bg-gray-light lg:hover:text-primary lg:hover:bg-transparent'
  );

  return (
    <span>
      <Link href={navItem.href}>
        <a
          aria-label={navItem.alt}
          target={navItem.target}
          ref={navItem.rel ?? undefined}
          className={classNames(navItemClasses, navItemHoverClasses)}
        >
          {title}
        </a>
      </Link>
    </span>
  );
}

export const navLinkClasses = classNames(
  'bg-gray block w-full px-5 py-2 uppercase border-transparent border-b-3 cursor-pointer',
  'lg:px-2 lg:w-auto lg:bg-transparent'
);

const navLinkHoverClasses = classNames(
  'transition-colors duration-300',
  'hover:bg-gray-light lg:hover:border-primary lg:hover:text-primary lg:hover:bg-transparent'
);

export default function NavItem(props: NavItemProps): ReactElement {
  const {
    title,
    navItem,
    isExpanded,
    isIcon: isSVG = false,
    hoverEffect = true,
  } = props;
  const router = useRouter();
  const { isSmall, isMedium } = useScreen();
  const [IsDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const isActiveNavLink = (url: string) => {
    return (
      router.asPath.includes(url) !== false &&
      'lg:border-primary lg:text-primary'
    );
  };

  useEffect(() => {
    setIsDropdownExpanded(false);
  }, [isExpanded]);

  return (
    <>
      {!navItem.items ? (
        <Link href={navItem.href}>
          <a
            aria-label={navItem.alt}
            target={navItem.target}
            rel={navItem.rel ?? undefined}
            className={classNames(
              !isSVG && navLinkClasses,
              isActiveNavLink(navItem.href),
              hoverEffect && navLinkHoverClasses
            )}
          >
            {title}
          </a>
        </Link>
      ) : (
        <span className={classNames('w-full relative group', 'lg:w-auto')}>
          <span
            aria-label={navItem.alt}
            className={classNames(
              'relative',
              !isSVG && navLinkClasses,
              'lg:border-transparent lg:border-b-3',
              'lg:transform lg:transition-colors duration-500',
              'lg:group-hover:border-primary',
              isActiveNavLink(`${navItem.href}/`)
            )}
            onClick={() => setIsDropdownExpanded(!IsDropdownExpanded)}
          >
            {title}
            {(isSmall || isMedium) && (
              <span>
                <MenuSVG
                  className={classNames(
                    'inline w-3 h-3 -mt-1 ml-3 fill-current transform duration-300',
                    IsDropdownExpanded ? 'hidden' : 'block'
                  )}
                />
                <CloseSVG
                  className={classNames(
                    'inline w-3 h-3 -mt-1 ml-3 fill-current transform duration-300',
                    IsDropdownExpanded ? 'block' : 'hidden'
                  )}
                />
              </span>
            )}
          </span>
          <div
            className={classNames(
              'w-full overflow-hidden',
              'transform transition-all duration-300',
              'lg:w-full lg:overflow-visible lg:opacity-0 lg:absolute lg:top-12',
              'lg:duration-500',
              'lg:group-hover:opacity-100 lg:group-hover:duration-700',
              (isSmall || isMedium) && IsDropdownExpanded
                ? 'h-32 translate-y-0 -mb-3'
                : 'h-0 translate-y-auto lg:h-auto lg:translate-y-0'
            )}
          >
            {Object.entries(navItem.items).map(([key, value], index) => {
              return (
                <NavDropdown
                  key={`${key}${index}`}
                  navItem={value}
                  title={key}
                />
              );
            })}
          </div>
        </span>
      )}
    </>
  );
}
