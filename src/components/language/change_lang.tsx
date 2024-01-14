'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import Image from 'next/image';

function DropdownMenu() {
  return (
    <div className="w-32 text-left rtl:text-right">
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
          <Link
            key={1}
            href={'#'}
            className="group my-0.5 flex items-center rounded-md py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
          <Image src='/flags/la.png' alt='lao-icon' height={20} width={20} className='mr-2'/>ພາສາລາວ
          </Link>
          <Link
            key={2}
            href={'#'}
            className="group my-0.5 flex items-center rounded-md py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            <Image src='/flags/us.png' alt='lao-icon' height={20} width={20} className='mr-2'/>ພາສາອັງກິດ
          </Link>
       
      </div>
     
    </div>
  );
}

export default function ChangeLanguage({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
      >
       <GrLanguage className='ml-3' size={20} />
       
      </button>
    </Popover>
  );
}
