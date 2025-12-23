import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class Recommender:
    def __init__(self, csv_path):
        self.data = pd.read_csv(csv_path)

        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.vectors = self.vectorizer.fit_transform(
            self.data["description"].fillna("")
        )

    def recommend(self, query, top_n=5):
        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.vectors)[0]

        # fallback for low similarity
        if scores.max() == 0:
            return self.data.head(top_n).to_dict(orient="records")

        top_idx = scores.argsort()[-top_n:][::-1]
        return self.data.iloc[top_idx].to_dict(orient="records")
