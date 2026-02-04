# Frontend-Backend Feature Mapping

## Complete Integration Map

| Frontend Feature | Component | API Endpoint | Method | Status | Notes |
|-----------------|-----------|--------------|--------|--------|-------|
| **AI Chat Assistant** | `HackaAgent.jsx` | `/agent` | POST | ✅ DONE | Fully integrated with team_id and metadata |
| **Submit Work** | `SubmitWorkWorkspace.jsx` | `/judge/submit` | POST | ✅ DONE | Submits and gets judging results |
| **Leaderboard** | `Leaderboard.jsx` | `/judge/rank` | GET | ✅ DONE | Fetches rankings with filters |
| **Get Rubric** | N/A | `/judge/rubric` | GET | ✅ READY | API available, not yet used in UI |
| **Score Submission** | N/A | `/judge/score` | POST | ✅ READY | API available for quick scoring |
| **Batch Judge** | N/A | `/judge/batch` | POST | ✅ READY | API available for bulk judging |
| **Team Registration** | N/A | `/registration` | POST | ✅ READY | API available, needs UI connection |
| **Apply Reward** | N/A | `/reward` | POST | ✅ READY | API available for reward system |
| **Send Logs** | N/A | `/logs` | POST | ✅ READY | API available for logging |
| **Health Check** | N/A | `/ping`, `/` | GET | ✅ READY | System health monitoring |
| **Judge Queue** | `JudgeQueue.jsx` | N/A | N/A | ⚠️ MOCK | Using mock data, needs backend |
| **Judge Scores** | `JudgeScores.jsx` | N/A | N/A | ⚠️ MOCK | Using mock data, needs backend |
| **Projects List** | `Projects.jsx` | N/A | N/A | ⚠️ MOCK | Using mock data, needs backend |
| **Teams List** | `Teams.jsx` | N/A | N/A | ⚠️ MOCK | Using mock data, needs backend |
| **User Auth** | `AuthModal.jsx` | N/A | N/A | ⚠️ MOCK | Using localStorage, needs backend |

## Detailed Integration Status

### ✅ Fully Integrated (3 features)

#### 1. HackaAgent (AI Chat)
**Component**: `src/components/pages/HackaAgent.jsx`
**API**: `POST /agent`
**Request**:
```json
{
  "team_id": "string",
  "prompt": "string",
  "metadata": {
    "timestamp": "ISO string",
    "source": "hackaagent_ui"
  },
  "tenant_id": "default",
  "event_id": "default_event"
}
```
**Response**:
```json
{
  "processed_input": "string",
  "action": "string",
  "result": "string",
  "reward": 0.0
}
```
**Integration Points**:
- ✅ User message sent to backend
- ✅ AI response displayed in chat
- ✅ Error handling implemented
- ✅ Loading states managed
- ✅ Team ID from localStorage

#### 2. Submit Work & Judging
**Component**: `src/components/participant/SubmitWorkWorkspace.jsx`
**API**: `POST /judge/submit`
**Request**:
```json
{
  "submission_text": "string",
  "team_id": "string",
  "tenant_id": "default",
  "event_id": "default_event",
  "workspace_id": null,
  "request_id": null
}
```
**Response**:
```json
{
  "success": true,
  "message": "Submission judged successfully",
  "data": {
    "submission_hash": "string",
    "team_id": "string",
    "judging_result": {
      "consensus_score": 85,
      "criteria_scores": {
        "clarity": 8,
        "tech_depth": 9,
        "innovation": 8
      },
      "confidence": 0.92,
      "reasoning_chain": "string",
      "version": 1
    }
  }
}
```
**Integration Points**:
- ✅ Project details compiled into submission_text
- ✅ Submission sent to backend
- ✅ Judging results received
- ✅ Success/error feedback to user
- ✅ Navigation after submission

#### 3. Leaderboard
**Component**: `src/components/pages/Leaderboard.jsx`
**API**: `GET /judge/rank?tenant_id=default&event_id=default_event&limit=50`
**Response**:
```json
{
  "success": true,
  "message": "Rankings retrieved",
  "data": {
    "rankings": [
      {
        "team_id": "string",
        "rank": 1,
        "total_score": 85.5,
        "clarity": 8,
        "quality": 9,
        "innovation": 8,
        "confidence": 0.92
      }
    ],
    "total_count": 10,
    "tenant_id": "default",
    "event_id": "default_event"
  }
}
```
**Integration Points**:
- ✅ Rankings fetched from backend
- ✅ Data transformed for UI display
- ✅ Fallback to mock data on error
- ✅ Loading states
- ✅ Stats calculated from data

### ✅ Backend Ready (APIs exist, not yet connected)

#### 4. Judge Rubric
**API**: `GET /judge/rubric`
**Use Case**: Display judging criteria to participants
**Suggested Component**: Create `JudgingCriteria.jsx` or add to submission modal
**Response**:
```json
{
  "success": true,
  "data": {
    "criteria": {
      "clarity": "Description...",
      "tech_depth": "Description...",
      "innovation": "Description..."
    },
    "weights": {
      "clarity": 0.3,
      "tech_depth": 0.4,
      "innovation": 0.3
    },
    "total_possible_score": 100
  }
}
```

