import re
from typing import List


def semantic_chunk_text(
    text: str,
    max_length: int = 800,
    min_length: int = 200,
) -> List[str]:
    """
    Semantic chunking:
    - Ưu tiên theo đoạn
    - Không cắt giữa câu
    """

    paragraphs = re.split(r"\n{2,}", text)
    chunks = []
    current_chunk = ""

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Nếu đoạn quá dài → tách theo câu
        if len(para) > max_length:
            sentences = re.split(r"(?<=[.!?])\s+", para)
        else:
            sentences = [para]

        for sentence in sentences:
            if len(current_chunk) + len(sentence) <= max_length:
                current_chunk += " " + sentence
            else:
                if len(current_chunk) >= min_length:
                    chunks.append(current_chunk.strip())
                current_chunk = sentence

    if current_chunk.strip():
        chunks.append(current_chunk.strip())

    return chunks
