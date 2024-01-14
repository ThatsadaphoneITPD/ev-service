'use client';

import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';
import { PiShoppingCart, PiShoppingCartBold, PiX } from 'react-icons/pi';
import OrderProducts from '@/app/shared/ecommerce/checkout/order-products';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { useCart } from '@/store/quick-cart/cart.context';
import { toCurrency } from '@/utils/to-currency';
import { usePathname } from 'next/navigation';
import { Title, Text } from '@/components/ui/text';
import usePrice from '@/hooks/use-price';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { DUMMY_ID } from '@/config/constants';
import ShoppingCartAlt from '@/components/icons/shopping-cart-alt';

interface FloatingCartProps {
  className?: string;
}

export default function FloatingCart({ className }: FloatingCartProps) {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { openDrawer } = useDrawer();

  // Check if this page belongs to ecommerce.
  const isECom = pathname.includes('ecommerce');

  // list of excluded pages
  const excludedPaths = [
    routes.eCommerce.cart,
    routes.eCommerce.checkout,
    routes.eCommerce.orderDetails(DUMMY_ID),
  ];

  // check if current page is cart or checkout
  const isPathExcluded = excludedPaths.includes(pathname);

  /**
   * Display this floating cart on all e-commerce pages except for the cart, checkout and order view.
   */
  return (
    isECom &&
    !isPathExcluded && (
      <button
        className={cn(
          'fixed right-2 top-1/2 grid -translate-y-1/2 transform place-content-center gap-1 rounded-md bg-primary p-3 text-xs font-semibold text-white shadow-[0_25px_50px_-12px_#000000]',
          className
        )}
        onClick={() =>
          openDrawer({
            view: <CartDrawer />,
            placement: 'right',
          })
        }
      >
        <PiShoppingCartBold className="mx-auto h-[18px] w-auto" />
        {totalItems} {totalItems > 1 ? 'Items' : 'Item'}
      </button>
    )
  );
}

function CartDrawer() {
  const { items, total } = useCart();
  const { closeDrawer } = useDrawer();
  const isCartEmpty = isEmpty(items);
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <Title as="h4">Shopping Cart</Title>

        <button
          onClick={closeDrawer}
          className="rounded-md p-1.5 transition duration-300 hover:bg-gray-100"
        >
          <PiX className="h-5 w-5" />
        </button>
      </header>
      {isCartEmpty ? (
        <div className="grid h-full place-content-center">
          <ShoppingCartAlt className="mx-auto h-24 w-24 text-gray-400" />
          <Title as="h5" className="mt-6 text-center">
            Your cart is empty
          </Title>
          <Text className="mt-1 text-center">Start Shopping!!</Text>
        </div>
      ) : (
        <OrderProducts
          items={items}
          showControls
          className="mb-5 gap-0 divide-y border-b border-gray-100"
          itemClassName="p-4 pb-5 md:px-6"
        />
      )}

      <Link
        href={routes.eCommerce.checkout}
        className={cn(
          'mx-4 mb-6 mt-auto flex items-center justify-between rounded-md bg-gray-900 px-5 py-2 font-medium text-white md:mx-6',
          isCartEmpty && 'pointer-events-none opacity-70'
        )}
      >
        Checkout
        <span className="-mr-3 inline-flex rounded-md bg-gray-700 p-2 px-4">
          {toCurrency(total)}
        </span>
      </Link>
    </div>
  );
}
