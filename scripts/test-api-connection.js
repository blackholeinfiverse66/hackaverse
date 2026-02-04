#!/usr/bin/env node

/* eslint-env node */
/* global require, __dirname, process */
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env');

let API_BASE_URL = 'http://localhost:8001';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/VITE_API_BASE_URL=(.+)/);
  if (match) {
    API_BASE_URL = match[1];
  }
}

console.log('🔍 Testing API Connection...');
console.log(`📡 API Base URL: ${API_BASE_URL}`);

async function testConnection() {
  const tests = [
    {
      name: 'Health Check',
      url: `${API_BASE_URL}/system/health`,
      method: 'GET'
    },
    {
      name: 'Root Endpoint',
      url: `${API_BASE_URL}/`,
      method: 'GET'
    },
    {
      name: 'Ping Endpoint',
      url: `${API_BASE_URL}/ping`,
      method: 'GET'
    },
    {
      name: 'API Documentation',
      url: `${API_BASE_URL}/docs`,
      method: 'GET'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`\n🧪 Testing: ${test.name}`);
      const response = await axios({
        method: test.method,
        url: test.url,
        timeout: 5000,
        validateStatus: (status) => status < 500 // Accept 4xx as valid responses
      });
      
      console.log(`✅ ${test.name}: ${response.status} ${response.statusText}`);
      if (response.data) {
        console.log(`   Response: ${JSON.stringify(response.data).substring(0, 100)}...`);
      }
      passed++;
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.log('   💡 Make sure the backend server is running on port 8001');
      }
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! API connection is working.');
  } else {
    console.log('\n⚠️  Some tests failed. Check your backend server and configuration.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure backend server is running: cd hackathon-main && uvicorn src.main:app --reload --port 8001');
    console.log('2. Check your .env file has correct VITE_API_BASE_URL');
    console.log('3. Verify CORS settings in backend allow your frontend origin');
  }

  return failed === 0;
}

// Run the test
testConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('💥 Unexpected error:', error.message);
    process.exit(1);
  });