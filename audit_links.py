import os
import html.parser
from urllib.parse import unquote, urlparse

class LinkExtractor(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag in ['a', 'link', 'img', 'script']:
            attr_name = 'href' if tag in ['a', 'link'] else 'src'
            for attr, value in attrs:
                if attr == attr_name:
                    self.links.append(value)

def get_html_files(root_dir):
    html_files = []
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def check_links(root_dir):
    html_files = get_html_files(root_dir)
    broken_links = []

    print(f"Scanning {len(html_files)} HTML files...")

    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                parser = LinkExtractor()
                parser.feed(content)
                links = parser.links
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            continue

        for link in links:
            if not link:
                continue

            # Skip external links, anchors, mailto, tel, javascript
            if link.startswith(('http', 'https', '//', 'mailto:', 'tel:', 'javascript:', '#')):
                continue

            # Remove anchor part for file existence check
            parsed_url = urlparse(link)
            url_path = parsed_url.path
            
            # If path is empty (e.g. just a query string like ?foo=bar), skip check or treat as self
            if not url_path: 
                continue

            # Decode URL encoding (e.g. %20 -> space)
            decoded_path = unquote(url_path)

            # Resolve absolute paths (relative to root) vs relative paths
            if decoded_path.startswith('/'):
                # Assuming / implies root of the project
                target_path = os.path.join(root_dir, decoded_path.lstrip('/'))
            else:
                target_path = os.path.join(os.path.dirname(file_path), decoded_path)

            if not os.path.exists(target_path):
                # Check if it might be a directory serving index.html
                if os.path.exists(target_path) and os.path.isdir(target_path):
                     if os.path.exists(os.path.join(target_path, 'index.html')):
                         continue
                
                broken_links.append({
                    'source': os.path.relpath(file_path, root_dir),
                    'link': link,
                    'absolute_target_attempted': target_path
                })

    return broken_links

if __name__ == "__main__":
    root_directory = os.getcwd()
    broken = check_links(root_directory)

    if broken:
        print(f"\nFound {len(broken)} broken links:")
        for item in broken:
            print(f"File: {item['source']}")
            print(f"  Broken Link: {item['link']}")
            # print(f"  Target: {item['absolute_target_attempted']}") # Debug info
            print("-" * 20)
    else:
        print("\nNo broken links found!")
