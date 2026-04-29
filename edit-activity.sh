#!/bin/bash

echo "수정할 활동 ID 입력:"
read ID

echo "새 제목 (한글):"
read TITLE_KO

echo "새 제목 (영문):"
read TITLE_EN

echo "새 요약 (한글):"
read SUMMARY_KO

echo "새 요약 (영문):"
read SUMMARY_EN

TMP=$(mktemp)

jq "(.items[] | select(.id == \"$ID\") | .title.ko) = \"$TITLE_KO\"" data/activities.json > $TMP && mv $TMP data/activities.json

TMP=$(mktemp)
jq "(.items[] | select(.id == \"$ID\") | .title.en) = \"$TITLE_EN\"" data/activities.json > $TMP && mv $TMP data/activities.json

TMP=$(mktemp)
jq "(.items[] | select(.id == \"$ID\") | .summary.ko) = \"$SUMMARY_KO\"" data/activities.json > $TMP && mv $TMP data/activities.json

TMP=$(mktemp)
jq "(.items[] | select(.id == \"$ID\") | .summary.en) = \"$SUMMARY_EN\"" data/activities.json > $TMP && mv $TMP data/activities.json

echo "활동 수정 완료: $ID"

git add .
git commit -m "edit activity: $ID"
git push