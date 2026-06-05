with open("lib/users.tsx", "r") as f:
    text = f.read()

start = text.find("marcus: {")
end = text.find("  charlotte: {", start)
if start != -1 and end != -1:
    marcus_block = text[start:end]

    marcus_block = marcus_block.replace("/assets/artists/", "/artists/")
    marcus_block = marcus_block.replace("fleetwoodmac-profile.jpeg", "fleetwoodmac-profike.jpeg")
    marcus_block = marcus_block.replace("mk-profile.jpeg", "MK-profile.jpeg")
    marcus_block = marcus_block.replace("mgmtoracularspectacular-coverart.jpeg", "oracularspectacular-coverart.jpeg")
    marcus_block = marcus_block.replace("mk17-coverart.jpeg", "MK17-coverart.jpeg")
    marcus_block = marcus_block.replace("rumours-coverart.jpeg", "rumorsfleetwood-coverart.jpeg")

    text = text[:start] + marcus_block + text[end:]

    with open("lib/users.tsx", "w") as f:
        f.write(text)
    print("Fixed users.tsx")

with open("lib/marcus-catalog.ts", "r") as f:
    cat = f.read()

new_covers = """const ALBUM_COVER: Record<string, string> = {
  currents: `${COVERS}/currents-coverart.jpeg`,
  oracularspectacular: `${COVERS}/oracularspectacular-coverart.jpeg`,
  bandana: `${COVERS}/bandana-coverart.jpeg`,
  "17single": `${COVERS}/MK17-coverart.jpeg`,
  rumours: `${COVERS}/rumorsfleetwood-coverart.jpeg`,
  isthisit: `${COVERS}/isthisit-coverart.jpeg`,
  roomonfire: `${COVERS}/roomonfirestrokes-coverart.jpeg`,
  thenewabnormal: `${COVERS}/thenewabnormal-coverart.jpeg`,
  am: `${COVERS}/favworstnightmare-coverart.jpeg`,
  favouriteworstnightmare: `${COVERS}/favworstnightmare-coverart.jpeg`,
  demondays: `${COVERS}/demondays-coverart.jpeg`,
  letitbleed: `${COVERS}/letitbleed-coverart.jpeg`,
  aftermath: `${COVERS}/rollingstones-aftermath-coverart.jpeg`,
  tattooyou: `${COVERS}/rollingstones-tattooyou-coverart.jpeg`,
  fullmoonfever: `${COVERS}/fullmoonfever-coverart.jpeg`,
  hotelcalifornia: `${COVERS}/hotelcali-coverart.jpeg`,
  direstraits: `${COVERS}/direstraits-cverart.jpeg`,
  thegame: `${COVERS}/queenthegame-coverart.jpeg`,
  jazz: `${COVERS}/queenjazz-coverart.jpeg`,
  adayattheraces: `${COVERS}/queendayattheraces-coverart.jpeg`,
  wishyouwerehere: `${COVERS}/pinkfloyd-wishuwerehere-coverart.jpeg`,
  thewall: `${COVERS}/pinkfloyd-thewall-coverart.jpeg`,
  settle: `${COVERS}/disclosuresettle-coverart.jpeg`,
  caracal: `${COVERS}/disclosurecaracal-coverart.jpeg`,
  18months: `${COVERS}/calvin18months-coverart.jpeg`,
  motion: `${COVERS}/calvinharrismotion-coverart.jpeg`,
  actuallife: `${COVERS}/fredagain-actuallife-coverart.jpeg`,
  alfredo: `${COVERS}/freddiegibbsalfredo-coverart.jpeg`,
  pinata: `${COVERS}/pinata-coverart.jpeg`,
  thesunstirade: `${COVERS}/sunstirade-coverart.jpeg`,
  thehouseisburning: `${COVERS}/houseisburning-coverart.jpeg`,
  kids: `${COVERS}/kidsmacmiller-coverart.jpeg`,
  thedivinefeminine: `${COVERS}/divinefeminie-coverart.jpeg`,
  swimming: `${COVERS}/swimming-coverart.jpeg`,
  illmatic: `${COVERS}/illmatic-coverart.jpeg`,
  daytona: `${COVERS}/daytona-coverart.jpeg`,
};"""

cat = cat.replace("const ALBUM_COVER: Record<string, string> = {};", new_covers)

new_artists = """const ARTIST_PROFILE: Record<string, string> = {
  tameimpala: `${ARTISTS}/tameimpala-profile.jpeg`,
  mgmt: `${ARTISTS}/MGMT-profile.jpeg`,
  fleetwoodmac: `${ARTISTS}/fleetwoodmac-profike.jpeg`,
  mk: `${ARTISTS}/MK-profile.jpeg`,
  freddiegibbs: `${ARTISTS}/freddiegibbs-profile.jpeg`,
  thestrokes: `${ARTISTS}/thestrokes-profile.jpeg`,
  kaytranada: `/assets/Marcus-profile.png`, // placeholder since kaytranada is missing
};"""

cat = cat.replace("const ARTIST_PROFILE: Record<string, string> = {};", new_artists)

with open("lib/marcus-catalog.ts", "w") as f:
    f.write(cat)
print("Fixed marcus-catalog.ts")
