import requests
from bs4 import BeautifulSoup

# List of URLs to extract text from
urls = [
    # Place your list of URLs here, as strings
]

def fetch_text(url):
    """Fetches text content from a given URL"""
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script_or_style in soup(["script", "style"]):
            script_or_style.decompose()
        
        # Get text
        text = soup.get_text(separator='\n')
        
        # Break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # Break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # Drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        return text
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return ""

def save_text_to_file(filename, text):
    """Saves text to a given filename"""
    with open(filename, "a", encoding="utf-8") as file:
        file.write(text + "\n\n")

for url in urls:
    text = fetch_text(url)
    if text:
        save_text_to_file("all_site_content.txt", text)
