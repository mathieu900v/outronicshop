import { useRouter } from 'next/router';
import HomeLayout from './layouts/home.layout'
import ApiClient from '../modules/api/client-api';
import Routes from '../modules/routes/home-routes';

export default function HomePage({ props }) {
    const router = useRouter();

    return(

    <div>
        aa
    </div>

    );
}

HomePage.Layout = HomeLayout;
