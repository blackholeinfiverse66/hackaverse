# Hackaverse Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (React + Vite + Tailwind)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              │ X-API-Key Header
                              │
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│                    (FastAPI + MongoDB)                           │
│              https://ai-agent-x2iw.onrender.com                  │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Integration Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │ HackaAgent  │  │ Submit Work │  │ Leaderboard │                 │
│  │   (Chat)    │  │  (Judging)  │  │  (Rankings) │                 │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                 │
│         │                │                │                          │
└─────────┼────────────────┼────────────────┼──────────────────────────┘
          │                │                │
          │                │                │
┌─────────┼────────────────┼────────────────┼──────────────────────────┐
│         │                │                │                          │
│         ▼                ▼                ▼                          │
│  ┌──────────────────────────────────────────────┐                   │
│  │         API Service (src/services/api.js)     │                   │
│  │                                               │                   │
│  │  • agent.sendMessage()                        │                   │
│  │  • judge.submitAndScore()                     │                   │
│  │  • judge.getRankings()                        │                   │
│  │  • judge.getRubric()                          │                   │
│  │  • admin.registerTeam()                       │                   │
│  └──────────────────┬────────────────────────────┘                   │
│                     │                                                │
│                     ▼                                                │
│  ┌──────────────────────────────────────────────┐                   │
│  │         Axios Instance with Interceptors      │                   │
│  │                                               │                   │
│  │  Request Interceptor:                         │                   │
│  │    • Add X-API-Key header                     │                   │
│  │    • Add Authorization token                  │                   │
│  │                                               │                   │
│  │  Response Interceptor:                        │                   │
│  │    • Handle 401 (Unauthorized)                │                   │
│  │    • Handle 403 (Forbidden)                   │                   │
│  │    • Handle 404 (Not Found)                   │                   │
│  │    • Handle 500 (Server Error)                │                   │
│  │    • Format error messages                    │                   │
│  └──────────────────┬────────────────────────────┘                   │
│                     │                                                │
└─────────────────────┼────────────────────────────────────────────────┘
                      │
                      │ HTTPS Request
                      │ Headers: X-API-Key, Content-Type
                      │
┌─────────────────────┼────────────────────────────────────────────────┐
│                     ▼                                                │
│  ┌──────────────────────────────────────────────┐                   │
│  │         FastAPI Backend (main.py)             │                   │
│  │                                               │                   │
│  │  • CORS Middleware (allow all origins)        │                   │
│  │  • Security Middleware (API key check)        │                   │
│  │  • Error Handlers                             │                   │
│  └──────────────────┬────────────────────────────┘                   │
│                     │                                                │
│                     ▼                                                │
│  ┌──────────────────────────────────────────────┐                   │
│  │              Route Handlers                   │                   │
│  ├──────────────────────────────────────────────┤                   │
│  │                                               │                   │
│  │  /agent (POST)                                │                   │
│  │    ├─> Input Handler                          │                   │
│  │    ├─> Reasoning Module                       │                   │
│  │    ├─> Executor                               │                   │
│  │    └─> Reward System                          │                   │
│  │                                               │                   │
│  │  /judge/submit (POST)                         │                   │
│  │    ├─> Multi-Agent Judge                      │                   │
│  │    ├─> Consensus Aggregation                  │                   │
│  │    ├─> Orchestration Flow                     │                   │
│  │    └─> Database Storage                       │                   │
│  │                                               │                   │
│  │  /judge/rank (GET)                            │                   │
│  │    ├─> Query MongoDB                          │                   │
│  │    ├─> Sort by score                          │                   │
│  │    └─> Return rankings                        │                   │
│  │                                               │                   │
│  │  /registration (POST)                         │                   │
│  │    ├─> Validate team data                     │                   │
│  │    ├─> KSML Logger                            │                   │
│  │    └─> Return team_id                         │                   │
│  │                                               │                   │
│  └──────────────────┬────────────────────────────┘                   │
│                     │                                                │
│                     ▼                                                │
│  ┌──────────────────────────────────────────────┐                   │
│  │         Database Layer (MongoDB)              │                   │
│  │                                               │                   │
│  │  Collections:                                 │                   │
│  │    • submissions                              │                   │
│  │    • judgments                                │                   │
│  │    • teams                                    │                   │
│  │    • provenance                               │                   │
│  │    • replay_protection                        │                   │
│  └───────────────────────────────────────────────┘                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. HackaAgent Chat Flow

