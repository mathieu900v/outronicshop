// posts will be populated at build time by getStaticProps()
function BrandPage({ brands }) {
    return (
      <ul>
        {brands.map((brand) => (
            <li>
                <ul>
                    <li>{brand.name}</li>
                    <li>{brand.id}</li>
                </ul>
            </li>
        ))}
      </ul>
    )
  }
  
  
  export default BrandPage