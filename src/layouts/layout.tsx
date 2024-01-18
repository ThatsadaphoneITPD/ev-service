import FloatingCart from '@/app/shared/floating-cart';
import Header from '@/layouts/header';
import Sidebar from '@/layouts/sidebar';
import { EServiceHeader } from './e-service-header';
import { EServiceFooter } from './e-service-footer';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <main className="min-h-screen flex-grow">
        {/* <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" /> */}
        <div className="flex w-full flex-col">
          {/* <Header /> */}
          <EServiceHeader />
          <div className="flex flex-grow flex-col @container">
            {children}
          </div>
        </div>
        <EServiceFooter />
      </main>
      {/* <FloatingCart /> */}

    </>
  );
}
