#!/bin/bash

echo "삭제할 활동 ID 입력:"
read ID

# JSON에서 삭제
TMP=$(mktemp)

jq "del(.items[] | select(.id == \"$ID\"))" data/activities.json > $TMP && mv $TMP data/activities.json

# 이미지 폴더 삭제
rm -rf assets/img/activities/$ID

echo "활동 삭제 완료: $ID"

git add .
git commit -m "remove activity: $ID"
git push