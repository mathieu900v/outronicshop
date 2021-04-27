import Image from 'next/image'
import Routes from '../../modules/routes/admin-routes'
export default function NavBar({props}){
    return(

    <nav className="w-64 h-screen">
        <div className="flex flex-col top-0 left-0 w-full bg-gray-900 h-full shadow-lg">
            <div className="flex items-center pl-6 h-20 border-b border-gray-800">
                <img src="" alt="" className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"></img>
                <div className="ml-1">
                    <p className="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">ADMIN NAME</p>
                    <div className="badge">
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Admin</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-6 space-y-1">
                <li>
                    <a href={Routes.ADMIN_DASHBOARD_ROUTE} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                    <img src="/icons/home-solid.svg" width="18" height="18" className="filter-gray ml-4"></img>
                    <span className="font-semibold text-sm text-gray-300 my-4 mx-2 font-sans uppercase">Home</span></a>
                </li>
                <li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Products</span>
                        <div className="flex flex-row"> 
                            <a href={Routes.ADMIN_ALL_PRODUCTS_ROUTE} className="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" className="m-2"></img>
                            </a>  
                            <a href={Routes.ADMIN_CREATE_PRODUCT_ROUTE} className="flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" className="m-2"></img>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Categories</span>
                        <div className="flex flex-row"> 
                            <a href={Routes.ADMIN_ALL_CATEGORIES_ROUTE} className="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" className="m-2"></img>
                            </a>  
                            <a href="#" className="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" className="m-2"></img>
                            </a>
                        </div>
                    </div>
                </li><li className="px-5">
                    <div className="flex flex-row items-center h-8 justify-between">
                        <span className="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Brands</span>
                        <div className="flex flex-row"> 
                            <a href={Routes.ADMIN_ALL_BRANDS_ROUTE} className="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" className="m-2"></img>
                            </a>  
                            <a href="#" className="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" className="m-2"></img>
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
                    <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                    <img src="/icons/sign-out-alt-solid.svg" width="18" height="18" className="filter-gray ml-4"></img>
                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Logout</span></a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

    )
}