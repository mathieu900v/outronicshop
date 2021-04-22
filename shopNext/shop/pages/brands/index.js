import { useRouter } from 'next/router';

export default function Home({ brands }) {
    const router = useRouter();
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteBrandByName(name){
        const res = await fetch(
            'http://localhost:5001/api/brands/delete',
            {
              body: JSON.stringify({
                name: name
              }),
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            }
          )
          if(res.status < 300){
            refreshData();
          }
    }

    return(
            <div class="">
                <div class="flex min-h-screen">
                    <nav class="w-64 flex-shrink-0">
                        <div class="flex-auto bg-gray-900 h-full">
                            <ul class="relative m-0 p-0 list-none h-full">
                            <li class="text-white text-2xl p-4 w-full flex relative shadow-sm justify-start bg-gray-800 border-b-2 border-gray-700">
                                OUTRONIC
                            </li>
                            <li class="text-purple-400 flex relative p-3 hover:bg-gray-700 cursor-pointer">
                                <div class="mr-4 my-auto">
                                <svg class="fill-current h-5 w-5" focusable="true" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
                                </div>
                                <div class="flex-auto my-1">
                                <span>Brands</span>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="flex flex-col w-full">
                    <table class="">
                            <thead>
                                <tr class="bg-gray-200 text-gray-600 text-xl leading-normal">
                                    <th class="py-4 px-4 text-left">BrandImg</th>
                                    <th class="py-4 px-4 text-left">Name</th>
                                    <th class="py-4 px-4 text-left">Id</th>
                                    <th class="py-4 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm font-light">
                            {brands.map((brand) => (
                                <tr class="border-b border-gray-200 hover:bg-gray-100">
                                    <td class="py-3 px-4 text-left whitespace-nowrap">
                                        <div class="flex items-center text-left">                                    
                                            <img class="h-10" src={brand.imgUrl}></img>
                                        </div>
                                    </td>
                                    <td class="py-3 px-4 text-left whitespace-nowrap">
                                        <div class="flex items-center text-center">
                                            <span class="pl-3 font-semibold text-lg">{brand.name}</span>
                                        </div>
                                    </td>
                                    <td class="py-3 px-4 text-left text-lg">
                                            <span>{brand.id}</span>
                                    </td>
                                    <td class="py-3 px-4">
                                        <div class="flex">
                                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                            <div onClick={() => deleteBrandByName(brand.name)} class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:5001/api/brands')
  const brands = await res.json()
  return {
    props: {
      brands,
    },
  }
}
