import UserTable from './users-table';
import { UsersData } from './user-types/users-data';

interface Props {

}

const page = (props: Props) => {
    return (
        <div>
            <UserTable data={UsersData} />
        </div>
    )
}

export default page
