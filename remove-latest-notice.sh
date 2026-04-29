#!/bin/bash

LATEST_ID=$(jq -r '.items[-1].id' data/notices.json)

if [ "$LATEST_ID" == "null" ]; then
  echo "삭제할 공지가 없습니다."
  exit 1
fi

echo "삭제 대상 공지 ID: $LATEST_ID"

TMP=$(mktemp)
jq 'del(.items[-1])' data/notices.json > $TMP && mv $TMP data/notices.json

echo "공지 삭제 완료"

git add .
git commit -m "remove latest notice: $LATEST_ID"
git push