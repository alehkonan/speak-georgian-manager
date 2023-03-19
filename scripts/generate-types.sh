#!/usr/bin/env bash

export $(grep -v '^#' .env.local | xargs)

yes $SUPABASE_ACCESS_TOKEN | npx supabase login

npx supabase gen types typescript --project-id $PROJECT_ID --schema public > typings/supabase.ts