```
User Types Message
       │
       ▼
┌─────────────────┐
│  HackaAgent.jsx │
│                 │
│  • Get team_id  │
│  • Set loading  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ apiService.agent        │
│   .sendMessage()        │
│                         │
│ Payload:                │
│  {                      │
│    team_id: "...",      │
│    prompt: "...",       │
│    metadata: {...}      │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Request Interceptor     │
│                         │
│ Add Headers:            │
│  X-API-Key: "..."       │
│  Content-Type: json     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ POST /agent             │
│                         │
│ Backend Processing:     │
│  1. Input Handler       │
│  2. Reasoning Module    │
│  3. Executor            │
│  4. Reward System       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Response:               │
│  {                      │
│    processed_input,     │
│    action,              │
│    result,              │
│    reward               │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Response Interceptor    │
│                         │
│ Check status            │
│ Format errors           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ HackaAgent.jsx          │
│                         │
│ • Display AI response   │
│ • Add to chat history   │
│ • Clear loading         │
└─────────────────────────┘
```

### 2. Submit Work & Judging Flow

```
User Submits Form
       │
       ▼
┌──────────────────────────┐
│ SubmitWorkWorkspace.jsx  │
│                          │
│ • Compile submission     │
│ • Get team_id            │
│ • Set submitting         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ apiService.judge         │
│   .submitAndScore()      │
│                          │
│ Payload:                 │
│  {                       │
│    submission_text,      │
│    team_id,              │
│    tenant_id,            │
│    event_id              │
│  }                       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ POST /judge/submit       │
│                          │
│ Backend Processing:      │
│  1. Save submission      │
│  2. Multi-agent judge    │
│  3. Consensus scoring    │
│  4. Orchestration flow   │
│  5. Reward calculation   │
│  6. Logging              │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Response:                │
│  {                       │
│    submission_hash,      │
│    judging_result: {     │
│      consensus_score,    │
│      criteria_scores,    │
│      confidence,         │
│      reasoning_chain     │
│    }                     │
│  }                       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ SubmitWorkWorkspace.jsx  │
│                          │
│ • Show success message   │
│ • Navigate to            │
│   submissions page       │
└──────────────────────────┘
```

### 3. Leaderboard Rankings Flow

