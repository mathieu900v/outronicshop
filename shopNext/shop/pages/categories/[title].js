import DefaultPage from '../index'
import UserLayout from '../layouts/user.layout';
import ApiClient from '../modules/api/client-api';


export default function CategoryPage({initProducts, initBrands, initCategories}) {
  
      return(<DefaultPage initBrands={initBrands} initProducts={initProducts} initCategories={initCategories}/>)
}
  
CategoryPage.Layout = UserLayout;



// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const initCategories = await ApiClient.getCategoriesAsync();
  
    // Get the paths we want to pre-render based on posts
    const paths = initCategories.map((category) => ({
      params: { title: category.title },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

  export async function getStaticProps() {
    const initProducts = await ApiClient.getProductsAsync();
    const initCategories = await ApiClient.getCategoriesAsync();
    const initBrands = await ApiClient.getBrandsAsync();
    return {
      props: {
        initProducts,
        initBrands,
        initCategories
      },
    }
  }