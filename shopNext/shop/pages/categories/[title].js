import { useRouter } from 'next/router';
import { useState } from 'react';
import ListProduct from '../components/list-product.component';
import NavBar from '../components/navBar.component';
import UserLayout from '../layouts/user.layout';
import ApiClient from '../modules/api/client-api';


export default function CategoryPage({products, initCategories}) {

  return(<>
    <NavBar categories={initCategories}/>
    <ListProduct currentProducts={products}/>
  </>)
}
  
CategoryPage.Layout = UserLayout;



// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get
    const initCategories = await ApiClient.getCategoriesAsync();
  
    // Get the paths we want to pre-render based on posts
    const paths = initCategories.map((category) => ({
      params: { title: category.title.toLowerCase() },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

  export async function getStaticProps(context) {
    const {title} = context.params;
    let currentCategories = await ApiClient.getCategoriesAsync({search: title, strict: true});
    let products = await ApiClient.getProductsByCategoryAsync(currentCategories[0].id);
    const initCategories = await ApiClient.getCategoriesAsync();
    return {
      props: {
        products,
        initCategories
      },
    }
  }