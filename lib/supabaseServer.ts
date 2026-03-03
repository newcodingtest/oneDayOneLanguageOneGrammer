import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("❌ 현재 환경 변수 상태:", { url, key });
    throw new Error("Supabase 환경 변수가 없습니다. .env 파일을 확인하세요.");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const supabaseAdmin = getSupabaseAdmin();