import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
export default function ReturnButton({event}){
    return(
        <a onClick={event} className="cursor-pointer bottom-4 right-4 fixed flex pb-4 pt-1 px-5 text-white bg-gray-400 border-0 align-top focus:outline-none hover:bg-gray-500 rounded text-3xl"><FontAwesomeIcon className="mt-3" icon={Icons.faArrowLeft} /></a>
    )
}