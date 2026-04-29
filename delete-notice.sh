#!/bin/bash

echo "삭제할 공지 ID 입력:"
read ID

TMP=$(mktemp)

jq "del(.items[] | select(.id == \"$ID\"))" data/notices.json > $TMP && mv $TMP data/notices.json

echo "공지 삭제 완료: $ID"

git add .
git commit -m "remove notice: $ID"
git push
