import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function topBar({searchEvent}) {
    return(<>
        <nav className="bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
            <div className="inline-flex">
                <div className="hidden md:block">
                <Link href="/"><a><Image src="/outronic.png" alt="Logo OUTRONIC" width={240} height={42}/></a></Link>
                </div>
                <div className="block md:hidden">
                    <Link href="/"><a><Image src="/logo400.png" alt="Logo OUTRONIC small" width={42} height={42}/></a></Link>
                </div>
            </div>

            <div className="hidden sm:flex px-4">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faSearch} /></div>
                <form><input name="search" type="text" className="w-80 -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder="Search..." onSubmit={e => searchEvent(e.target.value, false)}/></form>
            </div>

            <div className="flex-initial">
                <div className="flex justify-end items-center relative">
                    <div className="flex mr-4 items-center">
                        <a className="inline-block py-1 px-2 hover:border-purple-500 border-b-2 border-purple-300" href="/admin/">
                            <div className="flex items-center relative cursor-pointer whitespace-nowrap">Se connecter</div>
                        </a>
                        <div className="inline-block pl-4">
                            <a href="/cart/" className="text-2xl cursor-pointer whitespace-nowrap text-purple-500 hover:text-purple-800">
                                <FontAwesomeIcon icon={Icons.faShoppingCart} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}