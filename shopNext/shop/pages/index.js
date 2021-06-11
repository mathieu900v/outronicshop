import { useRouter } from 'next/router';
import UserLayout from './layouts/user.layout';
import ApiClient from './modules/api/client-api';
import { useState, useEffect } from 'react';
import ListProduct from './components/list-product.component'
import PreviewProduct from './components/preview-product.component'
import NavBar from './components/navBar.component'
import ReturnButton from './components/return-button.component'
import Image from 'next/image'

export default function DefaultPage({ initProducts, initBrands, initCategories }) {

    const states = {
        LIST: 1,
        PRODUCT: 2,
        LOADING: 3
    }
    const[currentProduct, setCurrentProduct] = useState();
    const[currentState, setCurrentState] = useState(states.LIST);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/spinner.svg" className="fixed bottom-4 left-4"/>;

    useEffect(async () => {
        setIsRefreshing(false);
    }, [initProducts,
        initBrands,
        initCategories]);

    function refreshData () {
        router.replace(router.asPath);
        setIsRefreshing(true);
    };

    function toggleProduct(product){
        setCurrentState(states.PRODUCT);
        setCurrentProduct(product);
    }
    function closeProduct() {
        setCurrentState(states.LIST);
        setCurrentProduct(null);
    }
    switch(currentState) {
      case states.LIST:
          return(
          <>
              <NavBar categories={initCategories}/>
              <ListProduct currentProducts={initProducts} toggleProductEvent={toggleProduct} refreshData={refreshData}/>
              {isRefreshing ? <Spinner/> : ""}
          </>
          );
      case states.PRODUCT:
          return(<>
                <PreviewProduct data={currentProduct} brands={initBrands} categories={initCategories}/>
                <ReturnButton event={closeProduct}/>
          </>);
  }
}

DefaultPage.Layout = UserLayout;

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