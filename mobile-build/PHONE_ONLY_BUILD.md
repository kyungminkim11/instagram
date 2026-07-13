# 휴대폰만으로 APK 만들기

이 브랜치는 `instagram-like-cleaner-v2.7.0-mobile-wear-source.zip`을 GitHub Actions에서 자동으로 빌드합니다.

## 업로드 위치

`mobile-build/instagram-like-cleaner-v2.7.0-mobile-wear-source.zip`

파일 이름과 경로를 정확히 유지해야 합니다.

## 휴대폰에서 진행

1. GitHub에서 `kyungminkim11/instagram` 저장소를 엽니다.
2. 브랜치를 `agent/mobile-apk-build`로 변경합니다.
3. `mobile-build` 폴더에서 **Add file → Upload files**를 선택합니다.
4. ChatGPT에서 받은 `instagram-like-cleaner-v2.7.0-mobile-wear-source.zip`을 업로드합니다.
5. Commit changes를 누릅니다.
6. 저장소의 Actions 탭에서 **Build Instagram Cleaner APK** 실행을 엽니다.
7. 빌드가 완료되면 Artifacts에서 다음 파일을 받습니다.
   - `instagram-cleaner-mobile-apk`: 휴대폰·태블릿 설치용
   - `instagram-cleaner-wear-apk`: Galaxy Watch 설치용

## 설치

휴대폰 APK를 내려받은 뒤 압축을 풀고 APK를 누릅니다. 설치가 차단되면 Android 설정에서 현재 브라우저 또는 내 파일 앱의 `출처를 알 수 없는 앱 설치` 권한을 허용합니다.

Wear APK는 일반적으로 휴대폰에서 바로 워치에 설치되지 않으므로, 우선 휴대폰 버전을 검증한 뒤 워치 설치 절차를 진행합니다.
