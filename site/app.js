(() => {
  const SUPABASE_URL = "https://jnciddblcndmthmmvqrz.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuY2lkZGJsY25kbXRobW12cXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjI4MzUsImV4cCI6MjA5NzA5ODgzNX0.X7KFyKtc-lqKTgbqJodZ6zr6qcxjm23gnsyUJYOFpAg";
  const INSTAGRAM = "https://www.instagram.com/365daily.snap/";
  const KAKAO = "https://open.kakao.com/o/sV8I6vmi";

  const COPY = {
    ko: {
      title: "365 Daily Snap | 서울 인물 스냅·프로필 촬영",
      description: "서울·수도권에서 자연스러운 인물 스냅, 프로필, 커플 촬영과 포트폴리오 협업을 진행합니다.",
      navWork: "대표 작업", navSessions: "촬영 구성", navReviews: "후기", navAbout: "작가 소개", navFaq: "FAQ", navContact: "문의",
      heroEyebrow: "SEOUL · CAPITAL AREA · TOKYO SELECTED DATES",
      heroTitle: "평범한 하루도,<br />오래 기억될 장면으로.",
      heroDescription: "서울·수도권에서 자연스러운 인물 스냅을 촬영합니다. 사진이 처음이어도 포즈와 시선을 편안하게 안내해드립니다.",
      heroPrimary: "대표 작업 보기", heroSecondary: "촬영 문의하기", trust1: "평일 저녁·주말", trust2: "개인·커플·프로필", trust3: "TFP 협업 가능",
      workTitle: "사진 한 장보다, 촬영의 흐름을 보여드립니다.", workDescription: "같은 날의 분위기와 장면을 하나의 프로젝트로 묶었습니다.", moreProjects: "프로젝트 더 보기", less: "접기", viewProject: "프로젝트 보기", projectInquiry: "이 분위기로 문의하기", photos: "장",
      whyTitle: "촬영이 어색한 순간부터 함께 정리합니다.", why1Title: "처음이어도 괜찮습니다", why1Text: "걷기, 시선, 손 위치처럼 작은 움직임부터 안내합니다.", why2Title: "장소와 시간대를 함께 고릅니다", why2Text: "원하는 분위기와 이동 동선을 기준으로 촬영 장소를 제안합니다.", why3Title: "과하지 않은 자연스러운 보정", why3Text: "피부톤과 색감, 배경을 정돈하되 본래의 인상은 유지합니다.", why4Title: "공개 범위를 먼저 확인합니다", why4Text: "전체 공개, 일부 공개, 비공개 요청을 촬영 전에 조율합니다.",
      sessionsTitle: "필요한 목적에 맞춰 촬영합니다.", sessionsDescription: "정확한 비용과 제공 컷은 촬영 시간, 장소 이동, 보정 범위에 따라 상담 후 안내합니다.", session1Title: "개인 인물 스냅", session1Time: "약 60분", session1Text: "프로필, SNS, 일상 기록을 위한 자연스러운 개인 촬영입니다.", session2Title: "커플·데이트 스냅", session2Time: "약 60~90분", session2Text: "과한 연출보다 두 사람의 편안한 움직임과 표정을 담습니다.", session3Title: "프로필·브랜딩", session3Time: "약 60~90분", session3Text: "소개 페이지, 블로그, 업무용 프로필에 맞춰 이미지 방향을 설계합니다.", session4Title: "포트폴리오 협업", session4Time: "일정 협의", session4Text: "서로 필요한 방향이 맞는 경우 상호무페이·TFP 촬영을 진행합니다.",
      processTitle: "복잡하지 않게, 네 단계로 진행합니다.", process1Title: "문의", process1Text: "희망 날짜, 지역, 촬영 목적과 원하는 분위기를 보내주세요.", process2Title: "일정·장소 확정", process2Text: "이동 동선과 시간대에 맞춰 촬영 장소와 콘셉트를 정합니다.", process3Title: "촬영", process3Text: "대화하며 자연스러운 표정과 움직임을 함께 만들어갑니다.", process4Title: "셀렉·보정·전달", process4Text: "후보 컷을 확인하고 선택한 사진을 자연스럽게 보정해 전달합니다.",
      reviewsTitle: "함께 촬영한 분들의 실제 후기", reviewsDescription: "결과물뿐 아니라 촬영 분위기와 소통 과정까지 확인해보세요.", moreReviews: "후기 더 보기", originalReview: "후기 원본 보기",
      aboutTitle: "안녕하세요. 365 Daily Snap의 김경민입니다.", aboutText: "정해진 포즈를 반복하기보다 대화와 움직임 속에서 자연스러운 표정을 담습니다. 사진이 익숙하지 않은 분도 부담 없이 촬영할 수 있도록 포즈와 시선을 단계별로 안내합니다.", aboutFact1: "서울·수도권 중심", aboutFact2: "평일 저녁·주말 촬영", aboutFact3: "개인·커플·프로필", aboutFact4: "도쿄 선택 일정",
      faqTitle: "촬영 전에 많이 묻는 내용",
      faqs: [
        ["사진이 처음이어도 괜찮나요?", "괜찮습니다. 정해진 포즈를 외울 필요 없이 걷기, 시선, 손 위치부터 현장에서 안내합니다."],
        ["원본도 받을 수 있나요?", "촬영 형태에 따라 원본 전달 범위를 사전에 안내합니다. 후보 컷을 공유한 뒤 원하는 사진을 선택하는 방식으로 진행할 수 있습니다."],
        ["보정은 어디까지 진행하나요?", "색감, 피부톤, 노출, 배경의 방해 요소를 자연스럽게 정리합니다. 얼굴형을 크게 바꾸는 과도한 변형은 기본 보정에 포함하지 않습니다."],
        ["비공개 촬영도 가능한가요?", "가능합니다. 포트폴리오 공개 가능 여부와 공개 범위는 촬영 전에 별도로 확인합니다."],
        ["비가 오면 어떻게 하나요?", "실내 장소로 변경하거나 일정을 조정합니다. 촬영 전날 예보를 기준으로 함께 결정합니다."],
        ["촬영 장소도 추천받을 수 있나요?", "원하는 색감, 의상, 이동 가능한 지역을 바탕으로 장소와 적절한 시간대를 제안합니다."]
      ],
      contactTitle: "30초 빠른 문의부터 상세 상담까지", contactDescription: "필수 정보만 먼저 남기고, 촬영 방향은 이후 대화로 정리해도 괜찮습니다.", quickInquiry: "빠른 문의", detailInquiry: "상세 문의", formType: "촬영 유형 *", formName: "이름 / 닉네임 *", formContactMethod: "연락 방법", formContact: "연락처 또는 계정 *", formDate: "희망 날짜 *", formRegion: "희망 지역", formMood: "원하는 분위기", formPurpose: "촬영 목적", formPeople: "인원 수", formPrivacy: "사진 공개 범위", formReference: "참고 이미지", uploadHint: "최대 3장, 장당 8MB 이하", formMessage: "추가 요청", formConsent: "문의 접수를 위한 개인정보 수집·이용에 동의합니다. *", consentDetail: "수집 항목: 이름, 연락처, 촬영 요청 정보 · 목적: 촬영 상담 및 일정 조율 · 보관: 상담 종료 후 1년 또는 요청 시 즉시 삭제", previous: "이전", next: "다음", submit: "문의 보내기", sending: "전송 중", sent: "문의가 접수되었습니다. 확인 후 입력하신 연락처로 답변드리겠습니다.", validation: "필수 항목과 개인정보 동의를 확인해주세요.", fallback: "웹 저장에 실패해 문의 내용을 복사했습니다. 카카오톡 또는 Instagram DM에 붙여넣어 보내주세요.",
      types: ["개인 인물", "커플", "프로필·브랜딩", "포트폴리오 협업", "상담 후 결정"], privacyOptions: ["상담 후 결정", "전체 공개 가능", "일부 컷만 공개", "비공개 희망"],
      footerLine: "자연스러운 인물 스냅 · 서울 / 수도권 / 도쿄 선택 일정", privacyNotice: "개인정보 처리 안내"
    },
    ja: {
      title: "365 Daily Snap | ソウル・東京 ポートレート撮影", description: "ソウル首都圏を中心に、自然なポートレート、プロフィール、カップル撮影を行います。",
      navWork: "作品", navSessions: "撮影プラン", navReviews: "レビュー", navAbout: "プロフィール", navFaq: "FAQ", navContact: "お問い合わせ",
      heroEyebrow: "SEOUL · CAPITAL AREA · TOKYO SELECTED DATES", heroTitle: "何気ない一日を、<br />長く残る一枚に。", heroDescription: "ソウル首都圏を中心に自然なポートレートを撮影します。初めての方にもポーズや目線を丁寧にご案内します。", heroPrimary: "作品を見る", heroSecondary: "撮影を問い合わせる", trust1: "平日夜・週末", trust2: "個人・カップル・プロフィール", trust3: "TFP相談可能",
      workTitle: "一枚ではなく、撮影全体の空気を。", workDescription: "同じ日に撮影した写真を一つのプロジェクトとしてまとめています。", moreProjects: "もっと見る", less: "閉じる", viewProject: "プロジェクトを見る", projectInquiry: "この雰囲気で相談する", photos: "枚",
      whyTitle: "撮影の不安から一緒に整えます。", why1Title: "初めてでも大丈夫", why1Text: "歩き方、目線、手の位置から丁寧にご案内します。", why2Title: "場所と時間も提案", why2Text: "希望する雰囲気と移動範囲に合わせて場所をご提案します。", why3Title: "自然なレタッチ", why3Text: "肌色や色調を整えながら本来の印象を残します。", why4Title: "公開範囲を事前確認", why4Text: "全体公開、一部公開、非公開を撮影前に確認します。",
      sessionsTitle: "目的に合わせた撮影プラン", sessionsDescription: "料金と納品枚数は撮影時間、移動、レタッチ範囲により個別にご案内します。", session1Title: "個人ポートレート", session1Time: "約60分", session1Text: "プロフィール、SNS、日常の記録に。", session2Title: "カップル撮影", session2Time: "約60〜90分", session2Text: "二人らしい自然な動きと表情を撮影します。", session3Title: "プロフィール・ブランディング", session3Time: "約60〜90分", session3Text: "仕事用プロフィールに合わせて方向性を整理します。", session4Title: "ポートフォリオ協力", session4Time: "日程相談", session4Text: "方向性が合う場合、TFP撮影も行います。",
      processTitle: "4つのステップで進みます。", process1Title: "お問い合わせ", process1Text: "希望日、エリア、目的、イメージをお送りください。", process2Title: "日程・場所の決定", process2Text: "移動と時間帯に合わせて場所とコンセプトを決めます。", process3Title: "撮影", process3Text: "会話をしながら自然な表情と動きを引き出します。", process4Title: "セレクト・納品", process4Text: "選んだ写真を自然にレタッチしオンラインで納品します。",
      reviewsTitle: "実際に撮影した方のレビュー", reviewsDescription: "写真だけでなく撮影中の雰囲気やコミュニケーションもご確認ください。", moreReviews: "もっと見る", originalReview: "レビュー原文",
      aboutTitle: "365 Daily SnapのKim Kyungminです。", aboutText: "決まったポーズを繰り返すのではなく、会話と動きの中で自然な表情を残します。初めての方にもポーズや目線を段階的にご案内します。", aboutFact1: "ソウル首都圏", aboutFact2: "平日夜・週末", aboutFact3: "個人・カップル", aboutFact4: "東京選択日程",
      faqTitle: "よくある質問", faqs: [["撮影が初めてでも大丈夫ですか？","大丈夫です。ポーズを覚える必要はなく、歩き方や目線からご案内します。"],["元データはもらえますか？","撮影内容に応じて事前にご案内します。候補からお好きな写真を選ぶこともできます。"],["レタッチの範囲は？","色、肌色、明るさ、背景を自然に整えます。顔立ちを大きく変える加工は基本に含みません。"],["非公開撮影は可能ですか？","可能です。公開範囲は撮影前に確認します。"],["雨の場合は？","室内への変更、または日程変更を前日の予報を見て相談します。"],["場所を提案してもらえますか？","服装、希望する色味、移動範囲に合わせて場所と時間をご提案します。"]],
      contactTitle: "簡単な相談から詳しいお問い合わせまで", contactDescription: "必須情報だけ先に送り、詳しい内容は後から一緒に整理できます。", quickInquiry: "簡単問い合わせ", detailInquiry: "詳細問い合わせ", formType: "撮影タイプ *", formName: "お名前 / ニックネーム *", formContactMethod: "連絡方法", formContact: "連絡先 *", formDate: "希望日 *", formRegion: "希望エリア", formMood: "希望イメージ", formPurpose: "撮影目的", formPeople: "人数", formPrivacy: "公開範囲", formReference: "参考画像", uploadHint: "最大3枚、1枚8MB以下", formMessage: "その他", formConsent: "お問い合わせに必要な個人情報の収集・利用に同意します。 *", consentDetail: "収集項目：名前、連絡先、撮影内容 · 目的：撮影相談と日程調整 · 保管：相談終了後1年、または削除依頼時", previous: "戻る", next: "次へ", submit: "送信する", sending: "送信中", sent: "お問い合わせを受け付けました。確認後ご連絡します。", validation: "必須項目と同意欄をご確認ください。", fallback: "保存に失敗したため内容をコピーしました。KakaoTalkまたはInstagram DMに貼り付けてください。", types: ["個人", "カップル", "プロフィール・ブランディング", "ポートフォリオ協力", "相談して決定"], privacyOptions: ["相談して決定", "公開可能", "一部のみ公開", "非公開希望"], footerLine: "自然なポートレート · Seoul / Tokyo", privacyNotice: "プライバシー"
    },
    en: {
      title: "365 Daily Snap | Seoul & Tokyo Portrait Photographer", description: "Natural portrait, profile and couple sessions in Seoul, the capital area and selected Tokyo dates.",
      navWork: "Work", navSessions: "Sessions", navReviews: "Reviews", navAbout: "About", navFaq: "FAQ", navContact: "Contact",
      heroEyebrow: "SEOUL · CAPITAL AREA · TOKYO SELECTED DATES", heroTitle: "Turn an ordinary day<br />into a lasting frame.", heroDescription: "Natural portrait sessions in Seoul and the capital area. First time in front of a camera? I guide your pose, gaze and movement throughout the shoot.", heroPrimary: "View featured work", heroSecondary: "Plan a session", trust1: "Weekday evenings & weekends", trust2: "Portrait · Couple · Profile", trust3: "TFP collaboration available",
      workTitle: "See the flow of a session, not just one frame.", workDescription: "Photos from the same shoot are grouped into projects so you can understand the full mood and story.", moreProjects: "Show more projects", less: "Show less", viewProject: "View project", projectInquiry: "Ask for this mood", photos: "photos",
      whyTitle: "We start by making the shoot feel comfortable.", why1Title: "Beginner-friendly direction", why1Text: "I guide small movements such as walking, eye line and hand placement.", why2Title: "Location and timing support", why2Text: "Locations are suggested around your preferred mood and travel route.", why3Title: "Natural retouching", why3Text: "Skin tone, color and distractions are refined while keeping you recognizable.", why4Title: "Clear publishing consent", why4Text: "Full, partial or private use is agreed before the session.",
      sessionsTitle: "A session for the way you will use the photos.", sessionsDescription: "Final pricing and delivery count depend on session length, travel and retouching scope.", session1Title: "Personal portrait", session1Time: "About 60 min", session1Text: "Natural portraits for profiles, social media and personal memories.", session2Title: "Couple & date", session2Time: "About 60–90 min", session2Text: "Comfortable movement and genuine expressions over rigid posing.", session3Title: "Profile & branding", session3Time: "About 60–90 min", session3Text: "A visual direction for personal sites, blogs and professional profiles.", session4Title: "Portfolio collaboration", session4Time: "By agreement", session4Text: "TFP sessions are available when both portfolios and concepts align.",
      processTitle: "A clear four-step process.", process1Title: "Inquiry", process1Text: "Share your preferred date, area, purpose and visual references.", process2Title: "Plan", process2Text: "We confirm the location, timing and concept around your route.", process3Title: "Shoot", process3Text: "We talk and move naturally while I guide your expression and pose.", process4Title: "Select & deliver", process4Text: "Selected images are naturally retouched and delivered online.",
      reviewsTitle: "Reviews from people I photographed", reviewsDescription: "See what the communication and atmosphere felt like, not only the final images.", moreReviews: "Show more reviews", originalReview: "View original review",
      aboutTitle: "Hi, I’m Kim Kyungmin of 365 Daily Snap.", aboutText: "Rather than repeating fixed poses, I look for natural expressions in conversation and movement. I guide first-time clients step by step so the session feels easy and unforced.", aboutFact1: "Seoul & capital area", aboutFact2: "Evenings & weekends", aboutFact3: "Portrait · Couple · Profile", aboutFact4: "Selected Tokyo dates",
      faqTitle: "Common questions before a shoot", faqs: [["Is it okay if this is my first photo session?","Absolutely. You do not need to memorize poses. I guide walking, eye line and hand placement on location."],["Can I receive the original files?","The delivery scope is agreed before the session. A selection gallery can be shared so you can choose your preferred frames."],["How much retouching is included?","Color, skin tone, exposure and background distractions are refined naturally. Major face-shape alterations are not part of the standard edit."],["Can the session remain private?","Yes. Full, partial or no portfolio use can be agreed before the shoot."],["What happens if it rains?","We can switch to an indoor location or reschedule based on the forecast the day before."],["Can you recommend a location?","Yes. I suggest locations and timing based on your outfit, preferred color palette and travel area."]],
      contactTitle: "Start with a 30-second inquiry or send full details", contactDescription: "You can send only the essentials first and refine the concept together afterwards.", quickInquiry: "Quick inquiry", detailInquiry: "Detailed inquiry", formType: "Session type *", formName: "Name / nickname *", formContactMethod: "Contact method", formContact: "Contact or account *", formDate: "Preferred date *", formRegion: "Preferred area", formMood: "Desired mood", formPurpose: "Purpose", formPeople: "Number of people", formPrivacy: "Publishing preference", formReference: "Reference images", uploadHint: "Up to 3 images, 8MB each", formMessage: "Additional notes", formConsent: "I consent to the collection and use of personal information for this inquiry. *", consentDetail: "Collected: name, contact and session request · Purpose: consultation and scheduling · Retention: one year after consultation or deleted upon request", previous: "Back", next: "Next", submit: "Send inquiry", sending: "Sending", sent: "Your inquiry has been received. I will reply through your selected contact method.", validation: "Please complete the required fields and consent checkbox.", fallback: "Saving failed, so the inquiry was copied. Paste it into KakaoTalk or Instagram DM.", types: ["Personal portrait", "Couple", "Profile & branding", "Portfolio collaboration", "Decide after consultation"], privacyOptions: ["Decide after consultation", "Portfolio use allowed", "Selected images only", "Private"], footerLine: "Natural portraits · Seoul / Capital Area / Selected Tokyo dates", privacyNotice: "Privacy notice"
    }
  };

  const state = { lang: "ko", content: null, projects: [], projectLimit: 6, reviewLimit: 3, selectedProject: null, selectedMedia: 0, mode: "quick", step: 1, files: [] };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const isVideo = (src = "") => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);
  const mediaHtml = (item, eager = false) => isVideo(item?.src) ? `<video src="${escapeHtml(item.src)}" muted playsinline loop controls preload="metadata"></video>` : `<img src="${escapeHtml(item?.src || "")}" alt="${escapeHtml(item?.alt || item?.caption || "365 Daily Snap")}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
  const cleanLocation = (location = {}) => [...new Set([location.city, location.district, location.place].map((value) => String(value || "").trim()).filter((value) => value && !/협의|미정|확인 필요/.test(value)))].join(" · ");

  function currentLanguage() {
    const route = location.pathname.split("/").filter(Boolean)[0];
    return COPY[route] ? route : "ko";
  }

  function setMeta(copy) {
    document.documentElement.lang = state.lang === "ja" ? "ja" : state.lang;
    document.title = copy.title;
    const description = $('meta[name="description"]');
    if (description) description.content = copy.description;
    const canonical = $('link[rel="canonical"]');
    if (canonical) canonical.href = `https://snap.lavalabs.co.kr/${state.lang}`;
    const ogTitle = $('meta[property="og:title"]');
    const ogDescription = $('meta[property="og:description"]');
    const ogUrl = $('meta[property="og:url"]');
    if (ogTitle) ogTitle.content = copy.title;
    if (ogDescription) ogDescription.content = copy.description;
    if (ogUrl) ogUrl.content = `https://snap.lavalabs.co.kr/${state.lang}`;
  }

  function applyLanguage(lang) {
    state.lang = COPY[lang] ? lang : "ko";
    const copy = COPY[state.lang];
    setMeta(copy);
    $$('[data-i18n]').forEach((node) => { const value = copy[node.dataset.i18n]; if (value !== undefined) node.textContent = value; });
    $$('[data-i18n-html]').forEach((node) => { const value = copy[node.dataset.i18nHtml]; if (value !== undefined) node.innerHTML = value; });
    $$('[data-lang]').forEach((button) => button.classList.toggle("active", button.dataset.lang === state.lang));
    renderTypeChoices(); renderPrivacyOptions(); renderFaq(); renderProjects(); renderReviews(); updateFormUI();
  }

  function dominantTag(media = []) {
    const generic = new Set(["인물", "프로필", "데일리", "포트폴리오협업", "야외", "실내", "낮", "밤", "자연광", "클로즈업", "전신", "반신", "촬영기록"]);
    const counts = new Map();
    media.flatMap((item) => item.tags || []).forEach((tag) => { if (!generic.has(tag)) counts.set(tag, (counts.get(tag) || 0) + 1); });
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "Portrait";
  }

  function groupProjects(content) {
    const source = Array.isArray(content?.projects) ? content.projects : [];
    const groups = [];
    source.forEach((project, projectIndex) => {
      const media = (project.media || []).filter((item) => item?.src);
      const archive = /archive|아카이브/i.test(`${project.title || ""} ${project.category || ""}`) && media.length > 8;
      if (!archive) {
        if (media.length) groups.push({ ...project, id: project.id || `project-${projectIndex}`, media, cover: project.cover || media[0].src });
        return;
      }
      const buckets = new Map();
      media.forEach((item) => {
        const model = item.models?.[0] || "365daily.snap";
        if (!buckets.has(model)) buckets.set(model, []);
        buckets.get(model).push(item);
      });
      buckets.forEach((items, model) => {
        for (let index = 0; index < items.length; index += 10) {
          const chunk = items.slice(index, index + 10);
          const mood = dominantTag(chunk);
          groups.push({
            id: `${project.id || "archive"}-${model}-${index / 10}`,
            title: `@${String(model).replace(/^@/, "")} · ${mood}`,
            description: chunk.find((item) => item.caption)?.caption || project.description,
            category: mood,
            models: [model],
            location: chunk.find((item) => cleanLocation(item.location))?.location || project.location,
            cover: chunk[0]?.src,
            media: chunk
          });
        }
      });
    });
    return groups;
  }

  function renderHero() {
    const gallery = $("#heroGallery");
    const project = state.projects[0];
    const media = project?.media || [];
    if (!media.length) {
      gallery.classList.remove("skeleton-gallery");
      gallery.innerHTML = `<div class="hero-main" style="display:grid;place-items:center"><b>365 Daily Snap</b></div>`;
      return;
    }
    gallery.classList.remove("skeleton-gallery");
    gallery.innerHTML = `<figure class="hero-main">${mediaHtml(media[0], true)}<span class="watermark">© 365 Daily Snap</span></figure><div class="hero-stack">${media.slice(1, 3).map((item) => `<figure>${mediaHtml(item, true)}<span class="watermark">© 365 Daily Snap</span></figure>`).join("")}</div>`;
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    if (!grid) return;
    const copy = COPY[state.lang];
    if (!state.projects.length) {
      grid.innerHTML = `<p>${state.content ? "No projects yet." : "Loading portfolio…"}</p>`;
      return;
    }
    const visible = state.projects.slice(0, state.projectLimit);
    grid.innerHTML = visible.map((project, index) => {
      const locationText = cleanLocation(project.location);
      const cover = { src: project.cover || project.media[0]?.src, alt: project.title };
      return `<article class="project-card ${index === 0 ? "featured" : ""}"><button class="project-cover" type="button" data-project="${index}">${mediaHtml(cover, index < 2)}<span class="watermark">© 365 Daily Snap</span><span class="project-number">${String(index + 1).padStart(2, "0")}</span></button><div class="project-card-copy"><div><p>${escapeHtml(project.category || "Portrait")}</p><h3>${escapeHtml(project.title || "365 Daily Snap")}</h3></div><div class="project-meta-line">${locationText ? `<span>⌖ ${escapeHtml(locationText)}</span>` : ""}<span>▧ ${project.media.length} ${copy.photos}</span></div><button type="button" data-project="${index}">${copy.viewProject} ↗</button></div></article>`;
    }).join("");
    $$('[data-project]', grid).forEach((button) => button.addEventListener("click", () => openProject(Number(button.dataset.project))));
    const more = $("#projectMore");
    more.hidden = state.projects.length <= 6;
    more.textContent = state.projectLimit >= state.projects.length ? copy.less : copy.moreProjects;
  }

  function openProject(index) {
    state.selectedProject = state.projects[index];
    state.selectedMedia = 0;
    renderProjectModal();
    $("#projectModal").hidden = false;
    document.body.classList.add("modal-open");
  }

  function renderProjectModal() {
    const project = state.selectedProject;
    if (!project) return;
    const item = project.media[state.selectedMedia] || project.media[0];
    $("#modalStage").innerHTML = `${mediaHtml(item, true)}<span class="watermark">© 365 Daily Snap</span>`;
    $("#modalCategory").textContent = project.category || "PORTRAIT";
    $("#modalTitle").textContent = project.title || "365 Daily Snap";
    $("#modalDescription").textContent = project.description || item.caption || "";
    const locationText = cleanLocation(item.location || project.location);
    $("#modalMeta").innerHTML = `${locationText ? `<span>⌖ ${escapeHtml(locationText)}</span>` : ""}<span>▧ ${project.media.length} ${COPY[state.lang].photos}</span>${project.models?.length ? `<span>@ ${project.models.map((model) => escapeHtml(String(model).replace(/^@/, ""))).join(", ")}</span>` : ""}`;
    $("#modalThumbs").innerHTML = project.media.map((media, index) => `<button type="button" class="${index === state.selectedMedia ? "active" : ""}" data-media="${index}">${mediaHtml(media)}</button>`).join("");
    $$('[data-media]', $("#modalThumbs")).forEach((button) => button.addEventListener("click", () => { state.selectedMedia = Number(button.dataset.media); renderProjectModal(); }));
  }

  function renderReviews() {
    const grid = $("#reviewGrid");
    if (!grid) return;
    const copy = COPY[state.lang];
    const reviews = Array.isArray(state.content?.testimonials) ? state.content.testimonials : [];
    grid.innerHTML = reviews.slice(0, state.reviewLimit).map((review) => `<article class="review-card"><div class="quote">“</div><p>${escapeHtml(review.content || "")}</p><footer><div><strong>${escapeHtml(review.name || "")}</strong><span>${escapeHtml([review.type, review.date].filter(Boolean).join(" · "))}</span></div>${review.reviewImage ? `<a href="${escapeHtml(review.reviewImage)}" target="_blank" rel="noreferrer">${copy.originalReview} ↗</a>` : ""}</footer></article>`).join("");
    const more = $("#reviewMore");
    more.hidden = reviews.length <= 3;
    more.textContent = state.reviewLimit >= reviews.length ? copy.less : copy.moreReviews;
  }

  function renderFaq() {
    const list = $("#faqList");
    if (!list) return;
    list.innerHTML = COPY[state.lang].faqs.map(([question, answer], index) => `<article class="faq-item"><button type="button" aria-expanded="${index === 0}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(question)}</b><i>${index === 0 ? "−" : "+"}</i></button><p ${index === 0 ? "" : "hidden"}>${escapeHtml(answer)}</p></article>`).join("");
    $$(".faq-item button", list).forEach((button) => button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const paragraph = $("p", item);
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      $("i", button).textContent = open ? "+" : "−";
      paragraph.hidden = open;
    }));
  }

  function renderTypeChoices() {
    const container = $("#typeChoices");
    if (!container) return;
    const selected = container.dataset.selected || "";
    container.innerHTML = COPY[state.lang].types.map((type) => `<button type="button" class="${type === selected ? "active" : ""}" data-type="${escapeHtml(type)}">${type === selected ? "✓ " : ""}${escapeHtml(type)}</button>`).join("");
    $$('[data-type]', container).forEach((button) => button.addEventListener("click", () => { container.dataset.selected = button.dataset.type; renderTypeChoices(); }));
  }

  function renderPrivacyOptions() {
    const select = $("#privacySelect");
    if (!select) return;
    const current = select.value;
    select.innerHTML = COPY[state.lang].privacyOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("");
    if (COPY[state.lang].privacyOptions.includes(current)) select.value = current;
  }

  function updateFormUI() {
    const detail = state.mode === "detail";
    $$("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
    $("#stepIndicator").hidden = !detail;
    $("#stepNumber").textContent = state.step;
    $("#stepBar").style.width = `${state.step * 33.333}%`;
    $$('[data-step]').forEach((section) => { section.hidden = detail ? Number(section.dataset.step) !== state.step : Number(section.dataset.step) !== 1; });
    $("#prevStep").hidden = !detail || state.step === 1;
    $("#nextStep").hidden = !detail || state.step === 3;
    $("#submitInquiry").hidden = detail && state.step !== 3;
    $("#consentRow").hidden = detail && state.step !== 3;
  }

  function validateInquiry(formData) {
    return Boolean($("#typeChoices").dataset.selected && String(formData.get("name") || "").trim() && String(formData.get("contact") || "").trim() && String(formData.get("date") || "").trim() && formData.get("consent"));
  }

  function inquirySummary(formData) {
    return ["[365 Daily Snap 촬영 문의]", `유형: ${$("#typeChoices").dataset.selected}`, `이름: ${formData.get("name")}`, `연락 방법: ${formData.get("contactMethod")}`, `연락처: ${formData.get("contact")}`, `희망 날짜: ${formData.get("date")}`, formData.get("region") && `희망 지역: ${formData.get("region")}`, formData.get("mood") && `분위기: ${formData.get("mood")}`, formData.get("purpose") && `촬영 목적: ${formData.get("purpose")}`, formData.get("people") && `인원: ${formData.get("people")}`, formData.get("privacy") && `공개 범위: ${formData.get("privacy")}`, formData.get("message") && `추가 요청: ${formData.get("message")}`].filter(Boolean).join("\n");
  }

  async function uploadReferences(files) {
    const uploaded = [];
    for (const file of files.slice(0, 3)) {
      if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) continue;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
      const response = await fetch(`${SUPABASE_URL}/storage/v1/object/inquiry-references/${path}`, { method: "POST", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": file.type, "x-upsert": "false" }, body: file });
      if (response.ok) uploaded.push(`${SUPABASE_URL}/storage/v1/object/public/inquiry-references/${path}`);
    }
    return uploaded;
  }

  async function submitInquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const copy = COPY[state.lang];
    const message = $("#formMessage");
    if (!validateInquiry(formData)) {
      message.hidden = false; message.className = "form-message error"; message.textContent = copy.validation; return;
    }
    const submit = $("#submitInquiry");
    submit.disabled = true; submit.textContent = copy.sending;
    try {
      const files = [...(form.elements.references?.files || [])];
      const referenceImages = await uploadReferences(files);
      const payload = {
        name: String(formData.get("name") || "").trim(), contact: String(formData.get("contact") || "").trim(), contact_method: formData.get("contactMethod"), inquiry_type: $("#typeChoices").dataset.selected, preferred_date: formData.get("date"), region: formData.get("region"), mood: formData.get("mood"), purpose: formData.get("purpose"), people: formData.get("people"), privacy: formData.get("privacy"), message: formData.get("message"), reference_images: referenceImages, source_url: location.href
      };
      const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, { method: "POST", headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("save failed");
      message.hidden = false; message.className = "form-message success"; message.textContent = copy.sent;
      form.reset(); $("#typeChoices").dataset.selected = ""; renderTypeChoices(); renderPrivacyOptions(); state.step = 1; updateFormUI();
    } catch {
      const text = inquirySummary(formData);
      try { await navigator.clipboard.writeText(text); } catch { /* clipboard can be unavailable */ }
      message.hidden = false; message.className = "form-message error"; message.innerHTML = `${escapeHtml(copy.fallback)}<br><a href="${KAKAO}" target="_blank" rel="noreferrer">KakaoTalk ↗</a> · <a href="${INSTAGRAM}" target="_blank" rel="noreferrer">Instagram ↗</a>`;
    } finally {
      submit.disabled = false; submit.textContent = copy.submit;
    }
  }

  function closeModal(kind) {
    $(`#${kind}Modal`).hidden = true;
    document.body.classList.remove("modal-open");
  }

  async function loadContent() {
    try {
      const response = await fetch("/portfolio/portfolio.json", { cache: "no-cache" });
      if (!response.ok) throw new Error("portfolio unavailable");
      state.content = await response.json();
      state.projects = groupProjects(state.content);
    } catch {
      state.content = { testimonials: [] };
      state.projects = [];
    }
    renderHero(); renderProjects(); renderReviews();
  }

  function bindEvents() {
    $$('[data-lang]').forEach((button) => button.addEventListener("click", () => { if (button.dataset.lang !== state.lang) location.href = `/${button.dataset.lang}${location.hash}`; }));
    $("#menuButton").addEventListener("click", () => { $("#mainNav").classList.toggle("open"); $("#menuButton").classList.toggle("open"); });
    $$("#mainNav a").forEach((link) => link.addEventListener("click", () => { $("#mainNav").classList.remove("open"); $("#menuButton").classList.remove("open"); }));
    $("#projectMore").addEventListener("click", () => { state.projectLimit = state.projectLimit >= state.projects.length ? 6 : state.projects.length; renderProjects(); });
    $("#reviewMore").addEventListener("click", () => { const count = state.content?.testimonials?.length || 0; state.reviewLimit = state.reviewLimit >= count ? 3 : count; renderReviews(); });
    $$('[data-mode]').forEach((button) => button.addEventListener("click", () => { state.mode = button.dataset.mode; state.step = 1; updateFormUI(); }));
    $("#prevStep").addEventListener("click", () => { state.step = Math.max(1, state.step - 1); updateFormUI(); });
    $("#nextStep").addEventListener("click", () => { state.step = Math.min(3, state.step + 1); updateFormUI(); });
    $("#inquiryForm").addEventListener("submit", submitInquiry);
    $("#privacyButton").addEventListener("click", () => { $("#privacyModal").hidden = false; document.body.classList.add("modal-open"); });
    $$('[data-close]').forEach((button) => button.addEventListener("click", () => closeModal(button.dataset.close)));
    $$(".modal-backdrop").forEach((backdrop) => backdrop.addEventListener("mousedown", (event) => { if (event.target === backdrop) closeModal(backdrop.id.replace("Modal", "")); }));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") { if (!$("#projectModal").hidden) closeModal("project"); if (!$("#privacyModal").hidden) closeModal("privacy"); } });
  }

  state.lang = currentLanguage();
  bindEvents();
  applyLanguage(state.lang);
  loadContent();
})();
