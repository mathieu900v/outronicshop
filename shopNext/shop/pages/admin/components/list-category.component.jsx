import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api'
import AddButton from './add-button.component'
import SearchBar from './searchbar.component'
import { NIL as NIL_UUID } from 'uuid';

export default function listCategory({categories, toggleFormEvent, refreshData}) {

    async function deleteCategoryById(id){
        const res = await ApiClient.deleteCategoryByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }

    async function getCategoriesByQuery(search, isOrdered) {
        categories = await ApiClient.getCategoriesAsync({
            search: search,
            isOrdered: isOrdered
        })
        if(categories) {
            console.log(categories);
            refreshData(categories);
        }
    }

    return(
        <>
        <div className="flex flex-col">
            <table>
                <thead>
                    <tr className="bg-purple-900 text-white text-xl leading-normal">
                        <th className="w-1/8 py-4 pl-10 text-left">Title</th>
                        <th className="w-2/3 py-4 text-left">Description</th>
                        <th className="w-1/12 py-4 text-left">Edit</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                {categories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-1 pl-10 text-left font-semibold text-lg">
                            <span>{category.title}</span>
                        </td>
                        <td className="py-1 pr-4 text-left font-semibold text-md">
                            <span className="overflow-auto">{category.description}</span>
                        </td>
                        <td className="py-1">
                            <div className="flex">
                                <button onClick={() => toggleFormEvent(category)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                    <FontAwesomeIcon icon={Icons.faPencilAlt} />
                                </button>
                                <button onClick={async () => await deleteCategoryById(category.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                    <FontAwesomeIcon icon={Icons.faTrashAlt} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <AddButton event={() => toggleFormEvent(null)}/>
            
            <SearchBar event={getCategoriesByQuery}/>
        </div>
        </>
);
}