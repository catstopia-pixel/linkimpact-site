#!/bin/bash

echo "활동 ID 입력 (예: marine-2026):"
read ID

echo "제목 (한글):"
read TITLE_KO

echo "제목 (영문):"
read TITLE_EN

echo "요약 (한글):"
read SUMMARY_KO

echo "요약 (영문):"
read SUMMARY_EN

echo "내용 (한글, 한 줄):"
read CONTENT_KO

echo "내용 (영문, 한 줄):"
read CONTENT_EN

DATE=$(date +%Y-%m-%d)

# 폴더 생성
mkdir -p assets/img/activities/$ID

echo "이미지 파일을 아래 폴더에 넣어주세요:"
echo "assets/img/activities/$ID"

# JSON 추가
TMP=$(mktemp)

jq ".items += [{
  \"id\": \"$ID\",
  \"category\": \"world\",
  \"date\": \"$DATE\",
  \"place\": \"\",
  \"title\": {\"en\": \"$TITLE_EN\", \"ko\": \"$TITLE_KO\"},
  \"summary\": {\"en\": \"$SUMMARY_EN\", \"ko\": \"$SUMMARY_KO\"},
  \"content\": {
    \"en\": [\"$CONTENT_EN\"],
    \"ko\": [\"$CONTENT_KO\"]
  },
  \"media\": {
    \"thumb\": \"assets/img/activities/$ID/cover.png\",
    \"cover\": \"assets/img/activities/$ID/cover.png\",
    \"images\": []
  }
}]" data/activities.json > $TMP && mv $TMP data/activities.json

echo "활동 추가 완료"

# git 자동 배포
git add .
git commit -m "add activity: $ID"
git push