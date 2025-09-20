#!/bin/bash

# Check if BACKEND_URL is set
if [ -z "$BACKEND_URL" ]; then
    echo "Warning: The BACKEND_URL environment variable is not set. If you're in local development you most likely can ignore this message. However if this is running in the CI/CD pipeline it means you will get a production error."
    BACKEND_URL="http://localhost:3001"
fi

echo "🚀 Generating typescript client..."

npx --yes openapi-typescript-codegen \
  --input ../spec.json \
  --output ./src \
  --useOptions \
  --useUnionTypes

cp client.ts src/

echo 'import { OpenAPI } from "./core/OpenAPI";' >> src/index.ts
echo 'export { getToken } from "./client";' >> src/index.ts

echo "OpenAPI.BASE = \"$BACKEND_URL\";" >> src/index.ts

# e
# rm -rf ../../frontend/src/lib/services/gen-api
# # important: gen-api folder must be in .gitignore since we don't want to commit it.
# cp -R ./src ../../frontend/src/lib/services/gen-api

echo -e "✅ Done!\n"