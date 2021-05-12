import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { useState, useEffect } from 'react';
import FormBrand from '../components/form-brand.component'
import ListBrand from '../components/list-brand.component'
import Image from 'next/image'

export default function BrandsPage({ initBrands }) {

    const[currentBrand, setCurrentBrand] = useState();
    const[currentState, setCurrentState] = useState(1);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/icons/spinner.svg" className="fixed bottom-4 left-64"/>;
    const states = {
        LIST: 1,
        FORM: 2,
        LOADING: 3,
    }

    useEffect(() => {
        setIsRefreshing(false);
    }, [initBrands]);

    function refreshData () {
        router.replace(router.asPath);
        setIsRefreshing(true);
    };


    function toggleForm(brand){
        console.log("FORM");
        setCurrentState(states.FORM);
        setCurrentBrand(brand);
    }
    function closeForm() {
        setCurrentState(states.LIST);
        setCurrentBrand(null);
        refreshData();
    }

    switch(currentState) {
        case states.LIST:
            return(
            <>
                <ListBrand brands={initBrands} toggleFormEvent={toggleForm} refreshData={refreshData}/>
                {isRefreshing ? <Spinner/> : ""}
            </>
            );
        case states.FORM:
            return(<FormBrand data={currentBrand} closeEvent={closeForm}/>);
    }
}

BrandsPage.Layout = AdminLayout;

export async function getStaticProps() {
    const initBrands = await ApiClient.getBrandsAsync();
    return {
      props: {
         initBrands
      },
    }
}