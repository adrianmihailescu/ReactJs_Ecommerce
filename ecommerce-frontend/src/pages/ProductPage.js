import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import imageNotFound from '../assets/images/product_not_found.png';

function ProductPage() {
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const product = products.find(p => p._id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <img src={product.image} alt={product.name} width="300"
        onError={(e) => {
        e.target.onerror = null; // prevents infinite loop
        e.target.src = imageNotFound;
      }}
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
}

export default ProductPage;
