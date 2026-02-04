/**
 * API Integration Test Script
 * Run this in browser console to test all API endpoints
 */

const API_BASE_URL = 'https://ai-agent-x2iw.onrender.com';
const API_KEY = '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778';

const testResults = {
  passed: [],
  failed: []
};

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();
  
  return {
    status: response.status,
    ok: response.ok,
    data
  };
}

// Test 1: Health Check
async function testHealthCheck() {
  console.log('🧪 Testing: Health Check...');
  try {
    const result = await apiCall('/ping');
    if (result.ok) {
      testResults.passed.push('✅ Health Check');
      console.log('✅ Health Check passed');
      return true;
    } else {
      testResults.failed.push('❌ Health Check');
      console.error('❌ Health Check failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Health Check (Error)');
    console.error('❌ Health Check error:', error);
    return false;
  }
}

// Test 2: Agent Endpoint
async function testAgentEndpoint() {
  console.log('🧪 Testing: Agent Endpoint...');
  try {
    const result = await apiCall('/agent', 'POST', {
      team_id: 'test_team',
      prompt: 'Hello, this is a test message',
      metadata: { test: true },
      tenant_id: 'default',
      event_id: 'default_event'
    });
    
    if (result.ok && result.data.result) {
      testResults.passed.push('✅ Agent Endpoint');
      console.log('✅ Agent Endpoint passed');
      console.log('   Response:', result.data.result);
      return true;
    } else {
      testResults.failed.push('❌ Agent Endpoint');
      console.error('❌ Agent Endpoint failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Agent Endpoint (Error)');
    console.error('❌ Agent Endpoint error:', error);
    return false;
  }
}

// Test 3: Judge Score Endpoint
async function testJudgeScore() {
  console.log('🧪 Testing: Judge Score Endpoint...');
  try {
    const result = await apiCall('/judge/score', 'POST', {
      submission_text: 'This is a test submission for an AI-powered learning platform that helps students study more effectively.',
      team_id: 'test_team',
      tenant_id: 'default',
      event_id: 'default_event'
    });
    
    if (result.ok && result.data.total_score !== undefined) {
      testResults.passed.push('✅ Judge Score');
      console.log('✅ Judge Score passed');
      console.log('   Score:', result.data.total_score);
      return true;
    } else {
      testResults.failed.push('❌ Judge Score');
      console.error('❌ Judge Score failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Judge Score (Error)');
    console.error('❌ Judge Score error:', error);
    return false;
  }
}

// Test 4: Judge Submit Endpoint
async function testJudgeSubmit() {
  console.log('🧪 Testing: Judge Submit Endpoint...');
  try {
    const result = await apiCall('/judge/submit', 'POST', {
      submission_text: 'Test project: AI Study Assistant - An intelligent tutoring system that adapts to student learning patterns.',
      team_id: 'test_team_' + Date.now(),
      tenant_id: 'default',
      event_id: 'default_event'
    });
    
    if (result.ok && result.data.data?.submission_hash) {
      testResults.passed.push('✅ Judge Submit');
      console.log('✅ Judge Submit passed');
      console.log('   Submission Hash:', result.data.data.submission_hash);
      return true;
    } else {
      testResults.failed.push('❌ Judge Submit');
      console.error('❌ Judge Submit failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Judge Submit (Error)');
    console.error('❌ Judge Submit error:', error);
    return false;
  }
}

// Test 5: Judge Rubric Endpoint
async function testJudgeRubric() {
  console.log('🧪 Testing: Judge Rubric Endpoint...');
  try {
    const result = await apiCall('/judge/rubric');
    
    if (result.ok && result.data.data?.criteria) {
      testResults.passed.push('✅ Judge Rubric');
      console.log('✅ Judge Rubric passed');
      console.log('   Criteria:', Object.keys(result.data.data.criteria));
      return true;
    } else {
      testResults.failed.push('❌ Judge Rubric');
      console.error('❌ Judge Rubric failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Judge Rubric (Error)');
    console.error('❌ Judge Rubric error:', error);
    return false;
  }
}

// Test 6: Judge Rankings Endpoint
async function testJudgeRankings() {
  console.log('🧪 Testing: Judge Rankings Endpoint...');
  try {
    const result = await apiCall('/judge/rank?tenant_id=default&event_id=default_event&limit=10');
    
    if (result.ok && result.data.data?.rankings) {
      testResults.passed.push('✅ Judge Rankings');
      console.log('✅ Judge Rankings passed');
      console.log('   Total Rankings:', result.data.data.total_count);
      return true;
    } else {
      testResults.failed.push('❌ Judge Rankings');
      console.error('❌ Judge Rankings failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Judge Rankings (Error)');
    console.error('❌ Judge Rankings error:', error);
    return false;
  }
}

// Test 7: Team Registration Endpoint
async function testTeamRegistration() {
  console.log('🧪 Testing: Team Registration Endpoint...');
  try {
    const result = await apiCall('/registration', 'POST', {
      team_name: 'Test Team ' + Date.now(),
      members: ['Alice', 'Bob', 'Charlie'],
      project_title: 'Test Project',
      tenant_id: 'default',
      event_id: 'default_event'
    });
    
    if (result.ok && result.data.data?.team_id) {
      testResults.passed.push('✅ Team Registration');
      console.log('✅ Team Registration passed');
      console.log('   Team ID:', result.data.data.team_id);
      return true;
    } else {
      testResults.failed.push('❌ Team Registration');
      console.error('❌ Team Registration failed:', result);
      return false;
    }
  } catch (error) {
    testResults.failed.push('❌ Team Registration (Error)');
    console.error('❌ Team Registration error:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting API Integration Tests...\n');
  console.log('API Base URL:', API_BASE_URL);
  console.log('API Key:', API_KEY.substring(0, 20) + '...\n');

  await testHealthCheck();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testAgentEndpoint();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testJudgeScore();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testJudgeSubmit();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testJudgeRubric();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testJudgeRankings();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await testTeamRegistration();

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${testResults.passed.length}`);
  console.log(`❌ Failed: ${testResults.failed.length}`);
  console.log('\nPassed Tests:');
  testResults.passed.forEach(test => console.log('  ' + test));
  if (testResults.failed.length > 0) {
    console.log('\nFailed Tests:');
    testResults.failed.forEach(test => console.log('  ' + test));
  }
  console.log('='.repeat(50));

  return {
    total: testResults.passed.length + testResults.failed.length,
    passed: testResults.passed.length,
    failed: testResults.failed.length,
    success: testResults.failed.length === 0
  };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runAllTests, testResults };
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  console.log('💡 Run runAllTests() to start testing all API endpoints');
}
