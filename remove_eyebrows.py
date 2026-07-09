import re

file_path = '/Users/tjdozier7/Downloads/ligo-home-mockup-main/components/RevealScreen.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if '<NightLabel ' in line:
        continue
    new_lines.append(line)

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print("Eyebrows removed!")
