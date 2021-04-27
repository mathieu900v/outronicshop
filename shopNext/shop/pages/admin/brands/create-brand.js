import AdminLayout from '../layouts/admin.layout';
import { useRouter } from 'next/router';
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';

export default function CreateBrandPage({ brand }) {
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteBrandById(id){
        await ApiClient.deleteBrandByIdAsync(id);
        router.push(Routes.ADMIN_ALL_BRANDS_ROUTE);
    }

    return(
  );
}

CreateBrandPage.Layout = AdminLayout;

export async function getStaticProps() {
  const brands = await ApiClient.getBrandsAsync();
  return {
    props: {
      brands,
    },
  }
}
