import { NextRequest, NextResponse } from "next/server";
import { getKstTomorrow } from "@/lib/date/kst";
import { grammarRepository } from "@/repository/grammarRepository";
import { getContent } from "@/modules/content/content.service";

export async function GET(request: NextRequest) {
  try {

    // ✅ 내일 날짜 사용
    const { year, month, day } = getKstTomorrow();

    console.log(`🔥 slang prewarm 시작: ${year}-${month}-${day}`);

    const lesson = await getContent(
                            "slang",
                            year,
                            month + 1,
                            day
                );
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