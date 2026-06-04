import re

with open("lib/users.tsx", "r") as f:
    content = f.read()

old_dare = "{ title: 'Girls', artist: 'The Dare', photo: `/artists/thedare-profile.jpeg`, coverArt: `/covers/whatswrongwithnewyork-coverart.jpeg` }"
new_drake = "{ title: 'WNBA', artist: 'Drake', photo: `/artists/drake-profile.jpeg`, coverArt: `/covers/drake-habibti-spotify.jpeg` }"

if old_dare in content:
    content = content.replace(old_dare, new_drake)
    with open("lib/users.tsx", "w") as f:
        f.write(content)
    print("Fixed users.tsx onRepeat!")
else:
    print("Could not find The Dare in onRepeat")
