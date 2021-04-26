import Image from 'next/image'
export default function NavBar({props}){
    return(

    <nav class="w-64 fixed h-screen">
        <div class="fixed flex flex-col top-0 left-0 w-64 bg-gray-900 h-full shadow-lg">
            <div class="flex items-center pl-6 h-20 border-b border-gray-800">
                <img src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t1.0-9/117334168_2606581056324669_4951020710334194218_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFo4bRKc5SfTQvzhwotnTaOfj1P6rO41HF-PU_qs7jUcU1pCerqu3HUsOB0yKyJQwnrgz8Au7GZADcpedo6WgM4&_nc_ohc=DWpkI3p4RSUAX_hKF_Y&_nc_ht=scontent.fmnl13-1.fna&oh=c13c63ee952123b14f0da72b99ccecc8&oe=6087FEC5" alt="" class="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500"></img>
                <div class="ml-1">
                    <p class="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">ADMIN NAME</p>
                    <div class="badge">
                        <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Admin</span>
                    </div>
                </div>
            </div>
            <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <ul class="flex flex-col py-6 space-y-1">
                <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                    <img src="/icons/home-solid.svg" width="18" height="18" class="filter-gray ml-4"></img>
                    <span class="font-semibold text-sm text-gray-300 my-4 mx-2 font-sans uppercase">Home</span></a>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8 justify-between">
                        <span class="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Products</span>
                        <div class="flex flex-row"> 
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" class="m-2"></img>
                            </a>  
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" class="m-2"></img>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8 justify-between">
                        <span class="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Categories</span>
                        <div class="flex flex-row"> 
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" class="m-2"></img>
                            </a>  
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" class="m-2"></img>
                            </a>
                        </div>
                    </div>
                </li><li class="px-5">
                    <div class="flex flex-row items-center h-8 justify-between">
                        <span class="font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Brands</span>
                        <div class="flex flex-row"> 
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/list-ul-solid.svg" width="22" height="22" class="m-2"></img>
                            </a>  
                            <a href="#" class="relative flex flex-row items-center h-10 focus:outline-none filter-gray-hover">
                                <img src="/icons/plus-solid.svg" width="20" height="20" class="m-2"></img>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="px-5">
                <div class="flex flex-row items-center h-8">
                    <div class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Website</div>
                </div>
                </li>
                <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-purple-500 pr-6">
                    <img src="/icons/sign-out-alt-solid.svg" width="18" height="18" class="filter-gray ml-4"></img>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Logout</span></a>
                </li>
                <li>
                    <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6">
                    <img src="/icons/sign-out-alt-solid.svg" width="18" height="18" class="filter-gray ml-4"></img>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Logout</span></a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

    )
}