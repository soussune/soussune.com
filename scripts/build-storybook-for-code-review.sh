#!/bin/bash
set -eu

if git diff master...HEAD --name-only | grep -q "src/\|stories/" ; then
  :
else
  echo "[Storybook] Skip"
  exit 0
fi

PULL_REQUEST_ID="${CI_PULL_REQUEST##*/pull/}"
if [ -z "$PULL_REQUEST_ID" ]; then
  echo "[Storybook] Skip"
  exit 0
fi

npm run build-storybook
mkdir -p "$CIRCLE_ARTIFACTS/storybook/"
mv storybook-static "$CIRCLE_ARTIFACTS"

STORYBOOK_URL="$CIRCLE_BUILD_URL/artifacts/$CIRCLE_NODE_INDEX/$CIRCLE_ARTIFACTS/storybook-static/index.html"
curl -X POST \
     -H "Authorization: bearer $GITHUB_API_TOKEN" \
     -H "Accept: application/vnd.github.v3.html+json" \
     -d "{\"body\":\"[Storybook] Created ([view stories]($STORYBOOK_URL))\"}" \
     "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues/$PULL_REQUEST_ID/comments"
