import AdminLayout from '../layouts/admin.layout';
import { useRouter } from 'next/router';
import EditFormBrand from '../components/edit-form-brand.component'

export default function CreateBrandPage(brands) {
    const router = useRouter();

    return(
      <EditFormBrand form={'Brand'} attributes={brands} data={undefined}/>
  );
}

CreateBrandPage.Layout = AdminLayout;
