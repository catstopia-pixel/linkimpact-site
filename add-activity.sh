#!/bin/bash

YEAR=$(date +%Y)
MONTH=$(date +%m)

BASE_PATH="assets/img/activities/$YEAR/$MONTH"

mkdir -p "$BASE_PATH"

# 해당 월 폴더에서 가장 큰 숫자 ID 찾기
LAST_ID=$(find "$BASE_PATH" -maxdepth 1 -type d -printf "%f\n" 2>/dev/null | grep -E '^[0-9]+$' | sort -n | tail -1)

if [ -z "$LAST_ID" ]; then
  NEW_ID="001"
else
  NEXT_ID=$((10#$LAST_ID + 1))
  NEW_ID=$(printf "%03d" $NEXT_ID)
fi

ID="$YEAR-$MONTH-$NEW_ID"

echo "자동 생성된 활동 ID: $ID"

echo "제목 (한글):"
read TITLE_KO

echo "제목 (영문):"
read TITLE_EN

echo "한줄요약 (한글):"
read SUMMARY_KO

echo "한줄요약 (영문):"
read SUMMARY_EN

echo "내용 전체 (한글) 입력 후 END:"
CONTENT_KO=""
while IFS= read -r line; do
  [ "$line" = "END" ] && break
  CONTENT_KO+="$line"$'\n'
done

echo "내용 전체 (영문) 입력 후 END:"
CONTENT_EN=""
while IFS= read -r line; do
  [ "$line" = "END" ] && break
  CONTENT_EN+="$line"$'\n'
done

FOLDER="$BASE_PATH/$NEW_ID"
mkdir -p "$FOLDER"

echo "이미지 넣기:"
echo "$FOLDER"
echo "cover.png 필수"
echo "추가 이미지 파일명 예시: 01.png, 02.png, 03.png, 04.png, 05.png"
echo "이미지를 넣은 뒤 Enter를 누르면 등록을 계속합니다."
read

DATE=$(date +%Y-%m-%d)

IMAGES=$(find "$FOLDER" -maxdepth 1 -type f \( \
  -name "01.png" -o \
  -name "02.png" -o \
  -name "03.png" -o \
  -name "04.png" -o \
  -name "05.png" -o \
  -name "06.png" -o \
  -name "07.png" -o \
  -name "08.png" -o \
  -name "09.png" \
\) | sort | jq -R . | jq -s .)

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
  --arg folder "$FOLDER" \
  --argjson images "$IMAGES" \
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
      thumb: ($folder + "/cover.png"),
      cover: ($folder + "/cover.png"),
      images: $images
    },
    tags: []
  }]' data/activities.json > "$TMP" && mv "$TMP" data/activities.json

echo "활동 생성 완료: $ID"

git add .
git commit -m "add activity: $ID"
git push