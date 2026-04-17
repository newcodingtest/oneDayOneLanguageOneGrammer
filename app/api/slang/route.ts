import { NextRequest, NextResponse } from "next/server";
import { getSlang } from "@/lib/getGrammarLesson";
import { getKstTomorrow } from "@/lib/date/kst";
import { grammarRepository } from "@/repository/grammarRepository";

export async function GET(request: NextRequest) {
  try {

    // ✅ 내일 날짜 사용
    const { year, month, day } = getKstTomorrow();

    console.log(`🔥 slang prewarm 시작: ${year}-${month}-${day}`);

    const lesson = await getSlang(year, month, day);
    await grammarRepository.saveSlang(lesson);
    
    return NextResponse.json({
      ok: true,
      target: `${year}-${month}-${day}`,
    });
  } catch (error) {
    console.error("[slang prewarm] 실패:", error);

    return NextResponse.json(
      { ok: false, message: "Prewarm failed" },
      { status: 500 }
    );
  }
}