import { ServiceCentersData } from '@/data/users-data';
import ServiceCenterTable from './service-center-table';
interface Props {

}

const Page = (props: Props) => {
  return (
    <div>
      <ServiceCenterTable data={ServiceCentersData} />
    </div>
  )
}

export default Page
