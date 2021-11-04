/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useRef, useState } from 'react';

import { Document } from '@contentful/rich-text-types';
import { ReactComponent as MinusSVG } from '@/assets/svgs/minus.svg';
import { ReactComponent as PlusSVG } from '@/assets/svgs/plus.svg';
import RichBody from '@/components/RichBody';
import classNames from 'classnames';

interface Props {
  id: string;
  question: string;
  answer: Document;
  expand?: boolean;
  classes?: string;
}

export default function Accordion(props: Props): ReactElement {
  const { id, question, answer, expand, classes } = props;
  const content = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState(`${content?.current?.scrollHeight}px`);
  const [loaded, setLoaded] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    setHeight(isExpanded ? '0px' : `${content?.current?.scrollHeight}px`);
  };
  const svgClasses = classNames('w-3 h-3 fill-current mb-1 mr-2');
  useEffect(() => {
    if (!expand) {
      handleExpand();
    } else {
      setHeight(`${content?.current?.scrollHeight}px`);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded && expand) handleExpand();
  }, [expand]);
  return (
    <div
      id={id}
      className={classNames(
        'border-l border-r border-gray-300 text-sm',
        'first:border-t',
        classes
      )}
    >
      <div
        className={classNames(
          'bg-gray-100 text-gray-dark py-2 px-4 font-bold border-gray-300 border-b',
          'lg:text-base'
        )}
        onClick={handleExpand}
      >
        {loaded && (
          <>
            <MinusSVG
              className={classNames(
                svgClasses,
                isExpanded ? 'inline' : 'hidden'
              )}
            />
            <PlusSVG
              className={classNames(
                svgClasses,
                isExpanded ? 'hidden' : 'inline'
              )}
            />
          </>
        )}
        {question}
      </div>
      <div
        className={classNames(
          'leading-loose px-4 overflow-hidden',
          'transition-all ease-in-out duration-500',
          isExpanded && 'border-gray-300 border-b'
        )}
        ref={content}
        style={{ height: height }}
      >
        <RichBody
          body={answer}
          classes={classNames('text-sm text-black py-2', 'lg:text-base')}
        />
      </div>
    </div>
  );
}
