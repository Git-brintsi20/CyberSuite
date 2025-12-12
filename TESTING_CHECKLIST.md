# 🧪 CyberSuite - Complete User Testing Guide

**Welcome to your comprehensive testing guide!** This document will walk you through every feature of CyberSuite step-by-step, just like you're using it for the first time. By the end, you'll know exactly how to use CyberSuite in your daily life and identify any issues along the way.

---

## 📋 Quick Start Checklist

Before we begin testing, make sure everything is running:

- [ ] **MongoDB** is running (check MongoDB Compass or `mongosh`)
- [ ] **Node.js Backend** is running on `http://localhost:5000`
- [ ] **Python ML Service** is running on `http://localhost:5001` (optional for ML features)
- [ ] **Next.js Frontend** is running on `http://localhost:3000`
- [ ] Open your browser (Chrome/Edge recommended)
- [ ] Open DevTools (F12) to check for console errors

### Quick Health Check
```powershell
# Backend health
curl http://localhost:5000/api/health

# ML Service health (if running)
curl http://localhost:5001/health
```

**Good to go?** Let's start testing! 🚀

---

## 🏠 Phase 1: Landing Page & First Impressions

### **Hey User! Let's Start at the Home Page**

**What You Should See:**

| Step | What to Do | What Should Happen | ✅ Pass |
|------|------------|-------------------|---------|
| 1 | Open `http://localhost:3000` | Login page appears | ☐ |
| 2 | Look at the page design | Professional UI with CyberSuite branding | ☐ |
| 3 | Check for these elements | • Login form<br>• Email field<br>• Password field<br>• "Login" button<br>• "Don't have an account? Register" link | ☐ |
| 4 | Press F12 (DevTools) | No red errors in Console | ☐ |
| 5 | Check page title (browser tab) | Shows "Login - CyberSuite" or similar | ☐ |

**Things You Can Click on the Login Page:**

| Element | Where to Find It | What It Does | Test It ✅ |
|---------|-----------------|--------------|-----------|
| **Register Link** | Bottom of login form | Takes you to registration page | ☐ |
| **Forgot Password Link** | Near password field or below | Opens forgot password page | ☐ |
| **Show/Hide Password Icon** | Right side of password field | Toggles password visibility | ☐ |

---

## 👤 Phase 2: Creating Your Account (Registration)

### **Hey User! Let's Create Your First Account**

