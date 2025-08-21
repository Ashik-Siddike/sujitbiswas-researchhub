# Admin Panel CRUD Testing Guide

## Overview
This guide will help you test all CRUD (Create, Read, Update, Delete) operations in the admin panel to ensure everything is working correctly.

## Prerequisites
1. Local development server is running (`npm run dev`)
2. Database has been seeded with initial data
3. Admin user account has been created

## Step 1: Database Seeding
First, ensure the database has initial data:

1. Go to the homepage (`http://localhost:5173`)
2. Click the "Seed Database" button
3. Check the browser console for confirmation messages
4. Verify that admin user is created with:
   - Email: `admin@researchhub.com`
   - Password: `admin123456`

## Step 2: Admin Login
1. Navigate to `http://localhost:5173/admin/login`
2. Login with the admin credentials:
   - Email: `admin@researchhub.com`
   - Password: `admin123456`
3. You should be redirected to the admin dashboard

## Step 3: Test CRUD Operations
Navigate to `http://localhost:5173/admin/test` to run comprehensive tests.

### Manual Testing by Section

#### Research Areas (`/admin/research-areas`)
1. **Create**: Click "Add Research Area" and fill in:
   - Title: "Test Research Area"
   - Description: "This is a test research area"
   - Icon: "Test"
   - Order Index: 10
2. **Read**: Verify the new item appears in the list
3. **Update**: Click edit on the test item and modify the title
4. **Delete**: Click delete and confirm deletion

#### Publications (`/admin/publications`)
1. **Create**: Click "Add Publication" and fill in:
   - Title: "Test Publication"
   - Authors: "Test Author"
   - Journal: "Test Journal"
   - Year: 2024
   - Type: "Test"
   - Citations: 0
2. **Read**: Verify the new publication appears
3. **Update**: Edit the publication title
4. **Delete**: Delete the test publication

#### Research Projects (`/admin/projects`)
1. **Create**: Click "Add Project" and fill in:
   - Title: "Test Project"
   - Description: "This is a test project"
   - Status: "Planning"
   - Duration: "1 year"
   - Funding: "Test Funding"
2. **Read**: Verify the new project appears
3. **Update**: Edit the project description
4. **Delete**: Delete the test project

#### Courses (`/admin/courses`)
1. **Create**: Click "Add Course" and fill in:
   - Code: "TEST001"
   - Title: "Test Course"
   - Description: "This is a test course"
   - Level: "Undergraduate"
   - Semester: "Autumn"
   - Year: 2024
   - Enrollment Count: 25
2. **Read**: Verify the new course appears
3. **Update**: Edit the course title
4. **Delete**: Delete the test course

#### Students (`/admin/students`)
1. **Create**: Click "Add Student" and fill in:
   - Name: "Test Student"
   - Degree Type: "MSc"
   - Research Topic: "Test Research Topic"
   - Start Year: 2024
   - Status: "Current"
2. **Read**: Verify the new student appears
3. **Update**: Edit the student name
4. **Delete**: Delete the test student

#### Profile (`/admin/profile`)
1. **Create**: Click "Add Profile Information" and fill in:
   - Key: "test_key"
   - Value: "Test Value"
2. **Read**: Verify the new profile info appears
3. **Update**: Edit the value
4. **Delete**: Delete the test profile info

## Step 4: Verify Data Persistence
1. Refresh the page after each operation
2. Navigate between different admin sections
3. Verify data appears correctly on the public website

## Step 5: Test Error Handling
1. Try to create items with missing required fields
2. Verify validation messages appear
3. Test duplicate key constraints (e.g., duplicate course codes)

## Expected Results
- All CRUD operations should work without errors
- Data should persist between page refreshes
- Validation should prevent invalid data entry
- Toast notifications should appear for success/error states
- No console errors should occur

## Troubleshooting

### Common Issues

#### 406 (Not Acceptable) Error
- **Cause**: RLS policies blocking operations
- **Solution**: Ensure you're logged in as admin and RLS policies are correct

#### Authentication Errors
- **Cause**: Session expired or invalid credentials
- **Solution**: Re-login to admin panel

#### Database Connection Issues
- **Cause**: Supabase configuration problems
- **Solution**: Check environment variables and Supabase project status

### Debug Steps
1. Check browser console for error messages
2. Verify Supabase project is active
3. Check RLS policies in Supabase dashboard
4. Verify admin user exists in `admin_users` table

## Security Features
- Row Level Security (RLS) enabled on all tables
- Admin-only access to CRUD operations
- Authentication required for all admin functions
- Protected routes prevent unauthorized access

## Performance Notes
- React Query handles caching and state management
- Optimistic updates for better UX
- Debounced search and filtering
- Efficient pagination for large datasets

## Next Steps
After confirming CRUD operations work:
1. Change default admin password
2. Add additional admin users if needed
3. Customize validation rules
4. Add audit logging if required
5. Implement backup strategies

## Support
If issues persist:
1. Check Supabase logs
2. Verify database schema
3. Test with minimal data
4. Review RLS policies
5. Check authentication flow

