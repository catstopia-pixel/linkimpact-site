#!/bin/bash

echo "공지 ID 입력 (예: notice-2026-05-01):"
read ID

echo "제목 (한글):"
read TITLE_KO

echo "제목 (영문):"
read TITLE_EN

echo "내용 (한글, 한 줄):"
read CONTENT_KO

echo "내용 (영문, 한 줄):"
read CONTENT_EN

DATE=$(date +%Y-%m-%d)

TMP=$(mktemp)

jq ".items += [{
  \"id\": \"$ID\",
  \"enabled\": true,
  \"date\": \"$DATE\",
  \"title\": {\"en\": \"$TITLE_EN\", \"ko\": \"$TITLE_KO\"},
  \"content\": {
    \"en\": [\"$CONTENT_EN\"],
    \"ko\": [\"$CONTENT_KO\"]
  }
}]" data/notices.json > $TMP && mv $TMP data/notices.json

echo "공지 추가 완료"

git add .
git commit -m "add notice: $ID"
git push