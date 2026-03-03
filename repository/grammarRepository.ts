import { supabaseAdmin } from '@/lib/supabaseServer';

export const grammarRepository = {
  async save(content: string){
    console.log('쿼리 까지는 들어왔어: ', content);
    const {data, error} = await supabaseAdmin
    .from('en_grammar')
    .insert([
      {
        content: content
      }
    ])
    .select()
    .single();

    if(error){
      console.log('DB 저장 실패: ', error.message);
      return { success: false, error};
    }
    console.log('DB 저장 성공: ', data);
    return { success: true, data};
  },

  async findByMonth(year: number, month: number) {
    // 월의 시작: YYYY-MM-01 00:00:00
    const startDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`;
    
    // 월의 끝: 해당 월의 마지막 날 23:59:59
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}T23:59:59.999Z`;

    console.log(`조회 기간: ${startDate} ~ ${endDate}`);

    const { data, error } = await supabaseAdmin
      .from('en_grammar')
      .select('id, content, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: true });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  },

}
