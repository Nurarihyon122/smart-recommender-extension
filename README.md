🧠 Smart Recommender Browser Extension

A domain-aware browser extension that provides real-time recommendations for movies, products, and videos by analyzing the current webpage content and using content-based machine learning techniques.

📌 Project Overview

Smart Recommender is a cross-browser extension that:

Reads content from the currently opened webpage

Identifies whether the page is a:

🎬 Movie page (IMDb, Netflix)

🛒 Product page (Amazon, Flipkart)

📺 Video page (YouTube)

Sends extracted information to a Python ML backend

Displays context-aware recommendations directly on the webpage using a transparent overlay

This project demonstrates real-world system design, combining:

Browser extension development

Backend REST APIs

Machine learning (NLP)

SPA (Single Page Application) handling

🚀 Key Features

✅ Real-time recommendations

✅ Domain-specific suggestions (movies ≠ products ≠ videos)

✅ Transparent overlay UI on websites

✅ Works on SPA websites like YouTube

✅ No user login or tracking

✅ Fully local (no paid APIs, no LLMs)

✅ Privacy-friendly

🧠 Recommendation Technique

The system uses Content-Based Filtering with:

TF-IDF (Term Frequency–Inverse Document Frequency)

Cosine Similarity

Why TF-IDF?

Simple and explainable

Fast and lightweight

Works without user history

Ideal for real-time browser extensions

⚠️ This project does NOT use any Large Language Models (LLMs) or external APIs.

🏗️ System Architecture
Browser Page
   ↓
Content Script (DOM Extraction)
   ↓
Background Service Worker
   ↓
Flask Backend API
   ↓
TF-IDF + Cosine Similarity
   ↓
Recommendations
   ↓
Transparent Overlay on Page

📂 Project Structure
smart-recommender-extension/
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   └── styles.css
│
└── backend/
    ├── app.py
    ├── recommender.py
    ├── requirements.txt
    └── dataset/
        ├── movies.csv
        ├── products.csv
        └── videos.csv

🛠️ Tech Stack
Frontend (Browser Extension)

JavaScript

Chrome WebExtensions API

Manifest V3

DOM Manipulation

Backend

Python

Flask

Flask-CORS

Machine Learning

Scikit-learn

TF-IDF Vectorizer

Cosine Similarity

🌐 Supported Websites
Website Type	Examples
Movies	IMDb, Netflix
Products	Amazon, Flipkart
Videos	YouTube
SPA Support	Yes
▶️ How to Run the Project
1️⃣ Start Backend Server
cd backend
pip install -r requirements.txt
python app.py


Server runs at:

http://localhost:5000

2️⃣ Load Browser Extension
Chrome / Edge / Brave

Open chrome://extensions

Enable Developer Mode

Click Load Unpacked

Select the extension/ folder

3️⃣ Test the Extension

Open a YouTube video → video recommendations appear

Open an IMDb movie page → movie recommendations appear

Open an Amazon product page → product recommendations appear

🔐 Privacy & Security

❌ No user accounts

❌ No browsing history storage

❌ No keystroke logging

✅ Reads only visible webpage content

✅ Fully local execution

⚠️ Known Limitations

Google search pages are intentionally ignored

Recommendations depend on dataset quality

No collaborative filtering (single-user system)

🚀 Future Improvements

User preference learning

Hybrid recommendation (content + popularity)

Vector databases (FAISS)

Optional LLM-based explanations

Chrome Web Store deployment


🏁 Conclusion

This project demonstrates an end-to-end real-world system, integrating browser extensions, backend APIs, and machine learning, while handling modern web challenges like SPA navigation and privacy concerns.

👤 Author

Utsav Kumar
B.Tech – Computer Science Engineering
Interests: DevOps, Cloud Enthusiast
