import React from 'react';
import ProductCard from './ProductCard';

export default function Content() {

  return (
    <div className="container">
      <div className="row gy-4">
          <div className="col-12 col-md-6">
            <ProductCard productData={{
              id: 1,
              name: 'Produto de teste',
              price: 17.90,
              category: 'Legume',
              perishable: 0,
              lastEdition: (new Date()).getTime()
            }} />
          </div>
      </div>
    </div>




  );
}
