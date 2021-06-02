import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function navBar({categories, setCurrentCategory}) {

    return(<>

        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row">
                <nav className="font-semibold md:ml-auto md:mr-auto flex flex-wrap items-center text-lg justify-center">
                {categories.map((category) => (
                <Link href={{ pathname: `/categories/${category.title}`}}>
                    <a onClick={() => setCurrentCategory(category)} className="uppercase text-gray-600 hover:text-gray-800 -cursor-pointer inline-block mx-4 py-1 px-5 hover:border-purple-700 border-b-4 border-purple-400">
                        <span>{category.title}</span>
                    </a>
                </Link>
                ))}
                </nav>
        </div>
    </>)


}
