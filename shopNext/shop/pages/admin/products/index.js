import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import FormProduct from '../components/form-product.component'

export default function ProductsPage({ products }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState({state: false});
  const [isCreating, setIsCreating] = useState({state: false});
  const refreshData = () => {
    router.replace(router.asPath);
  }

  async function deleteProductById(id){
      const res = await ApiClient.deleteProductByIdAsync(id);
        if(res.status < 300){
          refreshData();
        }
  }
function createProduct(){
    setIsCreating({state: true})
}
function updateProduct(product){
    setIsUpdating({state: true, value: product});
}
if(isCreating.state){
    return (<FormProduct data={undefined}/>)
}
else if(isUpdating.state){
    return (<FormProduct data={isUpdating.value}/>)
} else {
return(
    <section className="text-gray-600 body-font">
    <div className="container px-5 pt-8 mx-auto">
        <div className="flex flex-wrap -m-4">
            {products.map((product) => (<div className="cursor-pointer lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-transparent rounded-lg hover:border-purple-500 hover:bg-gray-50">
                <a className="block relative h-48 rounded overflow-hidden">
                <img alt="product-image" class="object-cover object-center w-full h-full block" src={product.imgUrl}/>
                </a>
                <div className="mt-4">
                    <h2 className="text-purple-800 title-font text-lg font-medium">{product.title}</h2>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.description}</h3>
                    <div className="flex flex-row justify-between"><p className="mt-1 font-semibold text-lg">{product.price} €</p><p className="mt-1">#{product.sku}</p></div>
                </div>
            </div>
            ))}
            <button onClick={() => createProduct()} class="ml-4 my-auto flex pb-3 px-4 text-white bg-green-400 border-0 align-top focus:outline-none hover:bg-green-500 rounded text-5xl">+</button>
        </div>
    </div>
    
</section>
);
}
}

ProductsPage.Layout = AdminLayout;

export async function getStaticProps() {
    const products = await ApiClient.getProductsAsync();
    console.log(products);
    return {
      props: {
         products
      },
    }
  }