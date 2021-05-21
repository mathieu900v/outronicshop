import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function previewProduct({data, closeEvent, brands, categories}) {

    return(<>
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container my-16 mx-auto shadow-md rounded-lg">
                <div className="lg:w-7/8 mx-auto flex flex-wrap bg-gray-100 p-6 rounded-md">
                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data.imgUrl}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-600"> {categories.find(categories => data.categoryId === categories.id).title}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{data.title}</h1>
                        <div className="flex mb-4">
                            <a className="flex-grow text-purple-500 border-b-2 border-purple-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
                        </div>
                        <p className="leading-relaxed mb-4">{data.description}</p>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Color</span>
                            <span className="ml-auto text-gray-900">Blue</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Size</span>
                            <span className="ml-auto text-gray-900">Medium</span>
                        </div>
                        <div className="flex border-t border-b mb- border-gray-200 py-2">
                            <span className="text-gray-500">Quantity</span>
                            <span className="ml-auto text-gray-900">4</span>
                        </div>
                        <div className="flex mt-8">
                            <span className="title-font font-medium text-2xl text-gray-900">{data.price}€</span>
                            <button className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-700 rounded">Add to Cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 hover:bg-red-500 hover:text-white p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <FontAwesomeIcon icon={Icons.faHeart}/>
                            </button>
                        </div>
                        <h2 className="text-sm title-font text-gray-500">#{data.sku}</h2>
                    </div>
                </div>
            </div>
        </section>
    </>);
}