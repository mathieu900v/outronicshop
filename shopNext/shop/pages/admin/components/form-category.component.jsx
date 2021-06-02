import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api';
import ReturnButton from '../components/return-button.component'
import AlertMessage from '../components/alert-message.component'
import { NIL as NIL_UUID } from 'uuid';

export default function dataCategory({data, closeEvent, categories}){
    const isNew = data == null;
    
    const [title, setTitle] = useState(isNew ? "" : data.title ?? "");
    const [description, setDescription] = useState(isNew ? "" : data.description ?? "");
    const [idParent, setIdParent] = useState(isNew ? NIL_UUID : data.idParent ?? NIL_UUID);
    const [alert, setAlert] = useState({msg: null, isError: false});

    async function handledataSubmission(event) {
        event.preventDefault();
        if(title === undefined && !data){
            setAlert({msg: "Please fill title input.", isError: true});
            return;
        }
        if(description === undefined && !data){
            setAlert({msg: "Please fill description input.", isError: true});
            return;
        }
        if(idParent === undefined) {
            setAlert({msg: "GUID is invalid", isError: true});
            return;
        }
        if(isNew){
            let res = await ApiClient.createCategoryAsync({
                title: title,
                description: description,
                idParent: idParent
            });
            
            if(res.status != 201){
                setAlert({msg: await res.text(), isError: true});
            } else{
                setAlert({msg: "New category created successfully !", isError: false});
            }
            return;
        }
        let res = await ApiClient.updateCategoryAsync({
            id: data.id,
            title: title,
            description: description,
            idParent: idParent
        });
        if(res.status != 200){
            setAlert({msg: await res.text(), isError: true});
        } else{
            setAlert({msg: "Category updated successfully !", isError: false});
        }
    }

    return(
      <div className="h-full bg-gray-900 flex items-center justify-center p-20">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden">
            <div className="md:flex w-full h-full">
                <form onSubmit={async (event) => await handledataSubmission(event)} className="flex flex-col justify-center w-full py-10 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-purple-900">{isNew ? "Create" : "Update"} a <b>Category</b></h1>
                    </div>
                    {alert != null ? <AlertMessage message={alert.msg} isError={alert.isError}/> : ""}
                    <div className="flex flex-row">
                        <div className="flex w-1/2">
                            <div className="w-full px-3 mb-2">
                                <label for="" className="text-xs font-semibold px-1">Category Title<span className="text-sm text-red-500 font-bold">*</span></label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faTags} /></div>
                                    <input type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.title : "Category title"} defaultValue={isNew ? "" : data.title} onChange={e => setTitle(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/2">
                            <div className="w-full px-3 mb-2">
                                <label for="" className="text-xs font-semibold px-1">Parent Category<span className="text-sm text-red-500 font-bold">*</span></label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faDatabase} /></div>
                                    <select onChange={e => setIdParent(e.target.value)} className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500">
                                        <option value={NIL_UUID}>Main Category</option>
                                        {categories.map((category) => (
                                            <option selected={!isNew && data.idParent != NIL_UUID && category.id == data.idParent ? true : false} value={category.id} className="border-b border-gray-200 hover:bg-gray-100">{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-3 mb-5">
                        <label for="" className="text-xs font-semibold px-1">Description<span className="text-sm text-red-500 font-bold">*</span></label>
                        <div className="flex">
                            <textarea rows="6" className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.description : "Category description"} defaultValue={isNew ? "" : data.description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <button className="cursor-pointer flex justify-center w-full max-w-xs mx-auto bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg px-3 py-3 font-semibold">{isNew ? "Create" : "Update"}</button>
                            </div>
                    </div>
                </form>
            </div>
        </div>
        <ReturnButton event={closeEvent}/>
    </div>
    )
}
