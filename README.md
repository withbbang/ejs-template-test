# Localhost에서 다양한 테스트를 위한 프로젝트

### 프로젝트 목적

1. CDN 테스트
2. API 테스트

---

### 제공하는 기능

- 레거시한 방법으로 한 서버에서 client, api를 모두 다룸

---

### 프로젝트 구조

```
EJS-Template
├─ 📁public
│  ├─ 📄script.js
│  └─ 📄style.css
├─ 📁views
│  └─ 📄index.ejs
├─ 📄.gitignore
├─ 📄README.md
├─ 📄createServer.ts
├─ 📄index.ts
├─ 📄package-lock.json
├─ 📄package.json
└─ 📄tsconfig.json
```

---

### 파일 설명

- 📁public: 정적 리소스 관리 폴더(js, css)
- 📁views: view 엔진 관리 폴더(ejs)
- 📄index.ts: 서버 구동 root 파일

---
