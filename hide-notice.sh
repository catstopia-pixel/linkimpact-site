#!/bin/bash

echo "숨길 공지 ID 입력:"
read ID

TMP=$(mktemp)

jq "(.items[] | select(.id == \"$ID\") | .enabled) = false" data/notices.json > $TMP && mv $TMP data/notices.json

echo "공지 숨김 처리 완료: $ID"

git add .
git commit -m "hide notice: $ID"
git push