import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function ListProduct({currentProducts, toggleProductEvent}) {

    return(<>
        <section className="text-gray-600 body-font">
            <div className="container px-5 pt-8 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {currentProducts.map((product) => (<div key={product.sku} onClick={() => toggleProductEvent(product)} className="cursor-pointer lg:w-1/4 md:w-1/2 p-4 w-full border-2 border-transparent rounded-lg hover:border-purple-500 hover:bg-gray-50">
                        <a className="block relative h-48 rounded overflow-hidden">
                            <img alt="product-image" className="object-cover object-center w-full h-full block" src={product.imgUrl}/>
                        </a>
                        <div className="mt-4">
                            <div className="flex flex-row justify-between">
                                <h2 className="text-purple-800 title-font text-lg font-medium">{product.title}</h2>
                            </div>
                            <h3 className="text-gray-500 text-xs title-font truncate">{product.description}</h3>
                            <div className="flex flex-row justify-between">
                                <p className="mt-1">#{product.sku}</p>
                                <div className="flex flex-row">
                                    <p className="mt-1 font-semibold text-lg">{product.price.toLocaleString()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    </>);
}