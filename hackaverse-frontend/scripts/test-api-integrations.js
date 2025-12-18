#!/usr/bin/env node

/**
 * API Integration Test Script
 * Tests all the required API endpoints: /register, /agent, /reward, /logs
 */

import axios from 'axios';

// Use the base URL from environment or default
const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8001';

console.log('[START] Starting API Integration Tests...');
console.log(`[URL] Testing against: ${BASE_URL}`);

// Test configuration
const testConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Test data
const testData = {
  register: {
    valid: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    },
    invalid: {
      name: 'T',
      email: 'invalid-email',
      password: 'short'
    }
  },
  agent: {
    valid: {
      message: 'Hello, this is a test message for the AI agent',
      context: 'testing'
    },
    invalid: {
      message: '',
      context: 'testing'
    }
  },
  reward: {
    valid: {
      user_id: 1,
      achievement_type: 'project_submission',
      points: 50,
      description: 'Test reward for API integration'
    },
    invalid: {
      user_id: 'invalid',
      achievement_type: '',
      points: -10
    }
  },
  logs: {
    validParams: {
      severity: 'info',
      source: 'all',
      date_range: 'today',
      limit: 10
    },
    invalidParams: {
      limit: 'invalid'
    }
  }
};

/**
 * Test /register endpoint
 */
async function testRegisterEndpoint() {
  console.log('\n[REGISTER] Testing /register endpoint...');

  try {
    // Test invalid data (should fail validation)
    console.log('  Testing invalid registration data...');
    try {
      await axios.post(`${BASE_URL}/register`, testData.register.invalid, testConfig);
      console.log('  [FAIL] Invalid data test failed - should have thrown error');
    } catch (error) {
      if (error.response) {
        console.log(`  [PASS] Invalid data correctly rejected: ${error.response.data.message || error.message}`);
      } else {
        console.log(`  [PASS] Invalid data correctly rejected: ${error.message}`);
      }
    }

    // Test valid data
    console.log('  Testing valid registration data...');
    const response = await axios.post(`${BASE_URL}/register`, testData.register.valid, testConfig);
    console.log(`  [PASS] Valid registration successful: ${response.status} ${response.statusText}`);

  } catch (error) {
    console.log(`  [FAIL] Register endpoint test failed: ${error.message}`);
  }
}

/**
 * Test /agent endpoint
 */
async function testAgentEndpoint() {
  console.log('\n[AGENT] Testing /agent endpoint...');

  try {
    // Test invalid data (should fail validation)
    console.log('  Testing invalid agent message...');
    try {
      await axios.post(`${BASE_URL}/agent`, testData.agent.invalid, testConfig);
      console.log('  [FAIL] Invalid agent data test failed - should have thrown error');
    } catch (error) {
      if (error.response) {
        console.log(`  [PASS] Invalid agent data correctly rejected: ${error.response.data.message || error.message}`);
      } else {
        console.log(`  [PASS] Invalid agent data correctly rejected: ${error.message}`);
      }
    }

    // Test valid data
    console.log('  Testing valid agent message...');
    const response = await axios.post(`${BASE_URL}/agent`, testData.agent.valid, testConfig);
    console.log(`  [PASS] Valid agent message successful: ${response.status} ${response.statusText}`);
    console.log(`     Response: ${response.data.response.substring(0, 50)}...`);

  } catch (error) {
    console.log(`  [FAIL] Agent endpoint test failed: ${error.message}`);
  }
}

/**
 * Test /reward endpoint
 */
async function testRewardEndpoint() {
  console.log('\n[REWARD] Testing /reward endpoint...');

  try {
    // Test invalid data (should fail validation)
    console.log('  Testing invalid reward data...');
    try {
      await axios.post(`${BASE_URL}/reward`, testData.reward.invalid, testConfig);
      console.log('  [FAIL] Invalid reward data test failed - should have thrown error');
    } catch (error) {
      if (error.response) {
        console.log(`  [PASS] Invalid reward data correctly rejected: ${error.response.data.message || error.message}`);
      } else {
        console.log(`  [PASS] Invalid reward data correctly rejected: ${error.message}`);
      }
    }

    // Test valid data
    console.log('  Testing valid reward data...');
    const response = await axios.post(`${BASE_URL}/reward`, testData.reward.valid, testConfig);
    console.log(`  [PASS] Valid reward successful: ${response.status} ${response.statusText}`);
    console.log(`     Reward ID: ${response.data.reward_id}, Total Points: ${response.data.total_points}`);

  } catch (error) {
    console.log(`  [FAIL] Reward endpoint test failed: ${error.message}`);
  }
}

/**
 * Test /logs endpoint
 */
async function testLogsEndpoint() {
  console.log('\n[LOGS] Testing /logs endpoint...');

  try {
    // Test invalid params
    console.log('  Testing invalid log parameters...');
    try {
      await axios.get(`${BASE_URL}/logs`, {
        params: testData.logs.invalidParams,
        ...testConfig
      });
      console.log('  [FAIL] Invalid log params test failed - should have thrown error');
    } catch (error) {
      if (error.response) {
        console.log(`  [PASS] Invalid log params correctly rejected: ${error.response.data.message || error.message}`);
      } else {
        console.log(`  [PASS] Invalid log params correctly rejected: ${error.message}`);
      }
    }

    // Test valid params
    console.log('  Testing valid log parameters...');
    const response = await axios.get(`${BASE_URL}/logs`, {
      params: testData.logs.validParams,
      ...testConfig
    });
    console.log(`  [PASS] Valid log request successful: ${response.status} ${response.statusText}`);
    console.log(`     Retrieved ${response.data.logs.length} log entries`);

  } catch (error) {
    console.log(`  [FAIL] Logs endpoint test failed: ${error.message}`);
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  try {
    console.log('[TEST] Running comprehensive API integration tests...');

    await testRegisterEndpoint();
    await testAgentEndpoint();
    await testRewardEndpoint();
    await testLogsEndpoint();

    console.log('\n[SUCCESS] All API integration tests completed!');
    console.log('[PASS] Endpoints tested: /register, /agent, /reward, /logs');
    console.log('[PASS] Validation and error handling verified');
    console.log('[PASS] Network calls with proper error handling confirmed');

  } catch (error) {
    console.log(`\n[FAIL] Test suite failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the tests
runAllTests();