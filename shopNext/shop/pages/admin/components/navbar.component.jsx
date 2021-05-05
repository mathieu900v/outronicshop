import Routes from '../../modules/routes/admin-routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
export default function NavBar(){
    return(

    <nav className="w-64 h-screen">
        <div className="flex flex-col top-0 left-0 w-full bg-gray-900 h-full shadow-lg">
            <div className="flex items-center pl-6 h-20 border-b border-gray-800">
                <img src="https://store-images.s-microsoft.com/image/apps.64444.14416131676512756.a4895ce9-cd8d-4c80-a13c-dd63cf1980f1.4fa73540-3bb6-4190-b96c-fc69bf560940" alt="" className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-purple-500"></img>
                <div className="ml-1">
                    <p className="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">Admin Name</p>
                    <div className="badge">
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Admin</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-6 space-y-1">
                <li>
                    <a href={Routes.ADMIN_DASHBOARD_ROUTE} className="flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                    <FontAwesomeIcon className="fa-lg ml-3" icon={Icons.faHome} />
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Home</span></a>
                </li>
                <li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Products</span>
                        <div className="flex flex-row"> 
                            <a href={Routes.ADMIN_ALL_PRODUCTS_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faList} />
                            </a>  
                            <a href={Routes.ADMIN_CREATE_PRODUCT_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faPlus} />
                            </a>
                        </div>
                    </div>
                </li>
                <li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Categories</span>
                        <div className="flex flex-row"> 
                        <a href={Routes.ADMIN_ALL_CATEGORIES_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faList} />
                            </a>  
                            <a href={Routes.ADMIN_CREATE_CATEGORY_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faPlus} />
                            </a>
                        </div>
                    </div>
                </li><li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Brands</span>
                        <div className="flex flex-row"> 
                        <a href={Routes.ADMIN_ALL_BRANDS_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faList} />
                            </a>  
                            <a href={Routes.ADMIN_CREATE_BRAND_ROUTE} className="px-2 flex flex-row items-center focus:outline-none filter-gray-hover">
                            <FontAwesomeIcon className="fa-lg" icon={Icons.faPlus} />
                            </a>
                        </div>
                    </div>
                </li>
                <li className="px-5">
                <div className="flex flex-row items-center h-8">
                    <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Website</div>
                </div>
                </li>
                <li>
                    <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6">
                    <FontAwesomeIcon className="fa-lg ml-3" icon={Icons.faSignOutAlt} />
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Logout</span></a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

    )
}