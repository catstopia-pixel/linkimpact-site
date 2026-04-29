#!/bin/bash

# 가장 큰 숫자 ID를 기준으로 다음 ID 자동 생성
ID=$(jq -r '[.items[].id | tostring | tonumber?] | max + 1' data/activities.json)

if [ "$ID" == "null" ] || [ -z "$ID" ]; then
  ID=1
fi

echo "자동 생성된 활동 ID: $ID"

echo "제목 (한글):"
read TITLE_KO

echo "제목 (영문):"
read TITLE_EN

echo "한줄요약 (한글):"
read SUMMARY_KO

echo "한줄요약 (영문):"
read SUMMARY_EN

echo "내용 전체 (한글):"
read CONTENT_KO

echo "내용 전체 (영문):"
read CONTENT_EN

DATE=$(date +%Y-%m-%d)

mkdir -p "assets/img/activities/$ID"

echo "이미지 파일을 아래 폴더에 넣어주세요:"
echo "assets/img/activities/$ID"
echo "필수 대표 이미지 파일명: cover.png"
echo "추가 이미지 파일명 예시: 01.png, 02.png, 03.png"

TMP=$(mktemp)

jq ".items += [{
  \"id\": \"$ID\",
  \"category\": \"world\",
  \"date\": \"$DATE\",
  \"place\": \"\",
  \"title\": {
    \"ko\": \"$TITLE_KO\",
    \"en\": \"$TITLE_EN\"
  },
  \"summary\": {
    \"ko\": \"$SUMMARY_KO\",
    \"en\": \"$SUMMARY_EN\"
  },
  \"content\": {
    \"ko\": [\"$CONTENT_KO\"],
    \"en\": [\"$CONTENT_EN\"]
  },
  \"media\": {
    \"thumb\": \"assets/img/activities/$ID/cover.png\",
    \"cover\": \"assets/img/activities/$ID/cover.png\",
    \"images\": []
  },
  \"tags\": []
}]" data/activities.json > "$TMP" && mv "$TMP" data/activities.json

echo "활동 추가 완료: $ID"

git add .
git commit -m "add activity: $ID"
git push
