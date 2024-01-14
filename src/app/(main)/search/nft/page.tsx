'use client';
import dynamic from 'next/dynamic';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductsGrid from '@/app/shared/explore-nft';
import ListingFilters from '@/app/shared/explore-nft/listing-filters';
import { Button } from '@/components/ui/button';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { PiSliders } from 'react-icons/pi';
const NftFiltersDrawerView = dynamic(
  () => import('@/app/shared/explore-nft/listing-filters/drawer-view'),
  {
    ssr: false,
  }
);

const pageHeader = {
  title: 'Search & Filters',
  breadcrumb: [
    {
      name: 'Pages',
    },
    {
      href: routes.search.realEstate,
      name: 'Search & Filters',
    },
    {
      name: 'NFT',
    },
  ],
};

export default function NFTPage() {
  const { openDrawer } = useDrawer();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button
          rounded="pill"
          className="mt-6 flex w-full cursor-pointer @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 lg:hidden"
          onClick={() =>
            openDrawer({
              view: <NftFiltersDrawerView />,
              placement: 'right',
            })
          }
        >
          <PiSliders className="me-1 h-4 w-4 rotate-90" />
          Filters
        </Button>
      </PageHeader>
      <ListingFilters className="lg:mb-6" />
      <ProductsGrid />
    </>
  );
}
