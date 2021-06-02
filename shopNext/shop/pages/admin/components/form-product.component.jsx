import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api';
import ReturnButton from '../components/return-button.component'
import AlertMessage from '../components/alert-message.component'
import { NIL as NIL_UUID } from 'uuid';

export default function dataProduct({data, closeEvent, brands, categories}){
    const isNew = data == null;

    const [sku, setSku] = useState(isNew ? "" : data.sku ?? "");
    const [title, setTitle] = useState(isNew ? "" : data.title ?? "");
    const [imgUrl, setImgUrl] = useState(isNew ? "" : data.imgUrl ?? "");
    const [description, setDescription] = useState(isNew ? "" : data.description ?? "");
    const [features, setFeatures] = useState(isNew ? "" : data.features ?? "");
    const [price, setPrice] = useState(isNew ? 0.00 : data.price ?? 0.00);
    const [brandId, setBrandId] = useState(isNew ? NIL_UUID : data.brandId ?? NIL_UUID);
    const [categoryId, setCategoryId] = useState(isNew ? NIL_UUID : data.categoryId ?? NIL_UUID);
    const [weight, setWeight] = useState(isNew ? 0 : data.weight ?? 0);
    const [deliveryFees, setDeliveryFees] = useState(isNew ? 0.00 : data.deliveryFees ?? 0.00);
    const [highlighted, setHighlighted] = useState(isNew ? false : data.highlighted ?? false);
    const [alert, setAlert] = useState({msg: null, isError: false});

    async function handledataSubmission(event) {
        event.preventDefault();
        if(sku === "" && !data){
            setAlert({msg: "Please fill SKU input.", isError: true});
            return;
        }
        if(title === "" && !data){
            setAlert({msg: "Please fill title input.", isError: true});
            return;
        }
        if(imgUrl === "" && !data){
            setAlert({msg: "Please fill imgUrl input.", isError: true});
            return;
        }
        if(description === "" && !data){
            setAlert({msg: "Please fill description input.", isError: true});
            return;
        }
        if(features === "" && !data){
            setAlert({msg: "Please fill features input.", isError: true});
            return;
        }
        if(price === 0.00 && !data){
            setAlert({msg: "Please fill price input.", isError: true});
            return;
        }
        if(weight === 0 && !data){
            setAlert({msg: "Please fill weight input.", isError: true});
            return;
        }
        if(brandId === undefined){
            setAlert({msg: "Brand GUID is invalid.", isError: true});
            return;
        }
        if(categoryId === undefined){
            setAlert({msg: "Category GUID is invalid.", isError: true});
            return;
        }
        if(isNew){
            let res = await ApiClient.createProductAsync({
                sku: sku,
                title: title,
                imgUrl: imgUrl,
                description: description,
                features: features,
                price: price,
                brandId: brandId,
                categoryId: categoryId,
                weight: weight,
                deliveryFees: deliveryFees,
                highlighted: highlighted
            });
            
            if(res.status != 201){
                setAlert({msg: await res.text(), isError: true});
            } else{
                setAlert({msg: "New product created successfully !", isError: false});
            }
            return;
        }
        let res = await ApiClient.updateProductAsync({
            id: data.id,
            sku: sku,
            title: title,
            imgUrl: imgUrl,
            description: description,
            features: features,
            price: price,
            brandId: brandId,
            categoryId: categoryId,
            weight: weight,
            deliveryFees: deliveryFees,
            highlighted: highlighted
        });
        if(res.status != 200){
            setAlert({msg: await res.text(), isError: true});
        } else{
            setAlert({msg: "Product updated successfully !", isError: false});
        }
        
    }

    var str2bool = (value) => {                     //A REVOIR AVEC Highlighted
        if (typeof value === "string") {
             if (value.toLowerCase() === "true") return true;
             if (value.toLowerCase() === "false") return false;
        }
        return value;
     }

    return(
      <div className="h-full bg-gray-900 flex items-center justify-center p-20">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full h-full overflow-hidden">
            <div className="md:flex w-full h-full">
                <form onSubmit={async (event) => await handledataSubmission(event)} className="flex flex-col w-full py-20 px-5 md:px-10">
                    <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-purple-900">{isNew ? "Create" : "Update"} a <b>Product</b></h1>
                    </div>
                    {alert != null ? <AlertMessage message={alert.msg} isError={alert.isError}/> : ""}
                    
                    <div className="">
                        {/** DIV SKU TITLE ET PRICE */}
                        <div className="flex flex-row">
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">SKU<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faHashtag} /></div>
                                        <input type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.sku : "00-0000"} defaultValue={isNew ? "" : data.sku} onChange={e => setSku(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-grow">
                                <div className="w-full px-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Title<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faTag} /></div>
                                        <input type="text" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.title : "Title"} defaultValue={isNew ? "" : data.title} onChange={e => setTitle(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Price<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faCoins} /></div>
                                        <input type="number" min="0.00" step="0.01" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.price : "Price"} defaultValue={isNew ? "" : data.price} onChange={e => setPrice(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/** DIV BRANDS ET CATEGORIES */}
                        <div className="flex flex-row">
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Brand<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faCopyright} /></div>
                                        <select onChange={e => setBrandId(e.target.value)} className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500">
                                            <option value={NIL_UUID}>Choose a Brand</option>
                                            {brands.map((brand) => (
                                                <option selected={!isNew && data.brandId != NIL_UUID && brand.id == data.brandId ? true : false} value={brand.id} className="border-b border-gray-200 hover:bg-gray-100">{brand.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Category<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faStream} /></div>
                                        <select onChange={e => setCategoryId(e.target.value)} className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500">
                                            <option value={NIL_UUID}>Choose a Category</option>
                                            {categories.map((category) => (
                                                <option selected={!isNew && data.categoryId != NIL_UUID && category.id == data.categoryId ? true : false} value={category.id} className="border-b border-gray-200 hover:bg-gray-100">{category.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Images<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faLink} /></div>
                                        <input type="url" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.imgUrl : "Image urls separated with ,"} defaultValue={isNew ? "" : data.imgUrl} onChange={e => setImgUrl(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-2">
                                    <label for="" className="text-xs font-semibold px-1">Weight<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faWeightHanging} /></div>
                                        <input type="number" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.weight : "Weight (g)"} defaultValue={isNew ? "" : data.weight} onChange={e => setWeight(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-2">
                                    <label for="" className="text-xs font-semibold px-1">Extra fees</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><FontAwesomeIcon icon={Icons.faCoins} /></div>
                                        <input type="number" min="0.00" step="0.01" className="w-full -ml-10 pl-9 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.deliveryFees : "Extra Fees"} defaultValue={isNew ? "" : data.deliveryFees} onChange={e => setDeliveryFees(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/3">
                                <div className="w-full pr-3 mb-2">
                                    <label for="" className="text-xs font-semibold">Highlighted</label>
                                    <div className="flex">
                                        <input type="checkbox" className="cursor-pointer border-2 border-gray-200 outline-none focus:border-purple-500 form-checkbox rounded-md h-10 w-10 text-purple-500" onChange={e => {setHighlighted(e.target.checked); console.log(highlighted)} }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/** DIV DESCRIPTION ET FEATURES */}
                        <div className="flex flex-row">
                            <div className="flex w-1/2">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Features<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <textarea rows="4" className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.features : "Product features"} defaultValue={isNew ? "" : data.features} onChange={e => setFeatures(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-1/2">
                                <div className="w-full pr-3 mb-3">
                                    <label for="" className="text-xs font-semibold px-1">Description<span className="text-sm text-red-500 font-bold">*</span></label>
                                    <div className="flex">
                                        <textarea rows="4" className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" placeholder={!isNew ? data.description : "Product description"} defaultValue={isNew ? "" : data.description} onChange={e => setDescription(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/** DIV SUBMIT */}
                        <div className="flex">
                            <div className="w-full px-3 my-5">
                                <button className="cursor-pointer flex justify-center w-full max-w-xs mx-auto bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 text-white rounded-lg px-3 py-3 font-semibold">{isNew ? "Create" : "Update"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <ReturnButton event={closeEvent}/>
    </div>
    )
    
}
