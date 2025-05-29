import pymongo
from pymongo import MongoClient

def aggregate_products_by_name():
    """
    Connects to a MongoDB instance, aggregates products by name,
    and prints the count for each unique product name.
    """
    client = None
    try:
        # Establish a connection to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        print("Successfully connected to MongoDB!")

        # Access the 'ecommerce' database
        db = client.ecommerce
        print("Accessed 'ecommerce' database.")

        # Access the 'products' collection
        products_collection = db.products
        print("Accessed 'products' collection.")

        # Define the aggregation pipeline
        # Stage 1: Group documents by the 'name' field
        #          and count the number of documents in each group.
        pipeline = [
            {
                "$group": {
                    "_id": "$name",  # Group by the 'name' field
                    "count": {"$sum": 1}  # Count documents in each group
                }
            },
            {
                "$sort": {
                    "count": -1 # Sort by count in descending order
                }
            }
        ]

        print("\nPerforming aggregation...")
        # Execute the aggregation pipeline
        results = products_collection.aggregate(pipeline)

        print("Aggregation Results:")
        print("--------------------")
        # Iterate over the results and print them
        found_results = False
        for doc in results:
            found_results = True
            product_name = doc.get('_id', 'Unknown Name')
            product_count = doc.get('count', 0)
            print(f"Product Name: '{product_name}', Count: {product_count}")

        if not found_results:
            print("No products found or no aggregation results.")

    except pymongo.errors.ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        print("Please ensure MongoDB is running and accessible at localhost:27017.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        # Close the connection
        if client:
            client.close()
            print("\nMongoDB connection closed.")

if __name__ == "__main__":
    aggregate_products_by_name()
