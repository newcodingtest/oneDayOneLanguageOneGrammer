import { NextRequest, NextResponse } from "next/server";
import {getGrammarLessonV1 } from "@/lib/getGrammarLesson";
import { getKstTomorrow } from "@/lib/date/kst";
import { grammarRepository } from "@/repository/grammarRepository";
import { getContent } from "@/modules/content/content.service";

export async function GET(request: NextRequest) {
  try {

    // ✅ 내일 날짜 사용
    const { year, month, day } = getKstTomorrow();

    console.log(`🔥 prewarm 시작: ${year}-${month}-${day}`);

    const lesson = await getContent(
                        "phrasal",
                        year,
                        month + 1,
                        day
            );
    await grammarRepository.saveOldVerb(lesson);
    return NextResponse.json({
      ok: true,
      target: `${year}-${month}-${day}`,
    });
  } catch (error) {
    console.error("[prewarm] 실패:", error);

    return NextResponse.json(
      { ok: false, message: "Prewarm failed" },
      { status: 500 }
    );
  }
}