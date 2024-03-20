'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';

import * as Icons from '@/components/icons';
import type { Tables } from '@/types/types_db';
import { getErrorRedirect } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from './ui';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  studentLevel: string;
  studentId: string;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  // TODO it should go on studentId, not user
  user,
  products,
  subscription,
  studentLevel,
  studentId,
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval),
      ),
    ),
  );

  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const currentPath = usePathname();

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleStripeCheckout = async (
    price: Price,
    quantity: number,
    studentId: string,
  ) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath,
      quantity,
      studentId,
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.',
        ),
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <>
        {products.map((product) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval,
          );

          if (!price) return null;

          const priceString = new Intl.NumberFormat('ro-RO', {
            style: 'currency',
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);

          return (
            <Card
              key={product.id}
              className={cn(
                'flex flex-col divide-y divide-zinc-600 shadow-sm',
                {
                  'border border-pink-500': subscription
                    ? product.name === subscription?.prices?.products?.name
                    : product.name === 'Freelancer',
                },
                'flex-1', // This makes the flex item grow to fill the space
                'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                'max-w-xs', // Sets a maximum width to the cards to prevent them from getting too large
              )}
            >
              <div className="p-6">
                <CardTitle className="text-2xl font-semibold leading-6">
                  {product.name}
                </CardTitle>
                <p className="mt-4 text-zinc-300">{product.description}</p>
                <p className="mt-8">
                  <span className="white text-4xl font-extrabold">
                    {priceString}
                  </span>
                  <span className="text-base font-medium text-zinc-100">
                    /{billingInterval}
                  </span>
                </p>

                <Button
                  onClick={() =>
                    handleStripeCheckout(
                      price,
                      quantity,
                      studentLevel,
                      studentId,
                    )
                  }
                >
                  {priceIdLoading === price.id && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {subscription ? 'Manage' : 'Subscribe'}
                </Button>
              </div>
            </Card>
          );
        })}
        {/* one time payments */}
        {products.map((product) => {
          const price = product?.prices?.find(
            (price) => price.type === 'one_time',
          );
          if (!price) return null;
          const priceString = new Intl.NumberFormat('ro-RO', {
            style: 'currency',
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format(((price?.unit_amount || 0) / 100) * quantity);

          return (
            <Card key={price.id} className="max-w-xs">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold">{priceString}</p>
                </div>
                <div className="flex items-center">
                  <Button
                    disabled={quantity === 1}
                    onClick={handleQuantityDecrement}
                  >
                    <Icons.Minus className="size-4" />
                  </Button>
                  <p className="text-md">
                    {quantity === 1 ? 'O ședință' : `${quantity} ședințe`}
                  </p>
                  <Button
                    disabled={quantity === 8}
                    onClick={handleQuantityIncrement}
                  >
                    <Icons.Plus className="size-4" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  disabled={priceIdLoading === price.id}
                  onClick={() =>
                    handleStripeCheckout(price, quantity, studentId)
                  }
                >
                  {priceIdLoading === price.id && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Buy Lessons
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </>
    );
  }
}
