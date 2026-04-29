#!/bin/bash

LATEST_ID=$(jq -r '.items[-1].id' data/activities.json)

if [ "$LATEST_ID" == "null" ]; then
  echo "삭제할 활동이 없습니다."
  exit 1
fi

echo "삭제 대상 활동 ID: $LATEST_ID"

echo "정말 삭제하시겠습니까? (y/n)"
read CONFIRM

if [ "$CONFIRM" != "y" ]; then
  echo "삭제 취소됨"
  exit 0
fi

TMP=$(mktemp)
jq 'del(.items[-1])' data/activities.json > $TMP && mv $TMP data/activities.json

rm -rf assets/img/activities/$LATEST_ID

echo "활동 및 이미지 삭제 완료"

git add .
git commit -m "remove latest activity: $LATEST_ID"
git push
