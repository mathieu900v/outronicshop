import Image from 'next/image'
export default function Header({props}){
    return(
<nav className="bg-white w-full flex relative justify-between items-center mx-auto px-16 h-20">
  <div className="inline-flex">
    <a className="_o6689fn" href="/"
      ><div className="hidden sm:block">
        <svg>
          
        </svg>
      </div>
      <div className="block sm:hidden">
        <svg>

        </svg>
      </div>
    </a>
  </div>

  <div className="flex-shrink flex-grow-0 px-2">
    <div className="inline-block">
      <div className="inline-flex">
        <button className="md:flex hidden items-center flex-grow-0 pl-3 py-1 relative w-80 border-2 hover:border-purple-500 rounded-md" type="button">
          <div className="block flex-auto">Rechercher</div>
          <div className="flex items-center justify-center relative h-8 w-8 rounded-md">
            <svg>

            </svg>
          </div>
        </button>
          <button className="md:hidden inline-block py-1 px-2 hover:border-purple-500 border-b-4 border-purple-300" type="button">
          <span className="flex items-center relative cursor-pointer whitespace-nowrap">Rechercher</span>
        </button>
      </div>
    </div>
  </div>

  <div className="flex-initial">
    <div className="flex justify-end items-center relative">
      <div className="flex mr-4 items-center">
        <a className="inline-block py-1 px-2 hover:border-purple-500 border-b-4 border-purple-300" href="#">
          <span className="flex items-center relative cursor-pointer whitespace-nowrap">Se connecter</span>
        </a>
      </div>

      <div className="block">
        <div className="inline relative">
          <button type="button" className="inline-flex items-center relative px-2 border-2 rounded-md hover:border-purple-500">
            <span className="pl-1"> 165,04€ </span>

            <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
              <svg>

              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

    )
}