import urllib.request
import re
import os
import json

teams = {
  'mil': [('1968', '1968-1993'), ('1993', '1993-2006'), ('2006', '2006-2015')],
  'ind': [('1967', '1967-1976'), ('1976', '1976-1990'), ('1990', '1990-2005'), ('2005', '2005-2017')],
  'cle': [('1970', '1970-1983'), ('1983', '1983-1994'), ('1994', '1994-2003'), ('2003', '2003-2010')],
  'det': [('1957', '1957-1978'), ('1978', '1978-1996'), ('1996', '1996-2001'), ('2005', '2005-2017')],
  'chi': [('1966', '1966-Present')]
}

names = {'mil': 'Milwaukee Bucks', 'ind': 'Indiana Pacers', 'cle': 'Cleveland Cavaliers', 'det': 'Detroit Pistons', 'chi': 'Chicago Bulls'}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

dest_dir = os.path.join(os.getcwd(), 'public', 'logos')
os.makedirs(dest_dir, exist_ok=True)

for slug, eras in teams.items():
    for era_query, era_name in eras:
        query = f"{names[slug]} {era_query} logo png transparent"
        url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)
        
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response:
                html = response.read().decode('utf-8')
            
            # Find the first image link
            matches = re.findall(r'<img[^>]+src="([^"]+)"', html)
            img_url = None
            for m in matches:
                if 'external-content' in m or 'http' in m:
                    if m.startswith('//'):
                        img_url = 'https:' + m
                    else:
                        img_url = m
                    break
            
            if img_url:
                print(f"Found {names[slug]} {era_query}: {img_url}")
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=10) as img_res:
                    img_data = img_res.read()
                
                with open(os.path.join(dest_dir, f"{slug}-{era_name}.png"), 'wb') as f:
                    f.write(img_data)
                print(f"Downloaded {slug}-{era_name}.png")
            else:
                print(f"No image found for {query}")
        except Exception as e:
            print(f"Failed {query}: {e}")
