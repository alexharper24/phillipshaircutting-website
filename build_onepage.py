"""Build a single self-contained HTML preview from index.html.
Inlines style.css + main.js and base64-encodes every img/ asset."""
import base64, re, os

root = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(root, 'index.html'), encoding='utf-8').read()
css = open(os.path.join(root, 'style.css'), encoding='utf-8').read()
js = open(os.path.join(root, 'main.js'), encoding='utf-8').read()

# tolerate cache-buster query strings, e.g. style.css?v=3 / main.js?v=2
html = re.sub(r'<link rel="stylesheet" href="style\.css[^"]*">', '<style>\n' + css + '\n</style>', html)
html = re.sub(r'<script src="main\.js[^"]*"></script>', '<script>\n' + js + '\n</script>', html)

def datauri(path):
    ext = path.rsplit('.', 1)[1].lower()
    mime = {'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'svg': 'image/svg+xml'}[ext]
    with open(os.path.join(root, path), 'rb') as f:
        b64 = base64.b64encode(f.read()).decode()
    return f'data:{mime};base64,{b64}'

for ref in set(re.findall(r'img/[A-Za-z0-9_\-]+\.(?:jpg|jpeg|png|svg)', html)):
    if os.path.exists(os.path.join(root, ref)):
        html = html.replace('"' + ref + '"', '"' + datauri(ref) + '"')
        html = html.replace("'" + ref + "'", "'" + datauri(ref) + "'")

out = os.path.join(root, 'Phillips-OnePage-Preview.html')
open(out, 'w', encoding='utf-8').write(html)
print('Wrote', out, '(%.0f KB)' % (len(html.encode('utf-8')) / 1024))
