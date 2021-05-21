import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api';
import ReturnButton from '../components/return-button.component'
import AlertMessage from '../components/alert-message.component'

export default function dataBrand({data, closeEvent}){
    const isNew = data == null;
    const [imgUrl, setImgUrl] = useState(isNew ? "" : data.imgUrl ?? "");
    const [name, setName] = useState(isNew ? "" : data.name ?? "");
    const [alert, setAlert] = useState({msg: null, isError: false});

    async function handledataSubmission(event) {
        event.preventDefault();
        if(imgUrl === undefined && !data){
            setAlert({msg: "Please fill imgUrl input.", isError: true});
            return;
        }
        if(name === undefined && !data){
            setAlert({msg: "Please fill name input.", isError: true});
            return;
        }     
        if(isNew){
            let res = await ApiClient.createBrandAsync({
                name: name,
                imgUrl: imgUrl
            });
            
            if(res.status != 201){
                setAlert({msg: await res.text(), isError: true});
            } else{
                setAlert({msg: "New brand created successfully !", isError: false});
            }
            return;
        }
        let res = await ApiClient.updateBrandAsync({
            id: data.id,
            name: name,
            imgUrl: imgUrl
        });
        if(res.status != 200){
            setAlert({msg: await res.text(), isError: true});
        } else{
            setAlert({msg: "Brand updated successfully !", isError: false});
        }
    }
    return(

      <div className="h-full bg-gray-900 flex items-center justify-center p-20">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden">
            <div className="md:flex w-full h-full">
                <div className="flex flex-col w-1/2 bg-purple-900 p-10 justify-center">
                    <img className="max-w-2xl mx-auto" src={imgUrl} alt=""/>
                </div>
                <form onSubmit={async (event) => await handledataSubmission(event)} className="flex flex-col justify-center w-full md:w-1/2 py-10 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-purple-900">{isNew ? "Create" : "Update"} a <b>Brand</b></h1>
                    </div>
                    {alert != null ? <AlertMessage message={alert.msg} isError={alert.isError}/> : ""}
                    <div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Brand Name</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faTags} /></div>
                                    <input name="name" type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.name : "Brand name"} defaultValue={isNew ? "" : data.name} onChange={e => setName(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Image Url</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faLink} /></div>
                                    <input name="imgUrl" type="url" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.imgUrl : "Brand image url"} defaultValue={isNew ? "" : data.imgUrl} onChange={e => setImgUrl(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3 mb-5 flex">
                            <input type="submit" className="cursor-pointer mx-auto w-full bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg px-3 py-3 font-semibold" value={isNew ? "Create" : "Update"}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <ReturnButton event={closeEvent}/>
    </div>
    )
}
