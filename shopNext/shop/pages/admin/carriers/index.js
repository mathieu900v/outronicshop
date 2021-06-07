import { useRouter } from 'next/router';
import AdminLayout from '../layouts/admin.layout'
import ApiClient from '../../modules/api/client-api';
import { useState, useEffect } from 'react';
//import FormCarrier from '../components/form-carrier.component'
import ListCarrier from '../components/list-carrier.component'
import Image from 'next/image'

export default function CarriersPage({ initCarriers }) {

    const states = {
        LIST: 1,
        FORM: 2,
        LOADING: 3,
    }
    const[currentCarrier, setCurrentCarrier] = useState();
    const[currentState, setCurrentState] = useState(states.LIST);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Spinner = () => <img src="/spinner.svg" className="fixed bottom-4 left-64"/>;

    useEffect(() => {
        setIsRefreshing(false);
    }, [initCarriers]);

    function refreshData () {
        router.replace(router.asPath);
        setIsRefreshing(true);
    };

    function toggleForm(carriers){
        setCurrentState(states.FORM);
        setCurrentCarrier(carriers);
    }
    function closeForm() {
        setCurrentState(states.LIST);
        setCurrentCarrier(null);
        refreshData();
    }

    switch(currentState) {
        case states.LIST:
            return(
            <>
                <ListCarrier carriers={initCarriers} toggleFormEvent={toggleForm} refreshData={refreshData}/>
                {isRefreshing ? <Spinner/> : ""}
            </>
            );
        case states.FORM:
            //return(<FormCarrier data={currentCarrier} closeEvent={closeForm}/>);
    }
}

CarriersPage.Layout = AdminLayout;

export async function getStaticProps() {
    const initCarriers = await ApiClient.getCarriersAsync();
    return {
      props: {
         initCarriers
      },
    }
}