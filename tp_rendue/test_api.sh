#!/usr/bin/env bash
# Manual API verification script for the CI/CD Tp.
# This script need the server (npm run start).
# It performs a set of curl calls and prints status codes + response snippets.

BASE_URL="http://localhost:3000"

run() {
  local label="$1"
  shift
  echo "\n>> $label"

  # Use curl to fetch the response, then extract status and body.
  local response
  response=$(curl -sS --max-time 5 -w "\n__HTTP_STATUS__%{http_code}" "$@" 2>&1)

  # Ensure we captured the status delimiter
  local status
  if echo "$response" | grep -q "__HTTP_STATUS__"; then
    status=$(echo "$response" | awk -F"__HTTP_STATUS__" '{print $2}')
    body=$(echo "$response" | sed 's/__HTTP_STATUS__.*//')
  else
    status="000"
    body="$response"
  fi

  echo "Status: $status"
  echo "Response body (first 200 chars):"
  echo "$body" | head -c 200 | sed 's/$/\n/'
  echo "\n---"
}

run "GET /students" "$BASE_URL/students"

run "GET /students/INE00000001" "$BASE_URL/students/INE00000001"

run "GET /students/INE99999999 (expected 404)" "$BASE_URL/students/INE99999999"

run "POST /students (valid)" -X POST -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test.user@example.com","grade":14,"field":"informatique"}' \
  "$BASE_URL/students"

run "POST /students (missing email)" -X POST -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","grade":14,"field":"informatique"}' \
  "$BASE_URL/students"

run "POST /students (duplicate email)" -X POST -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"alice.dupont@example.com","grade":14,"field":"informatique"}' \
  "$BASE_URL/students"

run "PUT /students/INE00000001 (partial update)" -X PUT -H "Content-Type: application/json" \
  -d '{"lastName":"Dupont-Updated"}' \
  "$BASE_URL/students/INE00000001"

run "DELETE /students/INE00000001" -X DELETE "$BASE_URL/students/INE00000001"

run "GET /students/stats" "$BASE_URL/students/stats"

run "GET /students/search?q=ahmed" "$BASE_URL/students/search?q=ahmed"

rm -f /tmp/api_response.json

echo "\nDone. Verify status codes above match expectations."