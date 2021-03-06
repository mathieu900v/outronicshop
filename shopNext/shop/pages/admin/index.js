import { useRouter } from 'next/router';
import AdminLayout from './layouts/admin.layout'
import ApiClient from '../modules/api/client-api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function AdminDefaultPage({ brandsCount, categoriesCount, productsCount, carriersCount }) {

    return(<section className="text-gray-600 body-font">
    <div className="container px-5 py-16 mx-auto">
      <div className="flex flex-col text-center w-full mb-16">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">DASHBOARD</h1>
      </div>
      <div className="flex flex-wrap -m-4 text-center">
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <h2 className="title-font font-medium text-3xl text-gray-900">{brandsCount}</h2>
            <p className="leading-relaxed">Brands</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <h2 className="title-font font-medium text-3xl text-gray-900">{categoriesCount}</h2>
            <p className="leading-relaxed">Categories</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <h2 className="title-font font-medium text-3xl text-gray-900">{productsCount}</h2>
            <p className="leading-relaxed">Products</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
            <h2 className="title-font font-medium text-3xl text-gray-900">{carriersCount}</h2>
            <p className="leading-relaxed">Carriers</p>
          </div>
        </div>
      </div>
    </div>
  </section>);
}

AdminDefaultPage.Layout = AdminLayout;

export async function getStaticProps() {
  const brandsCount = await ApiClient.countBrandsAsync();
  const categoriesCount = await ApiClient.countCategoriesAsync();
  const productsCount = await ApiClient.countProductsAsync();
  const carriersCount = await ApiClient.countCarriersAsync();
  return {
    props: {
       brandsCount: brandsCount.count,
       categoriesCount: categoriesCount.count,
       productsCount: productsCount.count,
       carriersCount: carriersCount.count,
    },
  }
}
