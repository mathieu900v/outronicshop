import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api';
import BrandsPage from '../brands';

export default function EditFormBrand({form, attributes, data}){

    const [imgUrl, setImgUrl] = useState();
    const [name, setName] = useState();
    const [alertMessage, setAlertMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState();
    
    

    async function handleFormSubmission() {
        if(imgUrl === undefined && !form){
            setAlertMessage("Please fill imgUrl input.");
            return;
        }

        if(name === undefined && !form){
            setAlertMessage("Please fill name input.");
            return;
        }     

        if(data === undefined, form === brand){
            let res = await ApiClient.createBrandAsync({
                name: name,
                imgUrl: imgUrl
            });
    
            if(res.status != 200){
                setAlertMessage("API Error");
                setSuccessMessage("");
            } else{
                setSuccessMessage("New brand created successfully !");
                setAlertMessage("");
            }
        }
    }

    return(
      <div className="h-full bg-gray-900 flex items-center justify-center p-20">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden">
            <div className="md:flex w-full h-full">
                <div className="flex flex-col w-1/2 bg-purple-900 p-10 justify-center">
                    <img src={imgUrl} alt=""/>               
                </div>
                <form className="flex flex-col justify-center w-full md:w-1/2 py-10 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-purple-900">Create/Update <b>{form}</b></h1>
                    </div>
                    <div className="flex flex-row items-center text-red-500">
                        {alertMessage !== "" ? <FontAwesomeIcon icon={Icons.faExclamationTriangle} /> : ""}                 
                        <p className="pl-2 font-bold">{alertMessage}</p>
                    </div>
                    <div className="flex flex-row items-center text-green-500">
                        <p className="font-bold">{successMessage}</p>
                    </div>
                    <div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">{}</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faTags} /></div>
                                    <input type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={form != undefined ? form.name : "Brand name"} onChange={e => setName(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Image Url</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faLink} /></div>
                                    <input type="url" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={form != undefined ? form.imgUrl : "Brand image url"} onChange={e => setImgUrl(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <a className="cursor-pointer flex justify-center w-full max-w-xs mx-auto bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={async () => await handleFormSubmission()}>Edit/Create</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
