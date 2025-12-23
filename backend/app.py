from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import Recommender

app = Flask(__name__)
CORS(app)

# Load recommenders
movie_recommender = Recommender(
    "dataset/movies.csv", "description"
)
product_recommender = Recommender(
    "dataset/products.csv", "description"
)


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    query = data.get("query", "").lower()

    # Simple domain detection
    if any(word in query for word in ["movie", "film", "actor", "series"]):
        results = movie_recommender.recommend(query)
    else:
        results = product_recommender.recommend(query)

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