| Step | Action | Expected Result | ✅ Pass | 🐛 Issues |
|------|--------|----------------|---------|----------|
| 1 | Click "Register" or "Sign Up" link | Registration form appears | ☐ | |
| 2 | Look around | See Username, Email, Password fields | ☐ | |
| 3 | Enter username: `mytest` | Text appears in field | ☐ | |
| 4 | Click submit (don't fill other fields) | **Should show errors**: "Email required", "Password required" | ☐ | |
| 5 | Enter email: `notanemail` | Field accepts it | ☐ | |
| 6 | Click submit | **Should show error**: "Invalid email address" | ☐ | |
| 7 | Enter valid email: `mytest@test.com` | Field accepts it | ☐ | |
| 8 | Enter password: `123` | Field accepts it (masked as •••) | ☐ | |
| 9 | Click submit | **Should show error**: "Password must be at least 6 characters" | ☐ | |
| 10 | Enter password: `MyTest123!` | Password masked (••••••••••) | ☐ | |
| 11 | Click "Show Password" icon | Password becomes visible | ☐ | |
| 12 | Click "Hide Password" icon | Password masked again | ☐ | |
| 13 | Click "Register" button | • Loading spinner appears<br>• Button becomes disabled | ☐ | |
| 14 | Wait for response | • Success message appears<br>• Redirects to dashboard OR login | ☐ | |

**🎯 What You Learned:** Registration validates your input and creates a secure account!

---

## 🔐 Phase 3: Logging In

### **Hey User! Now Let's Login with Your Account**

| Step | Action | Expected Result | ✅ Pass | 🐛 Issues |
|------|--------|----------------|---------|----------|
| 1 | Go to login page (`http://localhost:3000/login`) | Login form appears | ☐ | |
| 2 | Try logging in with wrong password | **Should show error**: "Invalid email or password" | ☐ | |
| 3 | Enter correct email: `mytest@test.com` | Field accepts it | ☐ | |
| 4 | Enter correct password: `MyTest123!` | Password masked | ☐ | |
| 5 | Click "Login" button | • Loading spinner appears<br>• Button disabled during loading | ☐ | |
| 6 | Wait for response | • Success message appears<br>• **Redirects to Dashboard** | ☐ | |

**🔍 Security Check:**
- Open DevTools → Application → Cookies
- You should see a cookie named `jwt`
- Properties: HttpOnly ✓, SameSite: Strict ✓

---

## 🔑 Phase 4: Forgot Password Feature

### **Hey User! Let's Test Password Recovery**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Logout first (click logout button) | Redirects to login page | ☐ |
| 2 | Click "Forgot Password?" link | Forgot password page appears | ☐ |
| 3 | Enter your email: `mytest@test.com` | Field accepts input | ☐ |
| 4 | Click "Send Reset Link" | • Success message<br>• "Check your email" notification | ☐ |
| 5 | Check backend logs | Should show password reset email sent | ☐ |

**Note:** Email functionality requires SMTP configuration. Check if email was logged in console.

---

## 🎛️ Phase 5: Dashboard - Your Command Center

### **Hey User! Welcome to Your Dashboard!**

**What You Should See on Dashboard:**

| Element | Description | Where to Find It | ✅ Visible |
|---------|-------------|-----------------|-----------|
| **Top Navigation Bar** | Header with logo and user menu | Top of page | ☐ |
| **Sidebar Navigation** | Menu with all features | Left side | ☐ |
| **Welcome Message** | "Welcome back, [your username]" | Top of main content | ☐ |
| **Statistics Cards** | Stored passwords, files, courses | Main dashboard area | ☐ |
| **Quick Actions** | Buttons for common tasks | Dashboard center | ☐ |
| **Recent Activity** | Your recent actions | Bottom section | ☐ |

### **Sidebar Items You Can Click:**

| Menu Item | Icon | What It Opens | Test It ✅ |
|-----------|------|---------------|-----------|
| **Dashboard** | 🏠 | Overview/home page | ☐ |
| **Password Manager** | 🔐 | Your password vault | ☐ |
| **File Vault** | 📦 | Encrypted file storage | ☐ |
| **Network Scanner** | 🕵️ | Security scanning tool | ☐ |
| **Security Education** | 🎓 | Learning courses | ☐ |
| **Profile** | 👤 | Your account settings | ☐ |
| **Settings** | ⚙️ | App configuration + 2FA | ☐ |
| **Logout** | 🚪 | Sign out | ☐ |

### **Top Bar Features:**

| Element | Location | What It Does | Test It ✅ |
|---------|----------|--------------|-----------|
| **Notifications Bell** | Top right | Shows security alerts | ☐ |
| **Theme Toggle** | Top right | Switch light/dark mode | ☐ |
| **User Avatar/Name** | Top right | Opens user menu | ☐ |

**Let's Test Each One:**

| Test | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click Notifications Bell | Dropdown opens showing notifications | ☐ |
| 2 | Check notification count | Red badge shows unread count | ☐ |
| 3 | Click a notification | Notification marked as read | ☐ |
| 4 | Click Theme Toggle | Page switches between dark/light mode | ☐ |
| 5 | Click it again | Theme toggles back | ☐ |
| 6 | Click User Avatar | Dropdown menu appears | ☐ |
| 7 | Check dropdown items | Shows Profile, Settings, Logout options | ☐ |

---

## 🔐 Phase 6: Password Manager - Store Your Passwords

### **Hey User! Let's Store Some Passwords Securely**

#### **6.1: Adding Your First Password**

| Step | Action | Expected Result | ✅ Pass | 🐛 Issues |
|------|--------|----------------|---------|----------|
| 1 | Click "Password Manager" in sidebar | Password Manager view opens | ☐ | |
| 2 | What do you see? | • Empty state OR list of passwords<br>• "Add Password" button<br>• Search bar<br>• Filter options | ☐ | |
| 3 | Click "Add Password" or "+" button | **Dialog/Modal opens** | ☐ | |
| 4 | Check form fields | See: Site Name, URL, Username, Password, Category, Notes | ☐ | |

**Now Fill Out the Form:**

| Step | Field | Enter This | What Should Happen | ✅ Pass |
|------|-------|-----------|-------------------|---------|
| 5 | Site Name | `GitHub` | Text appears | ☐ |
| 6 | URL | `https://github.com` | URL accepted | ☐ |
| 7 | Username | `myusername` | Text appears | ☐ |
| 8 | Password | Leave it blank | (We'll use generator) | ☐ |
| 9 | Click **"Generate Password"** button | Password generator appears | ☐ |

#### **6.2: Password Generator Feature**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look at generator | See: Length slider, checkboxes for Uppercase, Lowercase, Numbers, Symbols | ☐ |
| 2 | Move length slider to 16 | Slider moves, shows "16" | ☐ |
| 3 | Check all boxes (Upper, Lower, Numbers, Symbols) | All checked | ☐ |
| 4 | Click "Generate" button | • Random password appears<br>• **Strength indicator shows** (Weak/Medium/Strong) | ☐ |
| 5 | Click "Generate" again | Different password generated | ☐ |
| 6 | Try length = 8, only lowercase | • Weak password<br>• Strength bar is red | ☐ |
| 7 | Try length = 20, all options | • Very strong password<br>• Strength bar is green | ☐ |
| 8 | Click "Use This Password" | Password fills in password field | ☐ |
| 9 | Select Category: "Personal" | Dropdown shows categories | ☐ |
| 10 | Add Notes: "My GitHub account" | Textarea accepts text | ☐ |
| 11 | Click "Save" | • Loading indicator<br>• Modal closes<br>• **Success toast** appears | ☐ |
| 12 | Check password list | **New password entry appears** showing GitHub | ☐ |

#### **6.3: Viewing Your Passwords**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look at your password entry | See: Site name, Username, masked password (•••••) | ☐ |
| 2 | Click "👁️ Show" icon | Password becomes visible in plain text | ☐ |
| 3 | Click "👁️ Hide" icon | Password masked again | ☐ |
| 4 | Hover over the entry | Action buttons appear (Copy, Edit, Delete) | ☐ |

#### **6.4: Copy Password to Clipboard**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Copy" icon (📋) | • "Copied!" toast appears<br>• Icon changes to checkmark ✓ | ☐ |
| 2 | Open Notepad/any text editor | Paste (Ctrl+V) | ☐ |
| 3 | Check pasted content | **Correct password pasted!** | ☐ |
| 4 | Wait 2-3 seconds | Copy icon returns to normal | ☐ |

#### **6.5: Search & Filter Features**

**Add More Test Passwords First:**
- Add password for "Gmail" - Category: Personal
- Add password for "AWS Console" - Category: Work
- Add password for "Netflix" - Category: Entertainment

**Now Test Search:**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Find search bar at top | See search input field | ☐ |
| 2 | Type: `git` | List filters to show only "GitHub" | ☐ |
| 3 | Clear search | All passwords appear again | ☐ |
| 4 | Type: `aws` | Shows only "AWS Console" | ☐ |

**Test Category Filter:**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Find "Category" filter dropdown | See dropdown showing "All Categories" | ☐ |
| 2 | Click dropdown | Shows: All, Personal, Work, Entertainment, Finance, etc. | ☐ |
| 3 | Select "Work" | List shows only Work passwords (AWS) | ☐ |
| 4 | Select "Personal" | List shows only Personal passwords (GitHub, Gmail) | ☐ |
| 5 | Select "All Categories" | All passwords visible again | ☐ |

**Test Sorting:**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Find "Sort By" dropdown | Default: "Newest First" | ☐ |
| 2 | Click dropdown | Options: Newest, Oldest, A-Z, Z-A | ☐ |
| 3 | Select "A-Z" | Passwords sorted alphabetically (AWS → GitHub → Gmail → Netflix) | ☐ |
| 4 | Select "Z-A" | Reversed order (Netflix → Gmail → GitHub → AWS) | ☐ |

#### **6.6: Edit Password**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Edit" button (✏️) on GitHub entry | Edit dialog opens with current data | ☐ |
| 2 | All fields pre-filled | See: current site name, URL, username, password, category, notes | ☐ |
| 3 | Change username to: `newusername` | Field updates | ☐ |
| 4 | Click "Update" or "Save" | • Success toast<br>• Dialog closes<br>• List refreshes | ☐ |
| 5 | Check GitHub entry | Username now shows `newusername` | ☐ |

#### **6.7: Delete Password**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Delete" button (🗑️) on Netflix entry | **Confirmation dialog appears** | ☐ |
| 2 | Check dialog message | "Are you sure you want to delete this password?" | ☐ |
| 3 | Click "Cancel" | Dialog closes, password still there | ☐ |
| 4 | Click "Delete" again | Confirmation appears | ☐ |
| 5 | Click "Confirm" or "Delete" | • Success toast<br>• Entry removed from list | ☐ |
| 6 | Check list | Netflix password is gone | ☐ |

**🎯 Daily Life Use Case:**
*"Whenever you create a new online account, immediately save it here with a strong generated password. Use the search bar to quickly find passwords when logging in."*

---

## 📦 Phase 7: File Vault - Secure File Storage

### **Hey User! Let's Store Some Encrypted Files**

| Step | Action | Expected Result | ✅ Pass | 🐛 Issues |
|------|--------|----------------|---------|----------|
| 1 | Click "File Vault" in sidebar | File Vault view opens | ☐ | |
| 2 | What do you see? | • Upload area<br>• Grid/List view toggle<br>• Search bar<br>• Filter options | ☐ | |

#### **7.1: Upload Your First File**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look for upload area | See "Drag & drop files here or click to browse" | ☐ |
| 2 | Click the upload area | **File picker dialog opens** | ☐ |
| 3 | Select a small image (e.g., test.jpg < 5MB) | File picker shows file | ☐ |
| 4 | Click "Open" | • Upload dialog appears<br>• Shows file preview<br>• File name shown | ☐ |
| 5 | Check upload form | See: Filename (editable), Description field, Category dropdown | ☐ |
| 6 | Add description: "Test image file" | Text appears | ☐ |
| 7 | Select category: "Images" | Dropdown changes | ☐ |
| 8 | Click "Upload" button | • **Progress bar appears** (0% → 100%)<br>• "Encrypting..." message<br>• Success toast | ☐ |
| 9 | Check file grid/list | **Your file appears!** | ☐ |

#### **7.2: Upload Different File Types**

Upload these files to test categorization:

| File Type | Test File | Expected Category | ✅ Pass |
|-----------|-----------|------------------|---------|
| **PDF** | test-document.pdf | Auto-categorized as "Documents" | ☐ |
| **Text** | notes.txt | Auto-categorized as "Documents" | ☐ |
| **Image** | photo.png | Auto-categorized as "Images" | ☐ |
| **Video** | video.mp4 | Auto-categorized as "Videos" | ☐ |

#### **7.3: Drag & Drop Upload**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Open Windows Explorer | Find a test file | ☐ |
| 2 | Drag file over upload area | Upload area highlights/changes color | ☐ |
| 3 | Drop file | Upload dialog appears immediately | ☐ |
| 4 | Fill description and upload | File uploads successfully | ☐ |

#### **7.4: View File Details**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click on a file card/row | File details panel opens | ☐ |
| 2 | Check details shown | • Filename<br>• File type/category<br>• Upload date<br>• File size<br>• Description<br>• 🔒 Encryption status | ☐ |
| 3 | Look for action buttons | See: Download, Favorite, Delete | ☐ |

#### **7.5: Download & Decrypt File**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Download" button | • File downloads automatically<br>• **File is automatically decrypted** | ☐ |
| 2 | Go to Downloads folder | File is there | ☐ |
| 3 | Open the file | File opens normally (not corrupted) | ☐ |
| 4 | Compare with original | **Content is identical** | ☐ |

#### **7.6: Search Files**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Type in search bar: `test` | Files with "test" in name appear | ☐ |
| 2 | Clear search | All files shown again | ☐ |
| 3 | Search by description keyword | Files with matching descriptions appear | ☐ |

#### **7.7: Filter Files by Category**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Category" filter | Dropdown shows: All, Documents, Images, Videos, Audio, Other | ☐ |
| 2 | Select "Images" | Only image files shown | ☐ |
| 3 | Select "Documents" | Only PDF/text files shown | ☐ |
| 4 | Select "All" | All files visible | ☐ |

#### **7.8: Favorite Files**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click ⭐ "Favorite" icon on a file | • Star turns yellow/filled<br>• Success toast | ☐ |
| 2 | Click "Favorites Only" filter | Shows only favorited files | ☐ |
| 3 | Click favorite icon again | Star becomes empty (unfavorited) | ☐ |

#### **7.9: Grid vs List View**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Find view toggle buttons (Grid/List icons) | Top right of file area | ☐ |
| 2 | Click "Grid View" icon | Files shown as cards in grid | ☐ |
| 3 | Click "List View" icon | Files shown as rows in table | ☐ |

#### **7.10: Delete File**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Delete" button (🗑️) on a file | Confirmation dialog appears | ☐ |
| 2 | Click "Cancel" | Dialog closes, file remains | ☐ |
| 3 | Click "Delete" again → "Confirm" | • Success toast<br>• File removed from list | ☐ |

**🎯 Daily Life Use Case:**
*"Store sensitive documents like passports, tax forms, contracts securely encrypted. Access them from anywhere with peace of mind."*

---

## 🎓 Phase 8: Security Education Hub

### **Hey User! Let's Learn About Cybersecurity**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Security Education" in sidebar | Education Hub opens | ☐ |
| 2 | What do you see? | • List of courses/modules<br>• Progress indicators<br>• OWASP Top 10 topics | ☐ |

#### **8.1: Browse Courses**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look at course list | Shows courses like: SQL Injection, XSS, CSRF, etc. | ☐ |
| 2 | Check each course card | • Course title<br>• Brief description<br>• Progress bar (0-100%)<br>• "Start" or "Continue" button | ☐ |
| 3 | Count total courses | Should have 10 courses (OWASP Top 10) | ☐ |

#### **8.2: Start a Course**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Start Course" on first course | Course content page opens | ☐ |
| 2 | Check page layout | • Course title at top<br>• Lesson navigation sidebar<br>• Main content area<br>• Previous/Next buttons | ☐ |

#### **8.3: Navigate Through Lessons**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look at lesson sidebar | List of lessons (Lesson 1, 2, 3...) | ☐ |
| 2 | Check current lesson | Highlighted/active state | ☐ |
| 3 | Read lesson content | Formatted markdown with headings, lists, code blocks | ☐ |
| 4 | Scroll to bottom | See "Mark as Complete" button | ☐ |
| 5 | Click "Mark as Complete" | • Button changes to "Completed" ✓<br>• Progress updates | ☐ |
| 6 | Click "Next Lesson" button | Automatically goes to next lesson | ☐ |

#### **8.4: Lesson Navigation**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click different lesson in sidebar | Content changes to that lesson | ☐ |
| 2 | Click "Previous" button | Goes back one lesson | ☐ |
| 3 | Complete several lessons | Progress bar increases | ☐ |
| 4 | Go back to Education Hub | Course card shows updated progress (e.g., "3/10 lessons") | ☐ |

#### **8.5: Course Completion**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Complete all lessons in a course | Progress reaches 100% | ☐ |
| 2 | Check course card | • Shows "Completed" badge<br>• Green checkmark<br>• 100% progress | ☐ |
| 3 | Return to course | Can still review lessons | ☐ |

**🎯 Daily Life Use Case:**
*"Spend 10 minutes daily learning about security threats. Complete one course per week to build strong security awareness."*

---

## 🕵️ Phase 9: Network Scanner

### **Hey User! Let's Scan for Threats**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Network Scanner" in sidebar | Scanner view opens | ☐ |
| 2 | Look at interface | • Target input field<br>• Scan type dropdown<br>• "Start Scan" button<br>• Results area | ☐ |

**Note:** Actual scanning functionality depends on backend implementation. Test what's available.

---

## 🔒 Phase 10: Two-Factor Authentication (2FA)

### **Hey User! Let's Secure Your Account with 2FA**

#### **10.1: Enable 2FA**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Settings" in sidebar | Settings page opens | ☐ |
| 2 | Look for "Two-Factor Authentication" section | See 2FA settings panel | ☐ |
| 3 | Check current status | Shows "Disabled" or "Not Enabled" | ☐ |
| 4 | Click "Enable 2FA" button | Setup dialog appears | ☐ |

#### **10.2: 2FA Setup with QR Code**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Check setup dialog | • **QR Code displayed**<br>• Manual setup key shown<br>• "Next" or "Continue" button | ☐ |
| 2 | Open authenticator app on phone | (Google Authenticator, Authy, Microsoft Authenticator) | ☐ |
| 3 | Scan QR code with app | App adds new entry for "CyberSuite" | ☐ |
| 4 | Check app | 6-digit code appears (changes every 30s) | ☐ |
| 5 | Click "Next" in browser | Verification step appears | ☐ |
| 6 | Enter 6-digit code from app | Field accepts 6 digits | ☐ |
| 7 | Click "Verify" | • Success message<br>• **Backup codes displayed** | ☐ |

#### **10.3: Backup Codes**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Look at backup codes | 8 codes shown (e.g., `XXXX-XXXX-XXXX`) | ☐ |
| 2 | Click "Download" button | Backup codes downloaded as .txt file | ☐ |
| 3 | Click "Copy" button | All codes copied to clipboard | ☐ |
| 4 | Open Notepad and paste | All 8 codes pasted | ☐ |
| 5 | **SAVE THESE CODES SAFELY** | Store in password manager or secure location | ☐ |
| 6 | Click "I've Saved My Codes" | 2FA setup completes | ☐ |
| 7 | Check settings page | Status shows "Enabled" ✓ | ☐ |

#### **10.4: Login with 2FA**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Logout" | Returns to login page | ☐ |
| 2 | Enter email and password | Click Login | ☐ |
| 3 | **2FA dialog appears!** | Asks for 6-digit code | ☐ |
| 4 | Open authenticator app | Check current code | ☐ |
| 5 | Enter wrong code (e.g., 000000) | Error: "Invalid code" | ☐ |
| 6 | Enter correct code from app | • Success!<br>• Redirects to dashboard | ☐ |

#### **10.5: Login with Backup Code**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Logout again | Returns to login page | ☐ |
| 2 | Login with email/password | 2FA dialog appears | ☐ |
| 3 | Click "Use Backup Code" link | Input changes to backup code format | ☐ |
| 4 | Enter one of your saved backup codes | Field accepts code | ☐ |
| 5 | Click "Verify" | • Success!<br>• Redirects to dashboard | ☐ |
| 6 | Go to Settings → 2FA | That backup code shows as "Used" ❌ | ☐ |
| 7 | Count remaining backup codes | Should be 7 left | ☐ |

#### **10.6: Regenerate Backup Codes**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | In Settings → 2FA section | Find "Regenerate Backup Codes" button | ☐ |
| 2 | Click "Regenerate" | Confirmation dialog appears | ☐ |
| 3 | Confirm action | • New 8 codes generated<br>• Old codes invalidated | ☐ |
| 4 | Download new codes | Save them securely | ☐ |

#### **10.7: Disable 2FA**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | In Settings → 2FA section | Find "Disable 2FA" button | ☐ |
| 2 | Click "Disable 2FA" | Confirmation dialog appears | ☐ |
| 3 | Confirm action | • 2FA disabled<br>• Status shows "Disabled" | ☐ |
| 4 | Logout and login | No 2FA prompt (direct login) | ☐ |

**🎯 Daily Life Use Case:**
*"Always enable 2FA for maximum security. Keep backup codes in a safe place (like this password manager!) in case you lose your phone."*

---

## 🤖 Phase 11: ML-Powered Features (Advanced)

### **Hey User! Let's Test the AI-Powered Security**

**Prerequisites:** Make sure Python ML service is running on port 5001

```powershell
# Start ML Service
cd server/ml_service
python app.py
```

#### **11.1: ML Service Health Check**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Open new browser tab | Navigate to `http://localhost:5001/health` | ☐ |
| 2 | Check response | JSON: `{"status": "healthy"}` | ☐ |
| 3 | Check backend logs | No Python errors | ☐ |

#### **11.2: ML-Based Password Analysis**

**Test the ML password analyzer:**

| Step | Test Password | Action | Expected Result | ✅ Pass |
|------|--------------|--------|----------------|---------|
| 1 | `123456` | Create new password entry | • Strength: **Weak** (red)<br>• Score: 0-20<br>• Vulnerabilities: "Common password", "Too short", etc. | ☐ |
| 2 | `password123` | Use in password field | • Strength: **Weak**<br>• Suggestion: "Avoid common patterns" | ☐ |
| 3 | `Tr0ub4dor&3` | Generate or type | • Strength: **Medium** (yellow)<br>• Score: 40-60 | ☐ |
| 4 | `X7$mK9#pL2@qW5!nB` | Use generator (18 chars, all options) | • Strength: **Very Strong** (green)<br>• Score: 80-100<br>• Entropy: 60+ bits | ☐ |

**Check ML Analysis Details:**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Enter weak password: `abc123` | Analysis shows vulnerabilities list | ☐ |
| 2 | Check vulnerabilities | • "Contains common pattern: abc"<br>• "Contains common pattern: 123"<br>• "Sequential characters detected" | ☐ |
| 3 | Check suggestions | • "Add uppercase letters"<br>• "Add special characters"<br>• "Use at least 8 characters" | ☐ |
| 4 | Check crack time estimate | Shows "Instant" or "< 1 second" | ☐ |
| 5 | Enter strong password | Crack time shows "10+ million years" | ☐ |

#### **11.3: Login Anomaly Detection**

**Build Training Data First (Need 50+ Logins):**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Login/logout 10 times | Each login logged to `ml_service/data/login_logs.json` | ☐ |
| 2 | Check file exists | `server/ml_service/data/login_logs.json` created | ☐ |
| 3 | Open file in editor | See JSON array of login records | ☐ |
| 4 | Check record structure | Each has: timestamp, ipAddress, userAgent, userId, endpoint | ☐ |

**Train the Model (After 50+ Logins):**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Go to Settings or Admin panel | Find "ML Training" section | ☐ |
| 2 | Check training data count | Shows "Training Data: XX logins" | ☐ |
| 3 | Click "Train Model" button | • Loading indicator<br>• "Training in progress..." | ☐ |
| 4 | Wait for completion | • Success message<br>• Shows metrics: "Trained on XX samples, X anomalies detected" | ☐ |

**Test Anomaly Detection:**

| Step | Scenario | Action | Expected Result | ✅ Pass |
|------|----------|--------|----------------|---------|
| 1 | **Normal Login** | Login during normal hours (9am-5pm) | • Score: 0-30 (low risk)<br>• "No specific risk factors" | ☐ |
| 2 | **Late Night Login** | Change system time to 3am, login | • Score: 40-60<br>• Factor: "Unusual login time" | ☐ |
| 3 | **Different Browser** | Login from different browser/device | • Score: may increase<br>• Factor: "New user agent detected" | ☐ |
| 4 | **High Frequency** | Login 10 times in 5 minutes | • Score: 60-80 (high risk)<br>• Factor: "High login frequency" | ☐ |

**Check Detection Results:**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | After suspicious login | Check notifications | ☐ |
| 2 | Look for security alert | "Unusual login activity detected" | ☐ |
| 3 | Click notification | Shows anomaly details with risk factors | ☐ |

#### **11.4: ML Service API Testing**

**Direct API Tests (Advanced Users):**

```powershell
# Test password analysis
curl -X POST http://localhost:5001/analyze-password -H "Content-Type: application/json" -d "{\"password\": \"test123\"}"

# Check stats
curl http://localhost:5001/stats
```

| Test | Expected Result | ✅ Pass |
|------|----------------|---------|
| Password analysis returns JSON | Score, strength, vulnerabilities, suggestions | ☐ |
| Stats endpoint returns | modelTrained, trainingDataSize, lastTrainedAt | ☐ |

**🎯 Daily Life Use Case:**
*"The ML service automatically learns your login patterns and alerts you if someone else tries to access your account from an unusual location or time."*

---

## 👤 Phase 12: User Profile & Settings

### **Hey User! Let's Manage Your Account**

#### **12.1: View Profile**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Click "Profile" in sidebar | Profile page opens | ☐ |
| 2 | Check displayed info | • Username<br>• Email<br>• Account created date<br>• Last login time | ☐ |
| 3 | Check avatar/profile picture | Default or custom avatar shown | ☐ |

#### **12.2: Edit Profile**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Find "Edit Profile" button | Click it | ☐ |
| 2 | Edit form appears | Fields: Username, Email (read-only), Bio | ☐ |
| 3 | Change username to: `mytestuser` | Field updates | ☐ |
| 4 | Click "Save Changes" | • Success toast<br>• Profile updates | ☐ |
| 5 | Check top bar | Username changed there too | ☐ |

#### **12.3: Change Password**

| Step | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | In Profile/Settings | Find "Change Password" section | ☐ |
| 2 | Click "Change Password" | Form appears with fields | ☐ |
| 3 | Enter current password (wrong) | Click Submit | ☐ |
| 4 | Check error | "Current password incorrect" | ☐ |
| 5 | Enter correct current password | Field masked | ☐ |
| 6 | Enter new password: `NewPass123!` | Field masked | ☐ |
| 7 | Confirm password: `NewPass123!` | Field masked | ☐ |
| 8 | Click "Update Password" | • Success toast<br>• "Password updated successfully" | ☐ |
| 9 | Logout and login | Login works with new password | ☐ |

---

## 🧪 Phase 13: Error Handling & Edge Cases

### **Hey User! Let's Test What Happens When Things Go Wrong**

#### **13.1: Network Errors**

| Test | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Stop backend server | Ctrl+C in server terminal | ☐ |
| 2 | Try to login in browser | Error message: "Cannot connect to server" or "Network error" | ☐ |
| 3 | Try to add password | Graceful error, not crash | ☐ |
| 4 | Restart backend | Server starts successfully | ☐ |
| 5 | Refresh browser | App works again | ☐ |

#### **13.2: Invalid Data**

| Test | Input | Expected Result | ✅ Pass |
|------|-------|----------------|---------|
| SQL Injection attempt | Email: `admin'--` | Rejected, not processed | ☐ |
| XSS attempt | Password: `<script>alert('xss')</script>` | Sanitized/escaped, no alert popup | ☐ |
| Very long input | 10,000 character password | Error: "Password too long" or truncated | ☐ |

#### **13.3: Session/Auth Errors**

| Test | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Login successfully | Dashboard loads | ☐ |
| 2 | Open DevTools → Application → Cookies | Delete jwt cookie | ☐ |
| 3 | Try to add password | Redirects to login (unauthorized) | ☐ |
| 4 | Direct URL to `/dashboard` | Redirects to login | ☐ |

#### **13.4: File Upload Errors**

| Test | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Try uploading 100MB file | Error: "File too large (max 60MB)" | ☐ |
| 2 | Upload executable (.exe) | Should work (encrypted) or show warning | ☐ |
| 3 | Upload file with special chars in name | Filename sanitized or accepted | ☐ |

---

## 🚀 Phase 14: Performance & Usability

### **Hey User! Let's Check How Fast & Smooth Everything Is**

#### **14.1: Load Times**

| Test | Action | Target Time | Actual Time | ✅ Pass |
|------|--------|-------------|-------------|---------|
| 1 | Initial page load | < 2 seconds | ____s | ☐ |
| 2 | Login response | < 1 second | ____s | ☐ |
| 3 | Dashboard load | < 1.5 seconds | ____s | ☐ |
| 4 | Password list load (50 items) | < 1 second | ____s | ☐ |
| 5 | File upload (1MB) | < 3 seconds | ____s | ☐ |

#### **14.2: Responsiveness**

| Test | Action | Expected Result | ✅ Pass |
|------|--------|----------------|---------|
| 1 | Resize browser to phone size (375px) | Layout adapts, mobile menu appears | ☐ |
| 2 | Resize to tablet (768px) | Sidebar collapses or adapts | ☐ |
| 3 | Test on actual phone | All features work on touch | ☐ |
| 4 | Rotate phone (portrait → landscape) | Layout adjusts properly | ☐ |

#### **14.3: Browser Compatibility**

| Browser | Test Login | Test Features | Issues Found | ✅ Pass |
|---------|-----------|---------------|--------------|---------|
| Chrome | ☐ | ☐ | | ☐ |
| Edge | ☐ | ☐ | | ☐ |
| Firefox | ☐ | ☐ | | ☐ |
| Safari (Mac) | ☐ | ☐ | | ☐ |

---

## 📊 Phase 15: Final Checklist - Is Everything Working?

### **Complete Feature Matrix**

| Feature | Works? | Issues | Priority |
|---------|--------|--------|----------|
| **Authentication** | | | |
| → Registration | ☐ | | High |
| → Login | ☐ | | High |
| → Logout | ☐ | | High |
| → Forgot Password | ☐ | | Medium |
| → Session Persistence | ☐ | | High |
| **Password Manager** | | | |
| → Add Password | ☐ | | High |
| → View Passwords | ☐ | | High |
| → Copy Password | ☐ | | High |
| → Edit Password | ☐ | | High |
| → Delete Password | ☐ | | High |
| → Search Passwords | ☐ | | High |
| → Filter by Category | ☐ | | Medium |
| → Sort Passwords | ☐ | | Medium |
| → Password Generator | ☐ | | High |
| → Strength Indicator | ☐ | | Medium |
| **File Vault** | | | |
| → Upload File | ☐ | | High |
| → Drag & Drop Upload | ☐ | | Medium |
| → Download File | ☐ | | High |
| → Delete File | ☐ | | High |
| → Search Files | ☐ | | Medium |
| → Filter by Category | ☐ | | Medium |
| → Grid/List View | ☐ | | Low |
| → Favorite Files | ☐ | | Low |
| **Security Education** | | | |
| → View Courses | ☐ | | Medium |
| → Start Course | ☐ | | Medium |
| → Navigate Lessons | ☐ | | Medium |
| → Mark Complete | ☐ | | Medium |
| → Progress Tracking | ☐ | | Medium |
| **Two-Factor Authentication** | | | |
| → Enable 2FA | ☐ | | High |
| → QR Code Setup | ☐ | | High |
| → Verify Code | ☐ | | High |
| → Backup Codes | ☐ | | High |
| → Use Backup Code | ☐ | | High |
| → Regenerate Codes | ☐ | | Medium |
| → Disable 2FA | ☐ | | Medium |
| **ML Features** (Optional) | | | |
| → ML Service Running | ☐ | | Medium |
| → Password Analysis | ☐ | | Medium |
| → Anomaly Detection | ☐ | | Low |
| → Model Training | ☐ | | Low |
| **UI/UX** | | | |
| → Dark/Light Mode | ☐ | | Low |
| → Notifications | ☐ | | Medium |
| → Responsive Design | ☐ | | High |
| → Navigation | ☐ | | High |

---

## 🎯 Daily Life Use Cases - How to Use CyberSuite

### **Morning Routine (5 minutes)**
1. **Login** to CyberSuite
2. **Check notifications** for any security alerts
3. **Review** any new threats from Network Scanner
4. **Add** any new passwords from overnight account creations

### **During Work (Throughout Day)**
1. **Creating New Account?**
   - Open Password Manager → Generate strong password → Save credentials
   
2. **Need to Login Somewhere?**
   - Search password manager → Copy password → Use it

3. **Received Important Document?**
   - Upload to File Vault → Add description → Download when needed

### **Weekly Tasks**
1. **Security Education** - Complete 1 course per week
2. **Password Audit** - Check for old/weak passwords and update them
3. **File Organization** - Review and categorize uploaded files

### **Monthly Maintenance**
1. **Review 2FA Status** - Ensure 2FA is enabled
2. **Backup Codes Check** - Verify you have backup codes saved
3. **Password Rotation** - Update passwords for critical accounts
4. **ML Model Retraining** - Retrain anomaly detection (if using ML)

---

## 🐛 Bug Tracking Template

**Found an Issue? Document It Here:**

### Bug Report Format

```
BUG #: ___
Date: ___________
Feature: ___________
Severity: [Critical / High / Medium / Low]

Steps to Reproduce:
1. 
2. 
3. 

Expected Behavior:


Actual Behavior:


Screenshots/Error Messages:


Browser/Environment:
```

---

## ✅ Testing Complete!

### **Summary Report**

**Total Features Tested:** _____ / _____  
**Features Working:** _____ (____%)  
**Issues Found:** _____  
**Critical Issues:** _____  
**High Priority Issues:** _____  

**Overall Status:** 🟢 Ready / 🟡 Needs Fixes / 🔴 Not Ready

**Notes:**
```
_______________________________________
_______________________________________
_______________________________________
```

---

## 📞 Need Help?

If you find issues or need clarification:
1. Check console logs (F12 → Console)
2. Check backend terminal for errors
3. Verify all environment variables are set
4. Ensure MongoDB is running
5. Check network tab in DevTools for API errors

**Remember:** This is YOUR security command center. Take time to explore, test thoroughly, and make it work for YOUR daily needs! 🛡️
