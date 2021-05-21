import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({event}) {

    return(
        <div className="flex bottom-6 right-24 fixed">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faSearch} /></div>
            <input name="name" type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder="Search..." onChange={e => event(e.target.value, false)}/>
        </div>
    )
}