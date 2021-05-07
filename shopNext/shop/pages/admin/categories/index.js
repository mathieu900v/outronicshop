import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import FormCategory from '../components/form-category.component'
import AddButton from '../components/add-button.component'
import EditButton from '../components/edit-button.component'

export default function CategoriesPage({ categories }) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState({state: false});
    const [isCreating, setIsCreating] = useState({state: false});
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteCategoryById(id){
        const res = await ApiClient.deleteCategoryByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }
    
    function createCategory(){
        setIsCreating({state: true})
    }
    function updateCategory(category){
        setIsUpdating({state: true, value: category});
    }
    if(isCreating.state){
        return (<FormCategory data={undefined}/>)
    }
    else if(isUpdating.state){
        return (<FormCategory data={isUpdating.value}/>)
    } else { 
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
                    {categories.map((category) => (
                        <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-1 pl-10 text-left font-semibold text-lg">
                                    <span>{category.title}</span>
                            </td>
                            <td className="py-1 text-left font-semibold text-md whitespace-nowrap">
                                    <span>{category.description}</span>
                            </td>
                            <td className="py-1 text-left text-lg">
                                    <span>{category.id}</span>
                            </td>
                            <td className="py-1">
                                <div className="flex">
                                    <EditButton event={updateCategory}/>
                                    <button onClick={() => deleteCategoryById(category.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <AddButton event={createCategory}/>
            </div>
    );
    }
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