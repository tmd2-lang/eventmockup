import re

with open('lib/users.tsx', 'r') as f:
    content = f.read()

# Update ProfileData nowListening type
content = content.replace(
    "nowListening?: { title: string; artist: string; photo?: string };",
    "nowListening?: { title: string; artist: string; photo?: string; coverArt?: string };"
)

with open('lib/users.tsx', 'w') as f:
    f.write(content)
print("Updated type!")
