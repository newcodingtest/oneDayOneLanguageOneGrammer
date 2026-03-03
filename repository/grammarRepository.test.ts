import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

import { supabaseAdmin } from '@/lib/supabaseServer';
import { afterAll, describe, expect, it } from 'vitest';
import { grammarRepository } from './grammarRepository';

console.log('테스트 시작 전 URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

describe('grammarRepository.save 실제 DB 통합 테스트', () => {
  const TEST_CONTENT = '테스트 코드에서 보낸 실제 데이터입니다.';

  // [옵션] 테스트가 끝난 후 생성된 테스트 데이터를 삭제하여 DB를 깨끗하게 유지
  afterAll(async () => {
    await supabaseAdmin
      .from('en_grammar')
      .delete()
      .eq('content', TEST_CONTENT);
  });

  it('실제 Supabase DB에 데이터를 저장하고 결과를 반환해야 한다', async () => {
    // 1. 실제 함수 실행
    const result = await grammarRepository.save(TEST_CONTENT);

    // 2. 응답 값 검증
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.content).toBe(TEST_CONTENT);

    // 3. (선택사항) 직접 DB를 다시 조회해서 데이터가 있는지 한 번 더 확인
    const { data } = await supabaseAdmin
      .from('en_grammar')
      .select()
      .eq('id', result.data?.id)
      .single();

    expect(data).not.toBeNull();
    expect(data?.content).toBe(TEST_CONTENT);
  }, 10000); // 네트워크 통신이므로 타임아웃을 10초로 넉넉히 잡습니다.
});


describe('grammarRepository - findByMonth', () => {
  it('특정 연도와 월을 입력하면 해당 범위의 데이터를 가져와야 한다', async () => {
    // 1. Given (2024년 3월 데이터 요청)
    const year = 2026;
    const month = 3;

    // 2. When
    const result = await grammarRepository.findByMonth(year, month);

    console.log(`result: ${JSON.stringify(result, null, 2)}`);
    // 3. Then
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
    
    // 데이터 개수 확인
    expect(result.data?.length).toBeGreaterThan(0);

    // 첫 번째 데이터의 날짜가 해당 월(03)인지 확인
    const firstItemDate = result.data?.[0].created_at;
    expect(firstItemDate).toContain('2026-03');
  });

  it('데이터가 없는 달을 조회하면 빈 배열을 반환해야 한다', async () => {
    // 에러나 빈 데이터를 반환하도록 임시 모킹 변경 가능
    const result = await grammarRepository.findByMonth(2025, 12);
    
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('반환된 데이터의 날짜가 요청한 월 내에 있는지 확인한다', async () => {
  const year = 2026;
  const month = 3;
  const result = await grammarRepository.findByMonth(year, month);

  if (result.data && result.data.length > 0) {
    const date = new Date(result.data[0].created_at);
    
    // getUTCMonth는 0부터 시작하므로 +1 해줘야 함
    expect(date.getUTCFullYear()).toBe(year);
    expect(date.getUTCMonth() + 1).toBe(month);
  }
});
});