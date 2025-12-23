from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import Recommender

# CREATE FLASK APP FIRST
app = Flask(__name__)
CORS(app)

# LOAD RECOMMENDERS
movie_rec = Recommender("dataset/movies.csv")
product_rec = Recommender("dataset/products.csv")
video_rec = Recommender("dataset/videos.csv")


# ROUTE COMES AFTER app IS DEFINED
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json or {}

    query = data.get("query", "")
    domain = data.get("domain")

    if not query or not domain:
        return jsonify([])

    if domain == "movie":
        return jsonify(movie_rec.recommend(query))

    if domain == "product":
        return jsonify(product_rec.recommend(query))

    if domain == "video":
        return jsonify(video_rec.recommend(query))

    return jsonify([])


if __name__ == "__main__":
    app.run(debug=True)
