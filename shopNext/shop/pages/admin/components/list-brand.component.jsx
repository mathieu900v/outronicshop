import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api'
import AddButton from './add-button.component'

export default function listBrand({brands, toggleFormEvent, refreshData}) {

    async function deleteBrandById(id){
        const res = await ApiClient.deleteBrandByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }
    return(
        <>
        <div className="flex flex-col">
            <table>
                <thead>
                    <tr className="bg-purple-900 text-white text-xl leading-normal">
                        <th className="py-4 pl-10 text-left">Image</th>
                        <th className="py-4 text-left">Name</th>
                        <th className="py-4 text-left">UUID</th>
                        <th className="w-1/12 py-4 text-left">Edit</th>
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
                        <button onClick={() => toggleFormEvent(brand)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                            <FontAwesomeIcon icon={Icons.faPencilAlt} />
                        </button>
                        <button onClick={async () => await deleteBrandById(brand.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                            <FontAwesomeIcon icon={Icons.faTrashAlt} />
                        </button>
                    </div>
                </td>
            </tr>
        ))}
            </tbody>
            </table>
        </div>
        <AddButton event={() => toggleFormEvent(null)}/>
        </>
    )
}