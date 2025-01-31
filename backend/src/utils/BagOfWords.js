import fs from "fs";

class BagOfWordsModel {
  constructor(corpus = null, sep = null) {
    this.vocab = new Set();
    this.vectors = {};
    this.length = 0;

    if (corpus && sep) {
      // Constructor for creating a new model
      corpus.forEach((description) => {
        description.split(sep).forEach((word) => {
          const lowerWord = word.toLowerCase();
          this.vocab.add(lowerWord);
          this.vectors[lowerWord] = 0;
        });
      });
      this.length = Object.keys(this.vectors).length;
      console.log("New Model Created");
    } else {
      // Default constructor
      this.load();
      console.log("Model loaded");
    }
  }

  tokenizer(word, sep) {
    return word.toLowerCase().split(sep);
  }

  vectorizer(tokenizedWords) {
    const vectors = { ...this.vectors };
    tokenizedWords.forEach((word) => {
      if (this.vocab.has(word)) {
        vectors[word] = 1;
      }
    });
    return Object.values(vectors);
  }

  static cosineSimilarity(vector1, vector2) {
    if (vector1.length !== vector2.length) {
      throw new Error("Vectors must have the same length");
    }

    let dotProduct = 0;
    let magVec1 = 0;
    let magVec2 = 0;

    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
      magVec1 += vector1[i] * vector1[i];
      magVec2 += vector2[i] * vector2[i];
    }

    magVec1 = Math.sqrt(magVec1);
    magVec2 = Math.sqrt(magVec2);

    if (magVec1 === 0 || magVec2 === 0) {
      return 0;
    }

    return dotProduct / (magVec1 * magVec2);
  }

  save(vocabFilePath = "vocabulary.json", dictFilePath = "dictionary.json") {
    try {
      fs.writeFileSync(vocabFilePath, JSON.stringify([...this.vocab], null, 2));
      fs.writeFileSync(dictFilePath, JSON.stringify(this.vectors, null, 2));
    } catch (err) {
      console.error(err.message);
    }
  }

  load(vocabFilePath = "vocabulary.json", dictFilePath = "dictionary.json") {
    try {
      const vocabData = fs.readFileSync(vocabFilePath, "utf-8");
      this.vocab = new Set(JSON.parse(vocabData));

      const vectorData = fs.readFileSync(dictFilePath, "utf-8");
      this.vectors = JSON.parse(vectorData);

      this.length = this.vocab.size;
    } catch (err) {
      console.error(err.message);
    }
  }
}

export { BagOfWordsModel };
