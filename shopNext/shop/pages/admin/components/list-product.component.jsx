import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import ApiClient from '../../modules/api/client-api'
import AddButton from './add-button.component'
import { NIL, NIL as NIL_UUID } from 'uuid';

export default function listProduct({products, toggleFormEvent, refreshData}) {

    async function deleteProductBySku(sku){
        const res = await ApiClient.deleteProductBySkuAsync(sku);
          if(res.status < 300){
            refreshData();
          }
    }

    return(<>
        <section className="text-gray-600 body-font">
            <div className="container px-5 pt-8 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {products.map((product) => (<div className="cursor-pointer lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-transparent rounded-lg hover:border-purple-500 hover:bg-gray-50">
                        <a className="block relative h-48 rounded overflow-hidden">
                        <img alt="product-image" class="object-cover object-center w-full h-full block" src={product.imgUrl}/>
                        </a>
                        <div className="mt-4">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-purple-800 title-font text-lg font-medium">{product.title}</h2>
                                <p className="mt-1">#{product.sku}</p>
                            </div>
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.description}</h3>
                            <div className="flex flex-row justify-between">
                                <p className="mt-1 font-semibold text-lg">{product.price.toLocaleString()} €</p>
                                <div className="flex flex-row">
                                    <button onClick={() => toggleFormEvent(product)} className="w-5 mr-2 transform hover:text-purple-500 hover:scale-125 text-lg">
                                        <FontAwesomeIcon icon={Icons.faPencilAlt} />
                                    </button>
                                    <button onClick={async () => await deleteProductBySku(product.sku)} className="w-5 transform hover:text-purple-500 hover:scale-125 text-lg">
                                        <FontAwesomeIcon icon={Icons.faTrashAlt} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
        <AddButton event={() => toggleFormEvent(null)}/>
    </>);
}