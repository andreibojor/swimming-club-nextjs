'use server';

import { createClient } from '@/utils/supabase/server';

export async function getSubscriptions() {
  try {
    const supabase = createClient();

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle();

    return subscription || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface GetProductsParams {
  studentLevel: string;
}

export async function getProducts(params: GetProductsParams) {
  try {
    const supabase = createClient();

    let { studentLevel } = params;
    //👇 this is changed like this because I can't add swimmer_level pro and advanced
    // in the stripe metadata. Because it would be the same key with 2 different values
    // so if the swimmer level is pro, I change it to advanced because it's the same price
    studentLevel === 'pro' || studentLevel === 'advanced'
      ? (studentLevel = 'advanced')
      : 'beginner';

    const { data: products } = await supabase
      .from('products')
      .select('*, prices(*)')
      .eq('active', true)
      .eq('prices.active', true)
      .eq('metadata->>swimmer_level', studentLevel)
      .order('metadata->index')
      .order('unit_amount', { referencedTable: 'prices' });

    return products || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
