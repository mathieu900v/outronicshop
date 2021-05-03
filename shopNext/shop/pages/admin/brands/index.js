import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function BrandsPage({ brands }) {
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteBrandById(id){
        const res = await ApiClient.deleteBrandByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }

    return(
            <div className="flex flex-col">
            <table>
                    <thead>
                        <tr className="bg-purple-900 text-white text-xl leading-normal">
                            <th className="py-4 pl-10 text-left">Image</th>
                            <th className="py-4 text-left">Name</th>
                            <th className="py-4 text-left">UUID</th>
                            <th className="py-4 text-left">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                    {brands.map((brand) => (
                        <tr key={brand.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-1 pl-10 text-left whitespace-nowrap">
                                <div className="flex items-center text-left">                                    
                                    <img className="h-10" src={brand.imgUrl}></img>
                                </div>
                            </td>
                            <td className="py-1 text-left font-semibold text-lg">
                                    <span>{brand.name}</span>
                            </td>
                            <td className="py-1 text-left text-lg">
                                    <span>{brand.id}</span>
                            </td>
                            <td className="py-1">
                                <div className="flex">
                                    <a href={Routes.ADMIN_CREATE_BRAND_ROUTE} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </a>
                                    <div onClick={() => deleteBrandById(brand.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
  );
}

BrandsPage.Layout = AdminLayout;

export async function getStaticProps() {
    const brands = await ApiClient.getBrandsAsync();
    console.log(brands);
    return {
      props: {
         brands
      },
    }
  }