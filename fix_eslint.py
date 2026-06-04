import re

with open('lib/users.tsx', 'r') as f:
    content = f.read()

content = content.replace("you're picking songs that still work socially", "you&apos;re picking songs that still work socially")

with open('lib/users.tsx', 'w') as f:
    f.write(content)
print("Fixed ESLint!")
