import { useSelector } from 'react-redux';
import ProductCard from './../pages/ProductCard';

function HomePage() {
  const products = useSelector(state => state.products);

  return (
    <div>
      <h1>Latest Products</h1>
      <div className="products-grid">
        {products && products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
