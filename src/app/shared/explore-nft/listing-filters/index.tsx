'use client';

import { useEffect, useState } from 'react';

import cn from '@/utils/class-names';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useSearchParams } from 'next/navigation';
import Filter from './filter';
import { initialState } from './filter-utils';

import { Button } from '@/components/ui/button';
import { PiTrashDuotone } from 'react-icons/pi';
import { Tags } from './tags';

export default function ListingFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const { state, applyFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  useEffect(() => {
    const items = [];
    searchParams.forEach((item) => items.push(item));
    setHasQueryParams(Boolean(items.length));
  }, [searchParams]);

  return (
    <div
      className={cn(
        'flex items-center justify-end gap-5 lg:justify-between',
        className
      )}
    >
      <Tags className="hidden lg:flex" />
      <div className="flex items-center gap-3">
        {hasQueryParams && (
          <Button
            type="button"
            className="hidden h-[42px] rounded-full lg:flex"
            variant="flat"
            onClick={() => reset()}
          >
            <PiTrashDuotone className="me-2 h-5 w-5" />
            Clear
          </Button>
        )}
        <Filter
          className="ms-auto hidden rounded-full lg:flex"
          state={state}
          applyFilter={applyFilter}
        />
      </div>
    </div>
  );
}
