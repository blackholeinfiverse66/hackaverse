# Quick Start Guide - Frontend-Backend Integration

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Backend running at `https://ai-agent-x2iw.onrender.com`
- API Key: `2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778`

### Installation

```bash
cd hackaverse-frontend
npm install
```

### Environment Setup

Create/verify `.env` file:
```env
VITE_API_BASE_URL=https://ai-agent-x2iw.onrender.com
VITE_API_KEY=2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778
VITE_USE_MOCK_API=false
VITE_APP_NAME=HackaVerse
```

### Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

## 🧪 Testing Integrated Features

### 1. Test HackaAgent (AI Chat)

**Steps:**
1. Navigate to `/app/hacka-agent` or click "HackaAgent" in sidebar
2. Type a message: "How do I build a React app?"
3. Click Send or press Enter
4. Wait for AI response (may take 5-10 seconds on first request)

**Expected Result:**
- Loading indicator appears
- AI response is displayed in chat
- Message history is maintained

**Troubleshooting:**
- If timeout: Backend may be cold-starting, wait 30s and retry
- If 401 error: Check API key in `.env`
- If no response: Check browser console for errors

### 2. Test Submission & Judging

**Steps:**
1. Navigate to participant dashboard
2. Click "Submit Work" button
3. Select a project (or create mock data)
4. Upload files (optional)
5. Fill in submission details:
   - Title: "AI Study Assistant"
   - Description: "An intelligent tutoring system..."
   - Demo URL: "https://demo.example.com"
   - Repo URL: "https://github.com/user/repo"
6. Click through steps and submit

**Expected Result:**
- Submission is sent to backend
- Judging results are returned
- Success message is shown
- Redirected to submissions page

**Check Backend Response:**
```javascript
// Open browser console during submission
// You should see:
{
  submission_hash: "abc123...",
  judging_result: {
    consensus_score: 85,
    criteria_scores: { clarity: 8, tech_depth: 9, innovation: 8 },
    confidence: 0.92
  }
}
```

### 3. Test Leaderboard

**Steps:**
1. Navigate to `/app/leaderboard`
2. Wait for data to load
3. Try filtering by category
4. Check rankings display

**Expected Result:**
- Rankings load from backend
- Scores are displayed correctly
- Filters work (may show empty if no data for that filter)
- Stats summary is shown

**Verify Backend Data:**
```javascript
// In browser console:
fetch('https://ai-agent-x2iw.onrender.com/judge/rank?tenant_id=default&event_id=default_event&limit=10', {
  headers: {
    'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778'
  }
})
.then(r => r.json())
.then(console.log)
```

## 🔧 API Testing in Browser Console

### Quick API Test
```javascript
// Copy and paste into browser console
const API_KEY = '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778';
const BASE_URL = 'https://ai-agent-x2iw.onrender.com';

// Test health
fetch(`${BASE_URL}/ping`, {
  headers: { 'X-API-Key': API_KEY }
})
.then(r => r.json())
.then(console.log);

// Test agent
fetch(`${BASE_URL}/agent`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
  body: JSON.stringify({
    team_id: 'test_team',
    prompt: 'Hello!',
    metadata: {}
  })
})
.then(r => r.json())
.then(console.log);
```

### Run Full Test Suite
```javascript
// Load the test script
const script = document.createElement('script');
script.src = '/scripts/test-api-integration.js';
document.head.appendChild(script);

// After it loads, run:
runAllTests();
```

## 📝 Common Integration Patterns

### Pattern 1: Simple GET Request
```javascript
import { apiService } from '../../services/api';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiService.judge.getRubric();
        setData(response.data.data);
      } catch (err) {
        setError(err.userMessage || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{/* Render data */}</div>;
};
```

### Pattern 2: Form Submission
```javascript
import { apiService } from '../../services/api';

const MyForm = () => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiService.judge.submitAndScore({
        submission_text: formData.text,
        team_id: 'team_123'
      });
      
      alert('Success!');
      console.log(response.data);
    } catch (error) {
      alert(error.userMessage || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

### Pattern 3: Real-time Updates
```javascript
import { apiService } from '../../services/api';

