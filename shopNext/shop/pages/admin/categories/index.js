import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function CategoriesPage({ categories }) {
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteCategoryById(id){
        const res = await ApiClient.deleteCategoryByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }

return(
    <div className="flex flex-col">
            <table>
            <thead>
                <tr className="bg-purple-900 text-white text-xl leading-normal">
                    <th className="w-1/12 py-4 pl-10 text-left">Title</th>
                    <th className="w-1/4 py-4 text-left">Description</th>
                    <th className="w-1/5 py-4 text-left">UUID</th>
                    <th className="w-1/12 py-4 text-left">Edit</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
            {categories.map((categories) => (
                <tr key={categories.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-1 pl-10 text-left font-semibold text-lg">
                            <span>{categories.title}</span>
                    </td>
                    <td className="py-1 text-left font-semibold text-md whitespace-nowrap">
                            <span>{categories.description}</span>
                    </td>
                    <td className="py-1 text-left text-lg">
                            <span>{categories.id}</span>
                    </td>
                    <td className="py-1">
                        <div className="flex">
                            <a href={Routes.ADMIN_CREATE_CATEGORY_ROUTE} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <FontAwesomeIcon icon={Icons.faPencilAlt} />
                            </a>
                            <div onClick={() => deleteCategoryById(categories.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <FontAwesomeIcon icon={Icons.faTrashAlt} />
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

CategoriesPage.Layout = AdminLayout;

export async function getStaticProps() {
    const categories = await ApiClient.getCategoriesAsync();
    console.log(categories);
    return {
      props: {
         categories
      },
    }
  }