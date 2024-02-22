import Image from 'next/image';
import { Balancer } from 'react-wrap-balancer';

import * as Icons from '@/components/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
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

      {/* HOME CONTENT */}
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
          <Card className="flex w-full flex-col justify-center border-none shadow-none md:w-1/2">
            <CardHeader className="text-center ">
              <CardTitle className="text-3xl font-light">
                Cursuri de înot pentru începători
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5 text-primary" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5 text-primary" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5 text-primary" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Log in
              </Button>
            </CardFooter>
          </Card>
          <div className="w-full md:w-1/2">
            <Image
              alt="Child swimming"
              src="/images/beginnerSwimming.webp"
              className="rounded-lg"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="z-10 mt-10 flex min-h-[50vh] w-full max-w-5xl flex-col justify-between gap-4 px-5 md:flex-row xl:px-0">
          <div className="order-2 w-full md:order-1 md:w-1/2">
            <Image
              alt="Man swimming"
              src="/images/advancedSwimming.webp"
              className="rounded-lg"
              width={500}
              height={500}
            />
          </div>
          <Card className="order-1 flex w-full flex-col justify-center border-none shadow-none md:order-2 md:w-1/2">
            <CardHeader className="text-center ">
              <CardTitle className="text-3xl">
                Cursuri de înot pentru avansați
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="necessary" className="flex flex-col space-y-1">
                  <span className="flex items-center text-lg">
                    <Icons.Waves className="mr-2 h-5 w-5" />
                    Strictly Necessary
                  </span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    These cookies are essential in order to use the website and
                    use its features.
                  </span>
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                Log in
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
