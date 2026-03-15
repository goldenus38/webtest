(function() {
  var toggle = document.getElementById('cpToggle');
  var body = document.getElementById('cpBody');
  var statusSelect = document.getElementById('statusSelect');
  var customStatus = document.getElementById('customStatus');
  var applyStatus = document.getElementById('applyStatus');
  var defaceSelect = document.getElementById('defaceSelect');
  var applyDeface = document.getElementById('applyDeface');
  var defaceDesc = document.getElementById('defaceDesc');

  var descriptions = {
    'none': '',
    'hacked': '페이지 전체가 해커의 과시 메시지로 교체됨. 해골 ASCII 아트, 글리치 효과, CRT 스캔라인. zone-h 미러 스타일.',
    'hacktivist': '정치적/사회적 메시지를 담은 디페이스먼트. Anonymous 마스크, 작전 코드네임, 타이프라이터 애니메이션.',
    'ransomware': '파일 암호화 후 몸값 요구 화면. 카운트다운 타이머, .locked 파일 목록, 이중갈취 경고, Tor 협상 포탈.',
    'phishing': '가짜 금융기관(KB국민은행) 로그인 페이지. 위조 브라우저 주소창, 개인정보 입력폼, 가짜 신뢰 배지.',
    'refersec': '인도네시아 해커 그룹 디페이스먼트. 국기 스트라이프, 매니페스토 텍스트, 소셜 링크.',
    'malware-download': '가짜 Chrome 업데이트 페이지. 버전 비교, 다운로드 버튼, 가짜 별점/인증 신뢰지표로 악성파일 다운로드 유도.',
    'webshell': '해커의 원격 서버 관리 인터페이스. 파일 매니저 + 터미널 이중 패널, 서버 정보 노출, 명령어 실행 이력.',
    'darkleaks': '랜섬웨어 갱의 데이터 유출 협박 사이트. 다크웹 스타일, 카운트다운 타이머, 유출 데이터 카테고리, 파일 트리.',
    'seo-spam': '[소스 삽입형] 화면은 정상. HTML 소스에 숨겨진 스팸 키워드/링크가 삽입됨 (position:absolute, left:-9999px). 검색엔진 크롤러를 대상으로 함.',
    'crypto-mining': '[소스 삽입형] 화면은 정상. HTML 소스에 WebWorker 기반 채굴 스크립트가 삽입됨. 외부 풀 서버와 통신하며 CPU 자원을 소모.',
    'redirect': '[소스 삽입형] 화면은 정상. HTML 소스에 숨겨진 iframe, 난독화된 쿠키 탈취 스크립트, 1x1 트래킹 픽셀이 삽입됨.'
  };

  function updateDesc() {
    var val = defaceSelect.value;
    defaceDesc.textContent = descriptions[val] || '';
    defaceDesc.style.display = val === 'none' ? 'none' : 'block';
  }

  toggle.addEventListener('click', function() {
    body.classList.toggle('open');
  });

  statusSelect.addEventListener('change', function() {
    customStatus.style.display = this.value === 'custom' ? 'inline-block' : 'none';
  });

  defaceSelect.addEventListener('change', updateDesc);
  updateDesc();

  applyStatus.addEventListener('click', function() {
    var code = statusSelect.value === 'custom' ? customStatus.value : statusSelect.value;
    if (!code) return;
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statusCode: parseInt(code, 10) })
    }).then(function() {
      location.reload();
    });
  });

  applyDeface.addEventListener('click', function() {
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defacementType: defaceSelect.value })
    }).then(function() {
      location.reload();
    });
  });
})();
