import { Balancer } from 'react-wrap-balancer';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

export default function Home() {
  return (
    <>
      <div className="z-10 flex min-h-[70vh] w-full flex-col justify-center bg-[url('/images/swimming-pool-homepage.webp')] bg-scroll px-5 pb-0 md:pb-40 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br text-center text-5xl font-bold tracking-[-0.02em] text-slate-100 opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: '0.20s', animationFillMode: 'forwards' }}
        >
          <Balancer>Swimming Club</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-slate-100 opacity-0 md:text-2xl"
          style={{ animationDelay: '0.30s', animationFillMode: 'forwards' }}
        >
          <Balancer>
            Suntem pasionați de apă, de înot și vrem o viață sănătoasă.
          </Balancer>
        </p>
        <p
          className="mt-2 animate-fade-up text-center text-slate-100 opacity-0 md:text-2xl"
          style={{ animationDelay: '0.30s', animationFillMode: 'forwards' }}
        >
          <Balancer>
            Oferim cursuri de înot pentru toate vârstele în diferite locații.
          </Balancer>
        </p>
      </div>
      <div className="my-16 flex w-full max-w-screen-lg animate-fade-up flex-col items-center gap-5 border-t p-5 xl:px-0">
        <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl">
          What&apos;s included?
        </h2>
        <p className="pb-8 pt-4 text-center text-lg">
          <Balancer>
            This repo comes fully stacked with everything you need for your
            enterprise startup. Stop worrying about boilerplate integrations and
            start building your product today!
          </Balancer>
        </p>
        <div className="z-10 mb-10 flex min-h-[50vh] w-full max-w-5xl flex-col justify-between gap-4 px-5 md:flex-row xl:px-0">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </div>
      </div>
    </>
  );
}
