import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import imageNotFound from '../assets/images/product_not_found.png';

function HomePage() {
  const products = useSelector(state => state.products);

  return (
    <div>
      <h1>Latest Products</h1>
      <div className="products-grid">
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
