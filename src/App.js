import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [ products, setProducts] = useState([]);
  const [page, setPage] = useState(2);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  }

  console.log(products);

  useEffect(() => {
    fetchProducts();
  },[]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  }

  //*      products.slice(page * 8 - 8, page * 8).map
  //*                      1   * 8 - 8,    1 * 8
  //*                      1       0  ,      8
  //*                      2   * 8 - 8,    2 * 8
  //*                      2       8  ,     16
  //*                      3   * 8 - 8,    3 * 8
  //*                      3       16 ,     24   

  return (
    <>
      {
        products.length>0 && <div className='products'>
          {
            products.slice(page * 10 - 10, page * 10).map((prod) => {
              return (
                <span key={prod.id} className='product__single'>
                  <img src={prod.thumbnail} alt={prod.title}/>
                  <span>{prod.title}</span>
                </span>
              );
            })
          }
        </div>
      }
        <h2 className='h1__page'>Page: {page}</h2>
      {
      
        products.length > 0 && 
          <div className='pagination'>
            <span 
              onClick={() => selectPageHandler(page - 1)}
              className={ page > 1 ? "" : "pagination__disable"}
            >◀️</span>
            {
              [...Array(Math.ceil(products.length / 10))].map((_, i) => {
                  return <span 
                            className={page === i + 1 ? "pagination__selected" : ""}
                            key={i} 
                            onClick={() => selectPageHandler(i + 1)}
                          >{i + 1}</span>
              })
            }
            <span 
              onClick={() => selectPageHandler(page + 1)}
              className={ page < products.length / 10 ? "" : "pagination__disable"}
            >▶️</span>
          </div>
      }
    </>
  );
}

export default App;

