import re

with open('lib/users.tsx', 'r') as f:
    content = f.read()

replacements = [
    ('${ARTIST_IMG}taylor.png', '/artists/taylorswift-profile.jpeg'),
    ('${ARTIST_IMG}sza-saturn.png', '/artists/sza-profile.jpeg'),
    ('${ARTIST_IMG}drake.png', '/artists/drake-profile.jpeg'),
    ('${ARTIST_IMG}beyonce.png', '/artists/beyonce-profile.jpeg'),
    ('${ARTIST_IMG}frank-blond.png', '/artists/frankocean-profile.jpeg'),
    ('${ARTIST_IMG}tyler.png', '/artists/tylerthecreator-profile.jpeg'),
    ('${ARTIST_IMG}sabrina.png', '/artists/sabrinacarpenter-profile.jpeg')
]

for old, new in replacements:
    content = content.replace(old, new)

with open('lib/users.tsx', 'w') as f:
    f.write(content)

print("done")
