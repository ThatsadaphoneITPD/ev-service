'use client';

// import Link from 'next/link';
// import { type ServiceCenter } from '@/data/users-data';
// import { routes } from '@/config/routes';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { User } from '../user-types/users-data';
import { departments } from '../user-types/user-enum';
import ModalButton from '@/app/shared/modal-button';
import EditUser from '../edit-user';


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
          USID
        </div>
      ),
      dataIndex: 'id',
      key: 'checked',
      width: 30,
      render: (_: any, row: User) => (
        <div className="inline-flex ps-4">
          #{row.id}
        </div>
      ),
    },
    {
      title: <HeaderCell title="ຜູ້ໃຊ້" />,
      dataIndex: 'id',
      key: 'name',
      width: 250,
      hidden: 'Name',
      render: (_: string, serviceCenter: User) => (
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
          title="ຝ່າຍ"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'Depart'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('department'),
      dataIndex: 'id',
      key: 'department',
      width: 250,
      render: (_: any, row: User) => (
        <div className="inline-flex ps-4">
          {departments[row.department]}
        </div>
      ),
    },

    {
      title: (
        <HeaderCell
          title="ພະແນກ/ສາຂາ"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'Div'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('division'),
      dataIndex: 'id',
      key: 'division',
      width: 250,
      render: (_: any, row: User) => (
        <div className="inline-flex ps-4">
          {row.division}
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="ໝ່ວຍງານ"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'unit'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('unit'),
      dataIndex: 'id',
      key: 'unit',
      width: 250,
      render: (_: any, row: User) => (
        <div className="inline-flex ps-4">
          {row.unit}
        </div>
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
      render: (_: any, row: User) => (
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
      render: (_: string, user: User) => (
        <div className="flex items-center justify-end gap-3 pe-3">

          <ModalButton
            tag="span"
            size="sm"
            label=''
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
            icon={<EyeIcon className="h-4 w-4" />}
            view={<EditUser data={user} edit={false} />}
          />
          <ModalButton
            tag="span"
            size="sm"
            label=''
            variant="outline"
            className="hover:!border-gray-900 hover:text-gray-700"
            icon={<PencilIcon className="h-4 w-4" />}
            view={<EditUser data={user} edit={true} />}
          />
          <DeletePopover
            title={`Delete this user`}
            description={`Are you sure you want to delete this #${user.id} user?`}
            onDelete={() => onDeleteItem(user.id)}
          />

        </div>
      ),
    },
  ];