#### 5. Quick Score (No Save)
**API**: `POST /judge/score`
**Use Case**: Preview score without saving to database
**Suggested Component**: Add "Preview Score" button in submission flow
**Request**: Same as `/judge/submit` but doesn't save

#### 6. Batch Judging
**API**: `POST /judge/batch`
**Use Case**: Judge multiple submissions at once
**Suggested Component**: `JudgeQueue.jsx` - Add "Bulk Review" functionality
**Request**:
```json
{
  "submissions": [
    {
      "submission_text": "string",
      "team_id": "string",
      "request_id": null
    }
  ],
  "tenant_id": "default",
  "event_id": "default_event"
}
```

#### 7. Team Registration
**API**: `POST /registration`
**Use Case**: Register new teams
**Suggested Component**: Create `TeamRegistrationForm.jsx`
**Request**:
```json
{
  "team_name": "string",
  "members": ["Alice", "Bob"],
  "project_title": "string",
  "tenant_id": "default",
  "event_id": "default_event"
}
```

#### 8. Reward System
**API**: `POST /reward`
**Use Case**: Apply rewards for achievements
**Suggested Component**: Admin panel or automatic triggers
**Request**:
```json
{
  "request_id": "string",
  "outcome": "success|failure|partial_success|needs_improvement",
  "tenant_id": "default",
  "event_id": "default_event"
}
```

### ⚠️ Needs Backend Implementation

These features currently use mock data and need backend APIs:

#### 9. Judge Queue Management
**Component**: `JudgeQueue.jsx`
**Needed APIs**:
- `GET /judge/queue` - Get pending submissions
- `PUT /judge/queue/{id}/status` - Update submission status
- `GET /judge/queue/stats` - Get queue statistics

#### 10. Judge Scores History
**Component**: `JudgeScores.jsx`
**Needed APIs**:
- `GET /judge/scores/my` - Get judge's scoring history
- `GET /judge/scores/{id}` - Get specific score details
- `PUT /judge/scores/{id}` - Update a score

#### 11. Projects Management
**Component**: `Projects.jsx`
**Needed APIs**:
- `GET /projects` - List all projects
- `POST /projects` - Create project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project
- `GET /projects/{id}` - Get project details

#### 12. Teams Management
**Component**: `Teams.jsx`
**Needed APIs**:
- `GET /teams` - List all teams
- `GET /teams/{id}` - Get team details
- `POST /teams/{id}/join` - Join team
- `POST /teams/{id}/leave` - Leave team

#### 13. User Authentication
**Component**: `AuthModal.jsx`
**Needed APIs**:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

## Integration Priority

### High Priority (Core Features)
1. ✅ HackaAgent - DONE
2. ✅ Submit Work - DONE
3. ✅ Leaderboard - DONE

### Medium Priority (Enhanced Features)
4. Team Registration - Backend ready, needs UI
5. Judge Rubric Display - Backend ready, needs UI
6. Batch Judging - Backend ready, needs UI integration

### Low Priority (Admin/Advanced)
7. Reward System - Backend ready
8. Logging System - Backend ready
9. Judge Queue - Needs backend APIs
10. Judge Scores - Needs backend APIs

## Testing Checklist

### For Each Integration:
- [ ] API endpoint exists and is documented
- [ ] Request payload matches backend schema
- [ ] Response is properly handled
- [ ] Loading state is shown during request
- [ ] Success state updates UI correctly
- [ ] Error state shows user-friendly message
- [ ] API key is included in headers
- [ ] Team ID is retrieved from user context
- [ ] Tenant/Event IDs are properly set
- [ ] Console logs are removed or conditional

### Completed Tests:
- [x] HackaAgent sends messages
- [x] HackaAgent receives responses
- [x] Submit Work sends submission
- [x] Submit Work receives judging results
- [x] Leaderboard fetches rankings
- [x] Leaderboard displays data correctly
- [x] API key authentication works
- [x] Error handling works for all endpoints

## Next Steps

1. **Connect Team Registration**
   - Create registration form component
   - Connect to `/registration` endpoint
   - Add to onboarding flow

2. **Display Judging Rubric**
   - Fetch from `/judge/rubric`
   - Show in submission modal
   - Help users understand scoring

3. **Implement Batch Judging**
   - Add to JudgeQueue component
   - Allow selecting multiple submissions
   - Call `/judge/batch` endpoint

4. **Build Backend APIs for**
   - Judge queue management
   - Judge scores history
   - Projects CRUD
   - Teams CRUD
   - User authentication

## API Service Reference

All APIs are accessed through `apiService` in `src/services/api.js`:

```javascript
import { apiService } from '../../services/api';

// Agent
await apiService.agent.sendMessage({...});

// Judge
await apiService.judge.submitAndScore({...});
await apiService.judge.scoreSubmission({...});
await apiService.judge.getRubric();
await apiService.judge.batchJudge({...});
await apiService.judge.getRankings({...});

// Admin
await apiService.admin.applyReward({...});
await apiService.admin.registerTeam({...});
await apiService.admin.getLogs({...});

// System
await apiService.system.health();
```
