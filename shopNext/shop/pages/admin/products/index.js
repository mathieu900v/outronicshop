import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import Routes from '../../modules/routes/admin-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function ProductsPage({ products }) {
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    async function deleteCategoryById(id){
        const res = await ApiClient.deleteCategoryByIdAsync(id);
          if(res.status < 300){
            refreshData();
          }
    }

return(
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-16 mx-auto">
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
            ))}</div>
    </div>
</section>
);
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