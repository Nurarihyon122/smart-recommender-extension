import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class Recommender:
    def __init__(self, csv_path, text_column):
        self.data = pd.read_csv(csv_path)
        self.text_column = text_column

        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.vectors = self.vectorizer.fit_transform(
            self.data[self.text_column]
        )

    def recommend(self, query, top_n=5):
        query_vec = self.vectorizer.transform([query])
        similarity_scores = cosine_similarity(query_vec, self.vectors)

        top_indices = similarity_scores[0].argsort()[-top_n:][::-1]
        return self.data.iloc[top_indices].to_dict(orient="records")
