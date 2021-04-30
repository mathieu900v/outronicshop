import AdminLayout from '../layouts/admin.layout';
import { useRouter } from 'next/router';
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';
import EditForm from '../components/brands/edit-form.brands.component'

export default function CreateBrandPage(props) {
    const router = useRouter();

    return(
      <EditForm isNew={true}/>
  );
}

CreateBrandPage.Layout = AdminLayout;
