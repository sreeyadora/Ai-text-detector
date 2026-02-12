import re
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from textstat import flesch_reading_ease, flesch_kincaid_grade
import numpy as np

nltk.download('punkt', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

class StylometricExtractor:
    """Extract stylometric features from text"""

    def extract_features(self, text):
        features = {}

        words = word_tokenize(text.lower())
        sentences = sent_tokenize(text)

        features['word_count'] = len(words)
        features['sentence_count'] = len(sentences)
        features['char_count'] = len(text)
        features['avg_word_length'] = np.mean([len(w) for w in words]) if words else 0
        features['avg_sentence_length'] = len(words) / len(sentences) if sentences else 0

        unique_words = set(words)
        features['lexical_diversity'] = len(unique_words) / len(words) if words else 0

        pos_tags = nltk.pos_tag(words)
        features['noun_ratio'] = sum(1 for _, tag in pos_tags if tag.startswith('NN')) / len(words) if words else 0
        features['verb_ratio'] = sum(1 for _, tag in pos_tags if tag.startswith('VB')) / len(words) if words else 0
        features['adj_ratio'] = sum(1 for _, tag in pos_tags if tag.startswith('JJ')) / len(words) if words else 0
        features['adv_ratio'] = sum(1 for _, tag in pos_tags if tag.startswith('RB')) / len(words) if words else 0

        features['flesch_reading_ease'] = flesch_reading_ease(text)
        features['flesch_kincaid_grade'] = flesch_kincaid_grade(text)

        function_words = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']
        features['function_word_ratio'] = sum(1 for w in words if w in function_words) / len(words) if words else 0

        features['capital_ratio'] = sum(1 for c in text if c.isupper()) / len(text) if text else 0
        features['digit_ratio'] = sum(1 for c in text if c.isdigit()) / len(text) if text else 0

        return features
