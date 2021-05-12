import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
export default function AlertMessage({message, isError}){
    
    if(isError) {
        return (
            <div className="flex flex-row items-center text-red-500">
                <FontAwesomeIcon icon={Icons.faExclamationTriangle} />
                <p className="pl-2 font-bold">{message}</p>
            </div>
        )
    }
    else if(message != null){
        return(
            <div className="flex flex-row items-center text-green-500">
                <FontAwesomeIcon icon={Icons.faCheck} />
                <p className="pl-2 font-bold">{message}</p>
            </div>
        )
    }
    else {
        return(<></>)
    }
}