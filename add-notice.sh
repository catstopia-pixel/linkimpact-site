#!/bin/bash

ID=$(jq -r '[.items[].id | tostring | sub("^notice-"; "") | tonumber?] | max + 1' data/notices.json)

if [ "$ID" == "null" ] || [ -z "$ID" ]; then
  ID=1
fi

NOTICE_ID="notice-$ID"

echo "자동 생성된 공지 ID: $NOTICE_ID"

echo "제목 (한글):"
read TITLE_KO

echo "제목 (영문):"
read TITLE_EN

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

DATE=$(date +%Y-%m-%d)

TMP=$(mktemp)

jq \
  --arg id "$NOTICE_ID" \
  --arg date "$DATE" \
  --arg titleKo "$TITLE_KO" \
  --arg titleEn "$TITLE_EN" \
  --arg contentKo "$CONTENT_KO" \
  --arg contentEn "$CONTENT_EN" \
  '.items += [{
    id: $id,
    enabled: true,
    date: $date,
    title: {
      ko: $titleKo,
      en: $titleEn
    },
    content: {
      ko: [$contentKo],
      en: [$contentEn]
    }
  }]' data/notices.json > "$TMP" && mv "$TMP" data/notices.json

echo "공지 추가 완료: $NOTICE_ID"

git add .
git commit -m "add notice: $NOTICE_ID"
git push