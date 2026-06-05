import os

paths_to_check = [
    "/assets/artists/tameimpala-profile.jpeg",
    "/assets/artists/MGMT-profile.jpeg",
    "/assets/artists/fleetwoodmac-profile.jpeg",
    "/assets/artists/mk-profile.jpeg",
    "/assets/artists/freddiegibbs-profile.jpeg",
    "/assets/artists/kaytranada-profile.jpeg",
    "/covers/mgmtoracularspectacular-coverart.jpeg",
    "/covers/currents-coverart.jpeg",
    "/covers/mk17-coverart.jpeg",
    "/covers/bandana-coverart.jpeg",
    "/assets/Marcus-profile.png",
]

print("Checking paths...")
for path in paths_to_check:
    full_path = "public" + path
    if not os.path.exists(full_path):
        print(f"Missing: {path}")
    else:
        print(f"Found: {path}")
