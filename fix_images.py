import re

# 1. Update HomeScreen.tsx
home_path = '/Users/tjdozier7/Downloads/ligo-home-mockup-main/components/HomeScreen.tsx'
with open(home_path, 'r') as f:
    home_content = f.read()

home_content = home_content.replace('starbucks-logo.svg', 'starbucks-logo.webp')
with open(home_path, 'w') as f:
    f.write(home_content)

# 2. Update RevealScreen.tsx
reveal_path = '/Users/tjdozier7/Downloads/ligo-home-mockup-main/components/RevealScreen.tsx'
with open(reveal_path, 'r') as f:
    reveal_content = f.read()

reveal_content = reveal_content.replace('starbucks-logo.svg', 'starbucks-logo.webp')
reveal_content = reveal_content.replace('night.topArt = matches[0].art;', 'night.topArt = (matches[0] as any).cover;')

with open(reveal_path, 'w') as f:
    f.write(reveal_content)

print("Images fixed!")
