# K-WATCH TEST

웹페이지 위변조 탐지 및 HTTP 상태 체크 프로그램의 **테스트 대상 사이트**입니다.
Render에 배포하여 모니터링 도구의 테스트 타겟으로 사용합니다.

## 기술 스택

- Node.js + Express
- EJS 템플릿 (서버사이드 렌더링)
- 인메모리 상태 관리 (별도 DB 없음)

## 주요 기능

### 1. HTTP 상태 코드 설정
페이지 하단 제어판에서 HTTP 상태 코드를 변경할 수 있습니다.
- 프리셋: 200, 301, 403, 404, 500, 502, 503
- 커스텀 코드 직접 입력 가능 (100~599)

### 2. 웹 위변조 시뮬레이션 (6가지)

| 유형 | 설명 |
|------|------|
| `hacked` | "Hacked By" 페이지 - 검은 배경, 해골 ASCII 아트, 네온 텍스트 |
| `hacktivist` | 핵티비스트 - 어두운 적색 배경, 매니페스토 스타일 |
| `ransomware` | 랜섬웨어 경고 - 카운트다운 타이머, 비트코인 주소 |
| `phishing` | 피싱 페이지 - 가짜 은행 로그인 폼 |
| `seo-spam` | SEO 스팸 - 정상 페이지 + 숨겨진 스팸 링크/키워드 + 감지 배너 |
| `crypto-mining` | 암호화폐 채굴 - 정상 페이지 + 경고 배너 + CPU 모니터 위젯 |

> HTTP 상태 코드와 위변조 유형은 독립적으로 설정 가능합니다.

### 3. 제어판
페이지 하단의 톱니바퀴(⚙ 제어판) 버튼을 클릭하면 DevTools 스타일의 제어판이 열립니다.

## API

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/` | GET | 설정된 상태 코드와 위변조 유형으로 페이지 반환 |
| `/api/status` | GET | 현재 설정 JSON 반환 (항상 200) |
| `/api/config` | POST | 상태 코드/위변조 유형 변경 |

### 설정 변경 예시
```bash
# 상태 코드 변경
curl -X POST http://localhost:3838/api/config \
  -H 'Content-Type: application/json' \
  -d '{"statusCode": 503}'

# 위변조 유형 변경
curl -X POST http://localhost:3838/api/config \
  -H 'Content-Type: application/json' \
  -d '{"defacementType": "ransomware"}'

# 현재 상태 확인
curl http://localhost:3838/api/status
```

## 로컬 실행

```bash
npm install
node server.js
# http://localhost:3838
```

## 파일 구조

```
webtest/
├── server.js                # Express 서버
├── state.js                 # 인메모리 상태 관리
├── package.json
├── render.yaml              # Render 배포 설정
├── views/
│   └── index.ejs            # 메인 템플릿
└── public/
    ├── css/
    │   ├── corporate.css    # 기업 사이트 스타일
    │   ├── control-panel.css
    │   └── defacements.css  # 위변조 유형별 스타일
    └── js/
        └── control-panel.js # 제어판 클라이언트 JS
```

## Render 배포

- Runtime: Node
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variable: `PORT=10000`

> 무료 티어에서는 비활성 시 서버가 중지되며, 재시작 시 상태가 초기화(200/정상)됩니다.
