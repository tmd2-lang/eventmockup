import re

with open('lib/users.tsx', 'r') as f:
    content = f.read()

# Update ProfileData playlistTracks type
content = content.replace(
    "playlistTracks: Array<{ title: string; artist: string; dur: string; photo: string }>;",
    "playlistTracks: Array<{ title: string; artist: string; dur: string; photo: string; coverArt?: string }>;"
)

with open('lib/users.tsx', 'w') as f:
    f.write(content)
print("Updated type!")
