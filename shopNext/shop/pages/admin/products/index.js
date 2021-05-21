import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { useState, useEffect } from 'react';
import FormProduct from '../components/form-product.component'
import ListProduct from '../components/list-product.component'
import Image from 'next/image'

export default function ProductsPage({ initProducts, initBrands, initCategories }) {

    const states = {
        LIST: 1,
        FORM: 2,
        LOADING: 3
    }
    const[currentProduct, setCurrentProduct] = useState();
    const[currentState, setCurrentState] = useState(states.LIST);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/icons/spinner.svg" className="fixed bottom-4 left-64"/>;

    useEffect(() => {
        setIsRefreshing(false);
    }, [initProducts,
        initBrands,
        initCategories]);

    function refreshData () {
        router.replace(router.asPath);
        setIsRefreshing(true);
    };

    function toggleForm(product){
        setCurrentState(states.FORM);
        setCurrentProduct(product);
    }
    function closeForm() {
        setCurrentState(states.LIST);
        setCurrentProduct(null);
        refreshData();
    }

    switch(currentState) {
      case states.LIST:
          return(
          <>
              <ListProduct products={initProducts} toggleFormEvent={toggleForm} refreshData={refreshData}/>
              {isRefreshing ? <Spinner/> : ""}
          </>
          );
      case states.FORM:
          return(<FormProduct data={currentProduct} closeEvent={closeForm} brands={initBrands} categories={initCategories}/>);
  }
}

ProductsPage.Layout = AdminLayout;

export async function getStaticProps() {
    const initProducts = await ApiClient.getProductsAsync();
    const initBrands = await ApiClient.getBrandsAsync();
    const initCategories = await ApiClient.getCategoriesAsync();
    return {
      props: {
         initProducts,
         initBrands,
         initCategories
      },
    }
  }