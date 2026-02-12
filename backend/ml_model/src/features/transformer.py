from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np

class TransformerFeatureExtractor:
    """Extract embeddings from DistilBERT"""

    def __init__(self, model_name='distilbert-base-uncased'):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)
        self.model.eval()

    def extract_features(self, text, max_length=512):
        inputs = self.tokenizer(
            text,
            max_length=max_length,
            truncation=True,
            padding='max_length',
            return_tensors='pt'
        )

        with torch.no_grad():
            outputs = self.model(**inputs)
            embeddings = outputs.last_hidden_state[:, 0, :].numpy()

        return embeddings.flatten()
