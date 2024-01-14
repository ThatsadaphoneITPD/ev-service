'use client';

// import Link from 'next/link';
import { type ServiceCenter } from '@/data/users-data';
// import { routes } from '@/config/routes';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';


type Columns = {
  data: any[];
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
    {
      title: (
        <div className="flex whitespace-nowrap items-center gap-3 ps-2">
          Branch ID
        </div>
      ),
      dataIndex: 'id',
      key: 'checked',
      width: 30,
      render: (_: any, row: ServiceCenter) => (
        <div className="inline-flex ps-4">
          #{row.id}
        </div>
      ),
    },
    {
      title: <HeaderCell title="Service Center" />,
      dataIndex: 'id',
      key: 'name',
      width: 250,
      hidden: 'Name',
      render: (_: string, serviceCenter: ServiceCenter) => (
        // console.log(serviceCenter)
        <AvatarCard
          src={serviceCenter.avatar}
          name={serviceCenter.name}
          description={serviceCenter.address}
        />
      ),
    },
    {
      title: (
        <HeaderCell
          title="Region"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'Region'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('region'),
      dataIndex: 'id',
      key: 'region',
      width: 250,
      render: (_: any, row: ServiceCenter) => (
        <div className="inline-flex ps-4">
          {row.region}
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Created Date"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'id',
      key: 'createdAt',
      width: 200,
      render: (value: Date) => <DateCell date={value} />,
    },

    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 140,
      render: (_: string, user: ServiceCenter) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip
            size="sm"
            content={() => 'Edit User'}
            placement="top"
            color="invert"
          >
            {/* <Link href={routes.invoice.edit(user.id)}> */}
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
            {/* </Link> */}
          </Tooltip>
          <Tooltip
            size="sm"
            content={() => 'View User'}
            placement="top"
            color="invert"
          >
            {/* <Link href={routes.invoice.details(user.id)}> */}
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
            {/* </Link> */}
          </Tooltip>
          <DeletePopover
            title={`Delete this user`}
            description={`Are you sure you want to delete this #${user.id} user?`}
            onDelete={() => onDeleteItem(user.id)}
          />
        </div>
      ),
    },
  ];
