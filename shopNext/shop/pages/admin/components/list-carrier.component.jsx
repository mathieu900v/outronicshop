import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api'
import AddButton from './add-button.component'
import { NIL as NIL_UUID } from 'uuid';

export default function ListCarrier({carriers, toggleFormEvent, refreshData}) {

    async function deleteCarrierById(id){
        const res = await ApiClient.deleteCarrierByIdAsync(id);
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
                        <th className="w-1/8 py-4 pl-10 text-left">Image</th>
                        <th className="w-1/8 py-4 pl-10 text-left">Title</th>
                        <th className="w-1/4 py-4 text-left">Weight</th>
                        <th className="w-1/8 py-4 text-left">Price</th>
                        <th className="w-1/12 py-4 text-left">Edit</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                {carriers.map((carrier) => (
                    <tr key={carrier.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-1 pl-10 text-left whitespace-nowrap">
                            <div className="flex items-center text-left">                                    
                                <img className="h-10" src={carrier.imgUrl}></img>
                            </div>
                        </td>
                        <td className="py-1 pl-10 text-left font-semibold text-lg">
                            <span>{carrier.title}</span>
                        </td>
                        <td className="py-1 pr-4 text-left font-semibold text-md">
                            <span className="overflow-auto">{carrier.minGrams} - {carrier.maxGrams}</span>
                        </td>
                        <td className="py-1 pr-4 text-left font-semibold text-md">
                            <span className="overflow-auto">{carrier.price}</span>
                        </td>
                        <td className="py-1">
                            <div className="flex">
                                <button onClick={() => toggleFormEvent(carrier)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                    <FontAwesomeIcon icon={Icons.faPencilAlt} />
                                </button>
                                <button onClick={async () => await deleteCarrierById(carrier.id)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                    <FontAwesomeIcon icon={Icons.faTrashAlt} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <AddButton event={() => toggleFormEvent(null)}/>
        </div>
        </>
);
}