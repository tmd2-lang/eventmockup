import re

with open('components/profile/ProfileScreen.tsx', 'r') as f:
    content = f.read()

# Delete the constants block from line 34 to 170 (approx)
# We can just use regex to remove everything from `const EARNED_ARCHETYPE_ID =` to `const FIRST_TO_PICK = [...]`

content = re.sub(r'const EARNED_ARCHETYPE_ID =.*?(?=\nexport function ProfileV2Provider)', '', content, flags=re.DOTALL)

# Now we need to define `useActiveUserProfile` hook
hook = """
export function useActiveUserProfile() {
  const [activeUserId] = usePersistentState('ligo:active_user', 'jordan');
  const user = USERS[activeUserId] || USERS['jordan'];
  return user.profile;
}

"""

content = content.replace("export function ProfileV2Provider", hook + "export function ProfileV2Provider")

# Now replace the usages of the constants.
replacements = {
    'EARNED_ARCHETYPE_ID': 'useActiveUserProfile().earnedArchetypeId',
    'TRAITS': 'useActiveUserProfile().traits',
    'HELD_WEEKS': 'useActiveUserProfile().heldWeeks',
    'EARNED_BLURB': 'useActiveUserProfile().earnedBlurb',
    'ARTISTS': 'useActiveUserProfile().artists',
    'AFTER_HOURS_COVER': 'useActiveUserProfile().afterHoursCover',
    'PLAYLIST_TRACK_COUNT': 'useActiveUserProfile().playlistTrackCount',
    'ANSWER_TRAIL': 'useActiveUserProfile().answerTrail',
    'PLAYLIST_TRACKS': 'useActiveUserProfile().playlistTracks',
    'PAST_READS': 'useActiveUserProfile().pastReads',
    'CURRENT_STREAK': 'useActiveUserProfile().currentStreak',
    'LONGEST_STREAK': 'useActiveUserProfile().longestStreak',
    'TASTE_EVOLUTION': 'useActiveUserProfile().tasteEvolution',
    'RAREST_PICKS': 'useActiveUserProfile().rarestPicks',
    'CONNECTED_SONGS': 'useActiveUserProfile().connectedSongs',
    'FIRST_TO_PICK': 'useActiveUserProfile().firstToPick',
}

for k, v in replacements.items():
    content = re.sub(r'\b' + k + r'\b', v, content)

with open('components/profile/ProfileScreen.tsx', 'w') as f:
    f.write(content)

print("Done")
