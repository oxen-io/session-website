import Container from '@/components/Container';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui';

export default function WhitepaperRedirect() {
  const router = useRouter();
  return (
    <section>
      <Container
        heights={{
          small: '100vh - 108px',
          medium: '50vh',
          large: '40vh',
          huge: '50vh',
          enormous: '50vh',
        }}
        classes={classNames(
          'py-16 px-2 mx-auto text-center',
          'md:flex md:flex-col md:justify-center md:items-center'
        )}
      >
        <h1 className={classNames('text-primary-dark text-4xl font-bold mb-8')}>
          Outdated content!
        </h1>
        <p
          className={classNames('text-gray')}
        >
		  Since the writing of this whitepaper, Session has undergone several protocol changes in order to be faster and more sustainable, so some information in this document is outdated.<br/>
		  
		  While the team works on an updated document, please refer to the{' '}
          <button
            className="font-semibold text-primary-dark"
            onClick={() => router.push("/lightpaper")}
          >
            lightpaper
          </button>
           , the {' '}
          <button
            className="font-semibold text-primary-dark"
            onClick={() => router.push("/blog")}
          >
            blog
          </button>{' '} 
          or the {' '}
          <button
            className="font-semibold text-primary-dark"
            onClick={() => router.push("/faq")}
          >
            FAQ
          </button>{' '}
          for more up-to-date information.
        </p>
        
        <br/>

        <Button
          className="ml-6" fontWeight="bold"
          onClick={() => router.push("https://arxiv.org/pdf/2002.04609.pdf")}
        >
          Continue to the Whitepaper
        </Button>
        <button
          className="font-semibold text-primary-dark"
          onClick={() => router.back()}
        >
          Back
        </button>
      </Container>
    </section>
  );
}
