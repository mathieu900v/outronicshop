import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function previewProduct({data, brands, categories}) {

    const states = {
        DESCRIPTION: 1,
        ASSOCIATED: 2,
        REVIEWS: 3
    }

    return(<>
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container my-16 mx-auto shadow-md rounded-lg">
                <div className="bg-gray-100 p-6">
                    <div className="lg:w-7/8 mx-auto flex flex-wrap rounded-md mb-6">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data.imgUrl}/>
                        <div className="lg:w-1/2 w-full lg:pl-10 mb-6 lg:mb-0">
                            <div className="flex flex-row justify-between">
                                <a href={`/categories/${categories.find(categories => data.categoryId === categories.id).title.toLowerCase()}`} className="cursor-pointer text-md title-font text-gray-600"> /{categories.find(categories => data.categoryId === categories.id).title}</a>
                                <h2 className="text-md title-font text-gray-500">#{data.sku}</h2>
                            </div>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{data.title}</h1>
                            <p className="leading-relaxed mb-auto">{data.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex w-1/2 mb-6 pb-4 lg:mb-0">
                            <a className="flex-grow text-purple-500 border-b-2 border-purple-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
                        </div>
                        <div className="flex flex-grow justify-between ml-10">
                            <div className="flex flex-col">
                                <span className="title-font font-medium text-3xl text-gray-900">{data.price}€</span>
                            </div>
                            <div classname="flex-row">
                                <button className="text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-700 rounded">Add to Cart</button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 hover:bg-red-500 hover:text-white p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <FontAwesomeIcon icon={Icons.faHeart}/>
                                </button>
                            </div>
                                
                        </div>
                    </div>
                    aaa
                    
                </div>   
            </div>
        </section>
    </>);
}