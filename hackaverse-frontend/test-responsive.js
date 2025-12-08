// Responsive Design Testing Script for MainPage.jsx
// This script tests the responsive padding classes across different breakpoints

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the MainPage component
const mainPagePath = path.join(__dirname, 'src', 'components', 'MainPage.jsx');
const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');

// Define responsive breakpoints and expected padding values
const breakpoints = {
  mobile: { class: 'py-16', value: '64px' },
  tablet: { class: 'sm:py-20', value: '80px' },
  desktop: { class: 'lg:py-24', value: '96px' }
};

// Define sections to test
const sections = [
  {
    name: 'Hero Section',
    selector: 'pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24',
    expected: {
      mobile: { top: '80px', bottom: '64px' },
      tablet: { top: '96px', bottom: '80px' },
      desktop: { top: '128px', bottom: '96px' }
    }
  },
  {
    name: 'Benefits Pills Section',
    selector: 'py-12 sm:py-16 lg:py-20',
    expected: {
      mobile: '48px',
      tablet: '64px',
      desktop: '80px'
    }
  },
  {
    name: 'Leaderboard + Winners Section',
    selector: 'py-16 sm:py-20 lg:py-24',
    expected: {
      mobile: '64px',
      tablet: '80px',
      desktop: '96px'
    }
  },
  {
    name: 'Why HackaVerse Section',
    selector: 'py-16 sm:py-20 lg:py-24',
    expected: {
      mobile: '64px',
      tablet: '80px',
      desktop: '96px'
    }
  },
  {
    name: 'Upcoming Tracks Section',
    selector: 'py-12 sm:py-16 lg:py-20',
    expected: {
      mobile: '48px',
      tablet: '64px',
      desktop: '80px'
    }
  },
  {
    name: 'Featured Projects Section',
    selector: 'py-16 sm:py-20 lg:py-24',
    expected: {
      mobile: '64px',
      tablet: '80px',
      desktop: '96px'
    }
  },
  {
    name: 'How It Works Process',
    selector: 'py-16 sm:py-20 lg:py-24',
    expected: {
      mobile: '64px',
      tablet: '80px',
      desktop: '96px'
    }
  },
  {
    name: 'Enhanced Footer',
    selector: 'py-12 sm:py-16 lg:py-20',
    expected: {
      mobile: '48px',
      tablet: '64px',
      desktop: '80px'
    }
  }
];

console.log('🧪 Testing Responsive Design for MainPage.jsx\n');

// Test each section
let passedTests = 0;
let totalTests = sections.length;

sections.forEach(section => {
  console.log(`Testing ${section.name}:`);

  // Check if the responsive classes are present in the file
  const hasResponsiveClasses = mainPageContent.includes(section.selector);

  if (hasResponsiveClasses) {
    console.log(`  ✅ Found responsive classes: ${section.selector}`);
    console.log(`     Mobile: ${section.expected.mobile}`);
    console.log(`     Tablet: ${section.expected.tablet}`);
    console.log(`     Desktop: ${section.expected.desktop}`);
    passedTests++;
  } else {
    console.log(`  ❌ Missing responsive classes: ${section.selector}`);
  }

  console.log('');
});

// Test overall responsive structure
console.log('Testing Overall Responsive Structure:');

// Check for proper breakpoint usage
const hasMobileClasses = mainPageContent.includes('py-12') || mainPageContent.includes('py-16');
const hasTabletClasses = mainPageContent.includes('sm:py-16') || mainPageContent.includes('sm:py-20');
const hasDesktopClasses = mainPageContent.includes('lg:py-20') || mainPageContent.includes('lg:py-24');

console.log(`  Mobile breakpoints (py-*): ${hasMobileClasses ? '✅' : '❌'}`);
console.log(`  Tablet breakpoints (sm:py-*): ${hasTabletClasses ? '✅' : '❌'}`);
console.log(`  Desktop breakpoints (lg:py-*): ${hasDesktopClasses ? '✅' : '❌'}`);

if (hasMobileClasses && hasTabletClasses && hasDesktopClasses) {
  passedTests++;
}

// Test for consistent spacing patterns
const spacingPattern = /py-\d+ sm:py-\d+ lg:py-\d+/g;
const matches = mainPageContent.match(spacingPattern);
console.log(`\nFound ${matches ? matches.length : 0} responsive spacing patterns`);

console.log('\n📊 Test Results:');
console.log(`  Passed: ${passedTests}/${totalTests + 1} tests`);
console.log(`  Success Rate: ${Math.round((passedTests / (totalTests + 1)) * 100)}%`);

if (passedTests === totalTests + 1) {
  console.log('\n🎉 All responsive design tests passed!');
  console.log('\n📋 Manual Testing Checklist:');
  console.log('  1. Open http://localhost:3004/ in browser');
  console.log('  2. Test mobile view (320px width):');
  console.log('     - Hero section: 80px top, 64px bottom padding');
  console.log('     - Content sections: 48-64px vertical padding');
  console.log('     - Footer: 48px vertical padding');
  console.log('  3. Test tablet view (768px width):');
  console.log('     - Hero section: 96px top, 80px bottom padding');
  console.log('     - Content sections: 64-80px vertical padding');
  console.log('     - Footer: 64px vertical padding');
  console.log('  4. Test desktop view (1024px+ width):');
  console.log('     - Hero section: 128px top, 96px bottom padding');
  console.log('     - Content sections: 80-96px vertical padding');
  console.log('     - Footer: 80px vertical padding');
  console.log('  5. Verify visual hierarchy and readability across all breakpoints');
} else {
  console.log('\n⚠️  Some tests failed. Please check the implementation.');
}
