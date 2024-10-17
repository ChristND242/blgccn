#!/bin/sh

if ! bun check; then
    echo "TypeScript compilation failed. Please fix the errors before committing."
    exit 1
fi

#!/bin/sh

# Get the parameter passed by the commit-msg hook, that is, the path to the commit information file
COMMIT_MSG_FILE="$1"
# Read the contents of the commit information file
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")
# Check commit message format
if ! echo "$COMMIT_MSG" | grep -E '^(feat|chore|fix|docs|ci|style|test|pref): ' > /dev/null; then
    echo "ERROR: Commit message does not start with one of the following: feat|chore|fix|docs|ci|style|test|pref"
    echo "Please ensure your commit message starts with one of these prefixes followed by a colon and a space."
    exit 1
fi

exit 0