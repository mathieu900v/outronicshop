import {BrandPage} from './BrandPage'


export default function Home({ brands }) {
  return(
    <ul>
        {brands.map((brand) => (
          <ul key={brand.id} className="bg-green">
            <li>{brand.name}</li>
            <li>{brand.imgUrl}</li>
            <li>{brand.id}</li>
            <br/>
          </ul>
        ))}
      </ul>
  )
  
}

export async function getStaticProps() {
  // Call an external API endpoint to get brands.
  // You can use any data fetching library
  const res = await fetch('http://localhost:5001/api/brands')
  const brands = await res.json()

  // By returning { props: { brands } }, the Blog component
  // will receive `brands` as a prop at build time
  return {
    props: {
      brands,
    },
  }
}
