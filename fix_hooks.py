import re

with open('components/profile/ProfileScreen.tsx', 'r') as f:
    content = f.read()

# Find all function components that contain `useActiveUserProfile()`
components = re.findall(r'function ([A-Z][a-zA-Z0-9_]*)\s*\([^)]*\)\s*\{', content)

for comp in components:
    # Check if component uses it
    comp_body_match = re.search(r'function ' + comp + r'\s*\([^)]*\)\s*\{(.*?)(?=\nfunction [A-Z]|\nexport function|\Z)', content, re.DOTALL)
    if comp_body_match:
        body = comp_body_match.group(1)
        if 'useActiveUserProfile()' in body:
            # Add `const profile = useActiveUserProfile();` to the top of the component if not already there
            if 'const profile = useActiveUserProfile();' not in body:
                # Replace the start of the function
                content = re.sub(r'(function ' + comp + r'\s*\([^)]*\)\s*\{)', r'\1\n  const profile = useActiveUserProfile();', content)
                
# Now replace all `useActiveUserProfile().` with `profile.` EXCEPT in the hook definition itself
# But wait, the hook definition is `export function useActiveUserProfile() {`
content = content.replace('useActiveUserProfile().', 'profile.')

with open('components/profile/ProfileScreen.tsx', 'w') as f:
    f.write(content)

print("Done fixing hooks")
