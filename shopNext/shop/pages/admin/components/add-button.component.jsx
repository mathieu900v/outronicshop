export default function AddButton({event}){
    return(
        <button onClick={event} class="bottom-4 right-4 fixed flex pb-3 px-4 text-white bg-green-400 border-0 align-top focus:outline-none hover:bg-green-500 rounded text-5xl">+</button>
    )
}