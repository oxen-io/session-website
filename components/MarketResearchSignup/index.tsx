import { FormEventHandler, ReactElement, useRef, useState } from 'react';

import { Button } from '@/components/ui';
import Container from '@/components/Container';
import classNames from 'classnames';

export default function MarketResearchSignup(): ReactElement {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const setButtonText = (value: string) => {
    if (null !== buttonRef.current) {
      buttonRef.current.innerText = value;
    }
  };
  const [email, setEmail] = useState('');
  const handleSubscription: FormEventHandler = async (event) => {
    event.preventDefault();
    setButtonText('Subscribing...');
    let response;
    try {
      response = await fetch('/api/email/market-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      switch (response.status) {
        case 201:
          setEmail('');
          setButtonText('Signed up ✓');
          break;
        case 400:
        default:
          setButtonText('Signup failed ✗');
          break;
      }
    } catch (error) {
      response = error;
    }
  };
  return (
    <section
      id="research-signup"
      className="mb-6 border text-gray-dark border-gray-dark"
    >
      <Container
        id="signup"
        classes={classNames('px-8', 'md:px-10', 'lg:py-12')}
      >
        <h3
          className={classNames(
            'text-xl font-bold leading-tight mb-2',
            'md:text-3xl',
            'lg:text-4xl lg:mb-4'
          )}
        >
          Join our new research group!
        </h3>
        <p className={classNames('mb-4', 'md:mb-8', 'lg:text-xl')}>
          <span>
            You can help us make Session the best messenger in the world.{' '}
          </span>
          <span className={classNames('md:block')}>
            Sign up to Session&apos;s market research group now!
          </span>
        </p>
        <form onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classNames(
              'block w-5/6 mb-4 text-sm border border-black rounded-sm',
              'md:w-1/2',
              'lg:w-2/5',
              'placeholder-black placeholder-opacity-60'
            )}
            required
          />
          <Button
            bgColor="black"
            textColor="primary"
            fontWeight="semibold"
            size="small"
            hoverEffect={false}
            type={'submit'}
            reference={buttonRef}
          >
            Sign up
          </Button>
        </form>
      </Container>
    </section>
  );
}
