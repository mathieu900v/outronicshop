import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { useState, useEffect } from 'react';
import FormCategory from '../components/form-category.component'
import ListCategory from '../components/list-category.component'
import Image from 'next/image'
import SearchBar from '../components/searchbar.component';

export default function CategoriesPage({ initCategories }) {

    const states = {
        LIST: 1,
        FORM: 2,
        LOADING: 3
    }
    const[categories, setCategories] = useState(initCategories);
    const[currentCategory, setCurrentCategory] = useState();
    const[currentState, setCurrentState] = useState(states.LIST);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/spinner.svg" className="fixed bottom-4 left-64"/>;

    useEffect(() => {
        setIsRefreshing(false);
    }, [categories]);

    function refreshData (data) {
        if(data) {
            setCategories(data);
            return;
        }
        router.replace(router.asPath);
        setIsRefreshing(true);
    };

    function toggleForm(category){
        setCurrentState(states.FORM);
        setCurrentCategory(category);
    }
    function closeForm() {
        setCurrentState(states.LIST);
        setCurrentCategory(null);
        refreshData();
    }

    switch(currentState) {
        case states.LIST:
            return(
            <>
                <ListCategory categories={categories} toggleFormEvent={toggleForm} refreshData={refreshData}/>
                {isRefreshing ? <Spinner/> : ""}
            </>
            );
        case states.FORM:
            return(<FormCategory data={currentCategory} closeEvent={closeForm} categories={categories}/>);
    }
}

CategoriesPage.Layout = AdminLayout;

export async function getStaticProps() {
    const initCategories = await ApiClient.getCategoriesAsync();
    return {
      props: {
         initCategories
      },
    }
  }