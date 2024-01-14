'use client';

import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/text';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon } from '@/components/ui/action-icon';
import { PiXBold } from 'react-icons/pi';
import hasSearchedParams from '@/utils/has-searched-params';
import { initialState, getOptionByValue, filterOptions } from './filter-utils';
import Select from '@/components/ui/select';
import { Tags } from './tags';

export default function FilterDrawerView() {
  const { state, reset, applyFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const { closeDrawer } = useDrawer();

  return (
    <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-100">
      <div className="-mx-5 mb-6 flex items-center justify-between border-b border-gray-200 px-4 pb-4">
        <Title as="h5" className="font-semibold">
          Filters
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          onClick={() => closeDrawer()}
        >
          <PiXBold className="h-4 w-4" />
        </ActionIcon>
      </div>

      <div className="min-h-[calc(100%-10rem)] space-y-9">
        <Tags title="Tags" />
        <Select
          label="Filter"
          placeholder={'Filter'}
          selectClassName="h-[42px] min-w-[150px] "
          dropdownClassName="p-1.5"
          optionClassName="h-9"
          options={filterOptions}
          onChange={(option: any) => applyFilter('filter', option.value)}
          value={getOptionByValue(state['filter'], filterOptions)}
        />
      </div>
      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-100">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            className="w-full dark:bg-gray-100 dark:text-white"
            onClick={() => {
              reset();
              closeDrawer();
            }}
          >
            Reset All
          </Button>
        ) : null}
        <Button
          size="lg"
          onClick={() => closeDrawer()}
          className="w-full capitalize dark:bg-gray-200 dark:text-white dark:active:bg-gray-200"
        >
          Show results
        </Button>
      </div>
    </div>
  );
}
