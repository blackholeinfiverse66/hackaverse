#!/usr/bin/env python3
"""
Test script to validate the critical fixes applied to HackaVerse backend
"""

import ast
import sys
from pathlib import Path

def check_file_syntax(filepath):
    """Check if a Python file has valid syntax"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        ast.parse(content)
        return True, None
    except SyntaxError as e:
        return False, str(e)
    except Exception as e:
        return False, str(e)

def test_team_model_fix():
    """Test that Team model has Boolean import"""
    team_model_path = Path("app/models/team.py")
    if not team_model_path.exists():
        return False, "Team model file not found"
    
    with open(team_model_path, 'r') as f:
        content = f.read()
    
    # Check for Boolean import
    if 'from sqlalchemy import' in content and 'Boolean' in content:
        return True, "Boolean import added successfully"
    else:
        return False, "Boolean import missing"

def test_submission_route_fix():
    """Test that submissions route uses correct method name"""
    submissions_route_path = Path("app/routes/submissions.py")
    if not submissions_route_path.exists():
        return False, "Submissions route file not found"
    
    with open(submissions_route_path, 'r') as f:
        content = f.read()
    
    # Check for correct method call
    if 'get_submissions(db)' in content and 'get_all_submissions(db)' not in content:
        return True, "Method name fixed to get_submissions"
    else:
        return False, "Method name still incorrect"

def test_database_stability_fix():
    """Test that database configuration has connection pooling"""
    database_path = Path("app/database.py")
    if not database_path.exists():
        return False, "Database file not found"
    
    with open(database_path, 'r') as f:
        content = f.read()
    
    # Check for connection pool settings
    pool_settings = ['pool_size', 'pool_recycle', 'pool_pre_ping']
    if all(setting in content for setting in pool_settings):
        return True, "Connection pooling configured"
    else:
        return False, "Connection pooling missing"

def test_unicode_fixes():
    """Test that Unicode characters have been replaced"""
    test_script_path = Path("../frontend/test-responsive.js")
    if not test_script_path.exists():
        return False, "Test script not found"
    
    with open(test_script_path, 'r') as f:
        content = f.read()
    
    # Check that Unicode symbols are replaced with ASCII
    if '✓' not in content and '✅' not in content and '[PASS]' in content:
        return True, "Unicode characters replaced with ASCII"
    else:
        return False, "Unicode characters still present"

def main():
    """Run all tests"""
    print("Testing HackaVerse Backend Fixes")
    print("=" * 40)
    
    tests = [
        ("Team Model Boolean Import", test_team_model_fix),
        ("Submission Route Method Name", test_submission_route_fix),
        ("Database Connection Pooling", test_database_stability_fix),
        ("Unicode Character Replacements", test_unicode_fixes),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        try:
            success, message = test_func()
            status = "[PASS]" if success else "[FAIL]"
            print(f"{status} {test_name}: {message}")
            if success:
                passed += 1
        except Exception as e:
            print(f"[ERROR] {test_name}: {str(e)}")
    
    print("=" * 40)
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("All critical fixes have been applied successfully!")
        return 0
    else:
        print("Some fixes may need additional attention.")
        return 1

if __name__ == "__main__":
    sys.exit(main())