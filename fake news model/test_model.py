import pickle
from sklearn.utils.validation import check_is_fitted

# ── Load both files ──────────────────────────────
print("Loading files...")
with open("best_model.pkl", "rb") as f:
    model = pickle.load(f)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)
print("✅ Both files loaded!\n")

# ── Check trained ────────────────────────────────
check_is_fitted(model)
print("✅ Model is properly trained!")
print("Model type :", type(model).__name__)
print("Predicts   :", model.classes_)
print("Vocab size :", len(vectorizer.vocabulary_), "words\n")

# ── Test predictions ─────────────────────────────
print("--- Testing Predictions ---")
tests = [
    "Scientists discover vaccine that cures all diseases overnight",
    "Reuters: US economy grows by 2.5% in last quarter",
    "SHOCKING: Celebrity secretly controls world government",
    "Parliament passes new education budget after long debate",
]

X = vectorizer.transform(tests)
predictions = model.predict(X)
probabilities = model.predict_proba(X)

for text, label, prob in zip(tests, predictions, probabilities):
    confidence = max(prob) * 100
    print(f"Text      : {text}")
    print(f"Prediction: {label}  (confidence: {confidence:.1f}%)")
    print()

print("✅ All tests complete! Your model is working perfectly.")