import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import FormBrand from '../components/form-brand.component'
import AddButton from '../components/add-button.component'
import EditButton from '../components/edit-button.component'

export default function BrandsPage({ brands }) {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState({state: false});
    const [isCreating, setIsCreating] = useState({state: false});
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteBrandById(id){
        const res = await ApiClient.deleteBrandByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }

    function createBrand(){
        setIsCreating({state: true})
    }
    function updateBrand(brand){
        setIsUpdating({state: true, value: brand});
    }
    if(isCreating.state){
        return (<FormBrand data={undefined}/>)
    }
    else if(isUpdating.state){
        return (<FormBrand data={isUpdating.value}/>)
    } else {
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
                                    <EditButton event={updateBrand}/>
                                    <button onClick={async () => await deleteBrandById(brand.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <AddButton event={createBrand}/>
            </div>
        );
    }
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