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
        classes={classNames('px-8', 'md:px-10', 'lg:py-24')}
      >
        <h3
          className={classNames(
            'text-xl font-bold leading-none mb-2',
            'lg:text-3xl lg:mb-0'
          )}
        >
          Psst. Help us out!
        </h3>
        <p className={classNames('leading-none mb-4', 'md:mb-8', 'lg:text-xl')}>
          Sign up to our market research group and help make Session better.
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
