import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
export default function EditButton({event}){
    return(
        <button onClick={event} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
            <FontAwesomeIcon icon={Icons.faPencilAlt} />
        </button>
    )
}