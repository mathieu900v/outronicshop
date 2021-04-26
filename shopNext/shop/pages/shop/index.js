import { useRouter } from 'next/router';
import HomeLayout from './layouts/home.layout'
import * as ApiClient from '../modules/api/client-api';
import * as Routes from '../modules/routes/home-routes';

export default function HomePage({ home }) {
    const router = useRouter();

    return(

    <div>
        aa
    </div>

    );
}

HomeLayout.Layout = HomeLayout;
