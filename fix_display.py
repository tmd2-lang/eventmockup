import re

with open("components/HomeScreen.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "activeUserId === 'bennett' ? BENNETT_SHOWS : activeUserId === 'alessia' ? ALESSIA_SHOWS : SHOWS;",
    "activeUserId === 'bennett' ? BENNETT_SHOWS : activeUserId === 'alessia' ? ALESSIA_SHOWS : activeUserId === 'maddie' ? MADDIE_SHOWS : SHOWS;"
)

content = content.replace(
    "activeUserId === 'bennett' ? BENNETT_NEWS : activeUserId === 'alessia' ? ALESSIA_NEWS : NEWS;",
    "activeUserId === 'bennett' ? BENNETT_NEWS : activeUserId === 'alessia' ? ALESSIA_NEWS : activeUserId === 'maddie' ? MADDIE_NEWS : NEWS;"
)

with open("components/HomeScreen.tsx", "w") as f:
    f.write(content)
print("Fixed MADDIE_SHOWS and MADDIE_NEWS display logic!")
