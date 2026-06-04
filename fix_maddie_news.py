import re

# 1. Fix users.tsx maddie block paths
with open("lib/users.tsx", "r") as f:
    content = f.read()

idx_maddie = content.find("  maddie: {")
idx_alessia = content.find("  alessia: {")

if idx_maddie != -1 and idx_alessia != -1:
    maddie_block = content[idx_maddie:idx_alessia]
    # fix /assets/artists -> /artists and /assets/covers -> /covers
    maddie_block = maddie_block.replace("/assets/artists/", "/artists/")
    maddie_block = maddie_block.replace("/assets/covers/", "/covers/")
    
    # put it back
    content = content[:idx_maddie] + maddie_block + content[idx_alessia:]
    with open("lib/users.tsx", "w") as f:
        f.write(content)
    print("Fixed users.tsx paths!")

# 2. Fix HomeScreen.tsx news
with open("components/HomeScreen.tsx", "r") as f:
    home = f.read()

old_dare_news = "{ art: '/artists/thedare-profile.jpeg', src: 'Campus chart', when: '5h', head: 'The Dare is trending up heading into the weekend.' }"
new_tame_news = "{ art: '/artists/tameimpala-profile.jpeg', src: 'Campus chart', when: '5h', head: 'Tame Impala rumors are circulating for a new album.' }"

if old_dare_news in home:
    home = home.replace(old_dare_news, new_tame_news)
    with open("components/HomeScreen.tsx", "w") as f:
        f.write(home)
    print("Fixed HomeScreen.tsx news!")
else:
    print("Could not find the dare news in HomeScreen.tsx")