const LiveLeaderboard = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await apiService.judge.getRankings({
          tenant_id: 'default',
          event_id: 'default_event',
          limit: 50
        });
        setRankings(response.data.data.rankings);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    };

    // Initial fetch
    fetchRankings();

    // Refresh every 30 seconds
    const interval = setInterval(fetchRankings, 30000);
    return () => clearInterval(interval);
  }, []);

  return <div>{/* Render rankings */}</div>;
};
```

## 🐛 Debugging Tips

### Check API Key
```javascript
// In browser console
console.log(import.meta.env.VITE_API_KEY);
// Should output: 2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Perform an action (send message, submit work, etc.)
5. Click on the request to see:
   - Request headers (should include X-API-Key)
   - Request payload
   - Response data
   - Status code

### Common Issues

**Issue: 401 Unauthorized**
```
Solution: API key is missing or incorrect
Check: .env file has VITE_API_KEY set
Verify: Request headers include X-API-Key
```

**Issue: CORS Error**
```
Solution: Backend has CORS enabled, this shouldn't happen
Check: Are you using the correct base URL?
Verify: Backend is running and accessible
```

**Issue: Timeout / No Response**
```
Solution: Backend may be cold-starting (Render free tier)
Wait: 30-60 seconds for backend to wake up
Retry: Send the request again
```

**Issue: 500 Internal Server Error**
```
Solution: Backend error, check payload format
Verify: Request matches expected schema
Check: Backend logs for error details
```

### Enable Debug Logging
```javascript
// Add to src/services/api.js temporarily
api.interceptors.request.use(config => {
  console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
  console.log('📦 Payload:', config.data);
  return config;
});

api.interceptors.response.use(response => {
  console.log('✅ API Response:', response.status, response.data);
  return response;
}, error => {
  console.error('❌ API Error:', error.response?.status, error.response?.data);
  return Promise.reject(error);
});
```

## 📚 Additional Resources

- **Backend API Docs**: https://ai-agent-x2iw.onrender.com/docs
- **Integration Guide**: See `INTEGRATION_GUIDE.md`
- **Feature Mapping**: See `FEATURE_MAPPING.md`
- **Test Script**: See `scripts/test-api-integration.js`

## ✅ Integration Checklist

Before marking a feature as "integrated":

- [ ] API endpoint is documented
- [ ] Request payload is correct
- [ ] Response is handled properly
- [ ] Loading state is shown
- [ ] Success state updates UI
- [ ] Error state shows message
- [ ] API key is included
- [ ] Team ID is retrieved
- [ ] Tested in browser
- [ ] No console errors
- [ ] Works in production build

## 🎯 Next Integration Tasks

1. **Team Registration Form**
   - Create component
   - Connect to `/registration`
   - Add validation

2. **Display Judging Rubric**
   - Fetch from `/judge/rubric`
   - Show in modal
   - Format criteria nicely

3. **Batch Judging UI**
   - Add to JudgeQueue
   - Multi-select submissions
   - Call `/judge/batch`

## 💡 Pro Tips

1. **Use React DevTools** to inspect component state
2. **Use Network tab** to debug API calls
3. **Check Console** for error messages
4. **Test with real data** not just mock data
5. **Handle edge cases** (empty responses, errors, timeouts)
6. **Add loading states** for better UX
7. **Show user-friendly errors** not technical messages
8. **Cache data** when appropriate to reduce API calls
9. **Implement retry logic** for failed requests
10. **Log important events** for debugging

## 🚨 Important Notes

- **Backend is READ-ONLY**: Do not modify backend code
- **API Key is public**: It's in the .env file, that's okay for this project
- **Cold starts**: First request may take 30-60 seconds
- **Rate limiting**: Be mindful of API call frequency
- **Data persistence**: Backend uses MongoDB, data persists across sessions

---

**Need Help?**
- Check browser console for errors
- Review Network tab for failed requests
- Verify .env configuration
- Test API directly in browser console
- Review integration documentation
