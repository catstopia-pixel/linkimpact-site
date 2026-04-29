#!/bin/bash

URL=$1

if [ -z "$URL" ]; then
  echo "사용법: ./import-activity.sh \"링크\""
  exit 1
fi

echo "페이지 가져오는 중..."

HTML=$(curl -s "$URL")

TITLE=$(echo "$HTML" | grep -o '<title>.*</title>' | sed 's/<[^>]*>//g')

CONTENT=$(echo "$HTML" \
  | sed 's/<[^>]*>/\n/g' \
  | sed '/^\s*$/d' \
  | head -n 20)

TMP_FILE="data/_draft.json"

cat <<EOF > $TMP_FILE
{
  "title": "$TITLE",
  "summary": "",
  "content": [
$(echo "$CONTENT" | sed 's/.*/    "&",/' | sed '$ s/,$//')
  ]
}
EOF

echo "초안 생성 완료 → $TMP_FILE"
