// import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import Edlservice from './edl-eservice/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <Edlservice />;
}
