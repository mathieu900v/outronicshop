import { useRouter } from 'next/router';
import UserLayout from './layouts/user.layout';
import ApiClient from './modules/api/client-api';
import { useState, useEffect } from 'react';
import ListProduct from './components/list-product.component'
import PreviewProduct from './components/preview-product.component'
import NavBar from './components/navBar.component'
import Image from 'next/image'

export default function DefaultPage({ initProducts, initBrands, initCategories }) {

    const states = {
        LIST: 1,
        PRODUCT: 2,
        LOADING: 3
    }
    const[currentProduct, setCurrentProduct] = useState();
    const[currentState, setCurrentState] = useState(states.LIST);
    const[currentCategory, setCurrentCategory] = useState(initCategories[-1]);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/spinner.svg" className="fixed bottom-4 left-4"/>;
    const[currentProducts, setCurrentProducts] = useState(initProducts);

    /*useEffect(async () => {
        setIsRefreshing(false);
    }, [initProducts,
        initBrands,
        initCategories]);*/

    useEffect(async () => {
        setIsRefreshing(true);
        if(currentCategory != initCategories[-1])
        {
            setCurrentProducts(await ApiClient.getProductsByCategoryAsync(0, currentCategory.id))
        }
        setIsRefreshing(false);
    }, [currentCategory]);

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
        refreshData();
    }

    switch(currentState) {
      case states.LIST:
          return(
          <>
              <NavBar categories={initCategories} setCurrentCategory={setCurrentCategory}/>
              <ListProduct currentProducts={currentProducts ?? initProducts} toggleProductEvent={toggleProduct} refreshData={refreshData}/>
              {isRefreshing ? <Spinner/> : ""}
          </>
          );
      case states.PRODUCT:
          return(<>
                <PreviewProduct data={currentProduct} brands={initBrands} categories={initCategories} closeEvent={closeProduct}/>
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