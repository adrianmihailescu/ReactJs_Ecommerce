import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const products = useSelector(state => state.products);

  console.log(`products: ${products}`); // ⬅️ check if products exist

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
