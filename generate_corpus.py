import json
import re

def generate_corpus(md_file_path, json_file_path):
    """
    Parses a markdown file and generates a JSON corpus.
    """
    with open(md_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    corpus = []
    current_section = ""
    current_subsection = ""
    paragraph_buffer = ""

    for line in lines:
        line = line.strip()

        if line.startswith('# '):
            # Reset everything for the main title
            current_section = line.lstrip('# ').strip()
            current_subsection = ""
            continue
        
        if line.startswith('## '):
            if paragraph_buffer:
                corpus.append({
                    "section": current_section,
                    "subsection": current_subsection,
                    "paragraph": paragraph_buffer.strip()
                })
                paragraph_buffer = ""
            current_subsection = line.lstrip('## ').strip()
            continue

        if line.startswith('### '):
            if paragraph_buffer:
                corpus.append({
                    "section": current_section,
                    "subsection": current_subsection,
                    "paragraph": paragraph_buffer.strip()
                })
                paragraph_buffer = ""
            # Combine section and subsection for the JSON structure
            subsection_title = line.lstrip('### ').strip()
            current_subsection = f"{current_subsection} > {subsection_title}" if current_subsection else subsection_title
            continue

        if not line:
            # End of a paragraph
            if paragraph_buffer:
                corpus.append({
                    "section": current_section,
                    "subsection": current_subsection,
                    "paragraph": paragraph_buffer.strip()
                })
                paragraph_buffer = ""
        else:
            # Continue a paragraph
            paragraph_buffer += " " + line

    # Add the last paragraph if the file doesn't end with a newline
    if paragraph_buffer:
        corpus.append({
            "section": current_section,
            "subsection": current_subsection,
            "paragraph": paragraph_buffer.strip()
        })

    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(corpus, f, indent=2)

    print(f"Successfully generated '{json_file_path}' from '{md_file_path}'.")

if __name__ == '__main__':
    generate_corpus('sovereign_triad_corpus.md', 'triad_corpus.json')
