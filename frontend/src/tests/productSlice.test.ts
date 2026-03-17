import productReducer from '../redux/productSlice';

describe('productSlice Reducer', () => {
  test('should return initial state with 13 products', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    expect(state).toHaveLength(13);
  });

  test('first product is iPhone 15', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    expect(state[0].name).toBe('iPhone 15');
    expect(state[0]._id).toBe('1');
  });

  test('all products have required fields', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    state.forEach((product: any) => {
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThanOrEqual(0);
    });
  });

  test('all product IDs are unique', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    const ids = state.map((p: any) => p._id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('all products have non-empty names', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    state.forEach((product: any) => {
      expect(product.name.length).toBeGreaterThan(0);
    });
  });

  test('last product is Bose SoundLink Revolve II', () => {
    const state = productReducer(undefined, { type: 'unknown' });
    expect(state[12].name).toBe('Bose SoundLink Revolve II');
  });
});