```
Component Mounts
       │
       ▼
┌──────────────────────────┐
│ Leaderboard.jsx          │
│                          │
│ • Set loading            │
│ • useEffect trigger      │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ apiService.judge         │
│   .getRankings()         │
│                          │
│ Query Params:            │
│  tenant_id=default       │
│  event_id=default_event  │
│  limit=50                │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ GET /judge/rank          │
│                          │
│ Backend Processing:      │
│  1. Query judgments      │
│  2. Sort by score        │
│  3. Limit results        │
│  4. Format response      │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Response:                │
│  {                       │
│    rankings: [           │
│      {                   │
│        team_id,          │
│        rank,             │
│        total_score,      │
│        clarity,          │
│        quality,          │
│        innovation        │
│      }                   │
│    ],                    │
│    total_count           │
│  }                       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Leaderboard.jsx          │
│                          │
│ • Transform data         │
│ • Update state           │
│ • Render rankings        │
│ • Clear loading          │
└──────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Frontend                                           │
│  ┌────────────────────────────────────────────────┐         │
│  │ • API Key stored in .env                        │         │
│  │ • Automatically injected in requests            │         │
│  │ • Not exposed in client code                    │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  Layer 2: Transport                                          │
│  ┌────────────────────────────────────────────────┐         │
│  │ • HTTPS encryption                              │         │
│  │ • Secure headers                                │         │
│  │ • CORS configured                               │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  Layer 3: Backend Authentication                             │
│  ┌────────────────────────────────────────────────┐         │
│  │ • API Key validation (X-API-Key header)         │         │
│  │ • 401 Unauthorized if missing/invalid           │         │
│  │ • Security middleware on all routes             │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  Layer 4: Data Isolation                                     │
│  ┌────────────────────────────────────────────────┐         │
│  │ • Tenant ID for multi-tenancy                   │         │
│  │ • Event ID for event isolation                  │         │
│  │ • Workspace ID for workspace isolation          │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
│  Layer 5: Replay Protection                                  │
│  ┌────────────────────────────────────────────────┐         │
│  │ • Request ID tracking                           │         │
│  │ • Duplicate detection                           │         │
│  │ • 409 Conflict on replay                        │         │
│  └────────────────────────────────────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Error Handling Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Error Handling Flow                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  API Call                                                    │
│     │                                                        │
│     ▼                                                        │
│  Try/Catch Block                                             │
│     │                                                        │
│     ├─> Success                                              │
│     │     └─> Update UI                                      │
│     │                                                        │
│     └─> Error                                                │
│           │                                                  │
│           ├─> Network Error (no response)                    │
│           │     └─> "Network error: Check connection"        │
│           │                                                  │
│           ├─> 401 Unauthorized                               │
│           │     └─> Clear auth, redirect to login            │
│           │                                                  │
│           ├─> 403 Forbidden                                  │
│           │     └─> "You don't have permission"              │
│           │                                                  │
│           ├─> 404 Not Found                                  │
│           │     └─> "Resource not found"                     │
│           │                                                  │
│           ├─> 409 Conflict (replay)                          │
│           │     └─> "Duplicate request detected"             │
│           │                                                  │
│           ├─> 500 Server Error                               │
│           │     └─> "Server error: Try again later"          │
│           │                                                  │
│           └─> Other                                          │
│                 └─> Generic error message                    │
│                                                              │
│  All errors include:                                         │
│    • error.message (technical)                               │
│    • error.userMessage (user-friendly)                       │
│    • error.response.status (HTTP code)                       │
│    • error.response.data (backend details)                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Component Integration Map

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Hierarchy                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  App.jsx                                                     │
│    │                                                         │
│    ├─> MainPage.jsx (Landing)                               │
│    │                                                         │
│    └─> AuthenticatedLayout.jsx                              │
│          │                                                   │
│          ├─> Sidebar.jsx                                     │
│          │                                                   │
│          └─> Routes                                          │
│                │                                             │
│                ├─> HackaAgent.jsx ✅ INTEGRATED              │
│                │     └─> apiService.agent.sendMessage()      │
│                │                                             │
│                ├─> SubmitWorkWorkspace.jsx ✅ INTEGRATED     │
│                │     └─> apiService.judge.submitAndScore()   │
│                │                                             │
│                ├─> Leaderboard.jsx ✅ INTEGRATED             │
│                │     └─> apiService.judge.getRankings()      │
│                │                                             │
│                ├─> JudgeQueue.jsx ⚠️ MOCK DATA               │
│                │                                             │
│                ├─> JudgeScores.jsx ⚠️ MOCK DATA              │
│                │                                             │
│                ├─> Projects.jsx ⚠️ MOCK DATA                 │
│                │                                             │
│                └─> Teams.jsx ⚠️ MOCK DATA                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoint Map

```
Backend: https://ai-agent-x2iw.onrender.com

┌─────────────────────────────────────────────────────────────┐
│                      Available Endpoints                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Agent Endpoints                                             │
│  ├─> POST /agent ✅ INTEGRATED                               │
│  └─> GET /api/agent/history/{teamId} ⚠️ NOT USED            │
│                                                              │
│  Judge Endpoints                                             │
│  ├─> POST /judge/score ✅ READY                              │
│  ├─> POST /judge/submit ✅ INTEGRATED                        │
│  ├─> GET /judge/rubric ✅ READY                              │
│  ├─> POST /judge/batch ✅ READY                              │
│  └─> GET /judge/rank ✅ INTEGRATED                           │
│                                                              │
│  Admin Endpoints                                             │
│  ├─> POST /reward ✅ READY                                   │
│  ├─> POST /logs ✅ READY                                     │
│  └─> POST /registration ✅ READY                             │
│                                                              │
│  System Endpoints                                            │
│  ├─> GET / ✅ READY                                          │
│  ├─> GET /ping ✅ READY                                      │
│  └─> GET /system/health ✅ READY                             │
│                                                              │
│  Legend:                                                     │
│    ✅ INTEGRATED - Connected to frontend                     │
│    ✅ READY - API exists, not yet used in UI                 │
│    ⚠️ NOT USED - Available but not needed                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

**Architecture Status**: ✅ Complete and Production Ready
**Last Updated**: 2024
**Integration Level**: Core features fully integrated
