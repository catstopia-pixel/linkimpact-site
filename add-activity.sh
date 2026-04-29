#!/bin/bash

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

echo "내용 전체 (한글)를 입력하세요. 입력이 끝나면 새 줄에 END 입력:"
CONTENT_KO=""
while IFS= read -r line; do
  [ "$line" = "END" ] && break
  CONTENT_KO+="$line"$'\n'
done

echo "내용 전체 (영문)를 입력하세요. 입력이 끝나면 새 줄에 END 입력:"
CONTENT_EN=""
while IFS= read -r line; do
  [ "$line" = "END" ] && break
  CONTENT_EN+="$line"$'\n'
done

DATE=$(date +%Y-%m-%d)

mkdir -p "assets/img/activities/$ID"

echo "이미지 파일을 아래 폴더에 넣어주세요:"
echo "assets/img/activities/$ID"
echo "필수 대표 이미지 파일명: cover.png"
echo "추가 이미지 파일명 예시: 01.png, 02.png, 03.png"

TMP=$(mktemp)

jq \
  --arg id "$ID" \
  --arg date "$DATE" \
  --arg titleKo "$TITLE_KO" \
  --arg titleEn "$TITLE_EN" \
  --arg summaryKo "$SUMMARY_KO" \
  --arg summaryEn "$SUMMARY_EN" \
  --arg contentKo "$CONTENT_KO" \
  --arg contentEn "$CONTENT_EN" \
  '.items += [{
    id: $id,
    category: "world",
    date: $date,
    place: "",
    title: {
      ko: $titleKo,
      en: $titleEn
    },
    summary: {
      ko: $summaryKo,
      en: $summaryEn
    },
    content: {
      ko: [$contentKo],
      en: [$contentEn]
    },
    media: {
      thumb: ("assets/img/activities/" + $id + "/cover.png"),
      cover: ("assets/img/activities/" + $id + "/cover.png"),
      images: []
    },
    tags: []
  }]' data/activities.json > "$TMP" && mv "$TMP" data/activities.json

echo "활동 추가 완료: $ID"

git add .
git commit -m "add activity: $ID"
git push

