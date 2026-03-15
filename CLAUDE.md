# K-WATCH TEST - 웹 위변조/HTTP 상태 체크 테스트 사이트

## 프로젝트 개요
위변조 탐지 시스템 테스트를 위한 모의 위변조 사이트. 제어판에서 HTTP 상태 코드와 위변조 유형을 실시간 전환 가능.

## 기술 스택
- Node.js + Express + EJS
- 정적 CSS (corporate, defacements, control-panel)
- 포트: 3838 (환경변수 PORT로 변경 가능)
- 배포: Render (git push 시 자동 배포)

## 주요 파일
- `server.js` - Express 서버, API 엔드포인트 (`/api/status`, `/api/config`)
- `state.js` - 상태 관리 (statusCode, defacementType)
- `views/index.ejs` - 메인 템플릿 (위변조 유형별 분기 렌더링)
- `public/css/defacements.css` - 위변조 유형별 스타일
- `public/css/corporate.css` - 정상 기업 사이트 스타일
- `public/css/control-panel.css` - 제어판 스타일
- `public/js/control-panel.js` - 제어판 로직 + 유형별 설명 표시

## 위변조 유형 (11개)

### 페이지 교체형 (시각적 탐지 가능 - 8개)
페이지 전체가 위변조 콘텐츠로 교체됨. 스크린샷 비교로 탐지 가능.

| 유형 | 설명 |
|------|------|
| `hacked` | 해커 과시형 디페이스먼트. 글리치/CRT 효과, 해골 ASCII, zone-h 미러 참조 |
| `hacktivist` | 정치적 메시지 디페이스먼트. Anonymous 마스크, 작전 코드네임, 타이프라이터 효과 |
| `ransomware` | 파일 암호화 협박. 카운트다운, .locked 파일목록, 이중갈취, Tor 협상 포탈 |
| `phishing` | 가짜 KB국민은행 로그인. 위조 브라우저 주소창, 개인정보 입력폼, 가짜 신뢰배지 |
| `refersec` | 인도네시아 해커 디페이스먼트. 국기 스트라이프, 매니페스토, 소셜 링크 |
| `malware-download` | 가짜 Chrome 업데이트. 버전 비교, 다운로드 버튼, 가짜 신뢰지표 |
| `webshell` | 원격 터미널/파일관리자. 이중 패널(파일트리+터미널), 서버정보, 명령어 이력 |
| `darkleaks` | 데이터 유출 협박. 다크웹 스타일, 7일 카운트다운, 데이터 카테고리, 파일 트리 |

### 소스 삽입형 (HTML 분석 탐지 필요 - 3개)
화면은 정상 페이지와 동일. HTML 소스코드에만 악성 요소가 삽입됨.

| 유형 | 삽입 내용 |
|------|-----------|
| `seo-spam` | 숨겨진 div에 스팸 키워드/링크 (position:absolute, left:-9999px) |
| `crypto-mining` | WebWorker 기반 채굴 스크립트, 외부 풀 서버 통신 |
| `redirect` | 숨겨진 iframe, 난독화 쿠키탈취 스크립트, 1x1 트래킹 픽셀 |

## API
- `GET /` - 현재 설정에 따른 페이지 렌더링
- `GET /api/status` - 현재 상태 JSON 반환
- `POST /api/config` - 상태 변경 (`{ statusCode, defacementType }`)

## 실행
```bash
node server.js
# http://localhost:3838
```
