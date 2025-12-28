import numpy as np

def cosine_similarity(a, b):
    dot = np.dot(a, b)
    mag_a = np.linalg.norm(a)
    mag_b = np.linalg.norm(b)
    return dot / (mag_a * mag_b)