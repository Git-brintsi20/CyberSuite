const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const coursesData = [
  {
    courseId: 'cybersuite-essentials',
    title: 'CyberSuite Security Essentials',
    description: 'Master the fundamentals of password security, file encryption, and threat protection to safely use CyberSuite and protect yourself online.',
    level: 'Beginner',
    duration: '2.5 hours',
    icon: 'Shield',
    modules: [
      {
        id: 1,
        title: 'Getting Started with CyberSuite',
        description: 'Learn how to use CyberSuite tools to protect your digital life',
        lessons: [
          {
            id: 1,
            title: 'Welcome to CyberSuite',
            content: `# Welcome to CyberSuite 🛡️

## Your Personal Cybersecurity Toolkit

CyberSuite is designed to protect you from the most common security threats by providing four essential tools:

### 🔐 Password Manager
Store unlimited passwords with **AES-256 encryption** - the same standard banks and governments use. Never reuse passwords or write them on sticky notes again.

### 📦 Encrypted File Vault
Protect sensitive files (tax documents, contracts, medical records) with military-grade encryption. Even if someone steals your computer, your files remain unreadable.

### 🕵️ Network Scanner
Scan your home or office network to find open ports and vulnerabilities before hackers do. Know what devices are on your network and which ports are exposed.

### 🛡️ Two-Factor Authentication (2FA)
Add an extra layer of security to your CyberSuite account. Even if someone steals your password, they can't log in without your phone.

## Why You Need CyberSuite

**Did you know?**
- 81% of data breaches are caused by weak or reused passwords
- Ransomware attacks happen every 11 seconds
- The average person has 100+ online accounts
- Most people use the same 5 passwords everywhere

**CyberSuite solves these problems** by helping you:
- Generate unique, strong passwords for every account
- Encrypt sensitive files automatically
- Identify network security gaps
- Enable 2FA for maximum protection

## What You'll Learn

### Module 1: Getting Started ← You are here
- Understanding CyberSuite features
- Creating your secure foundation
- Security best practices

### Module 2: Mastering the Password Manager
- Generating unbreakable passwords
- Organizing credentials
- Using the password strength analyzer

### Module 3: File Vault & Encryption
- Encrypting files before storage
- Organizing files by category
- Understanding how encryption protects you

### Module 4: Network Scanner Guide
- Scanning your network safely
- Identifying security risks
- Understanding ports and services

### Module 5: Two-Factor Authentication
- Setting up 2FA on your account
- Using authenticator apps
- Managing backup codes

### Module 6: Staying Safe Online
- Recognizing phishing attacks
- Avoiding common scams
- Building security habits

## How to Use This Course

1. **Follow the order** - Lessons build on each other
2. **Practice as you learn** - Use CyberSuite tools alongside lessons
3. **Take your time** - Security is important, don't rush
4. **Apply immediately** - Use what you learn right away

## Let's Get Started! 🚀

Click "Next Lesson" to learn about password security fundamentals.`,
            duration: 10,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Understanding Password Security',
            content: `# Understanding Password Security 🔐

## The Password Problem

### Why Weak Passwords Are Dangerous

**Real-world example:**
- Hacker tries to break into your email
- Uses automated tool that tries 10,000 passwords per second
- Password "password123" is cracked in **0.0001 seconds**
- Password "J8$mK2@pL9#qR5!nW3" would take **6 million years**

### Common Password Mistakes

❌ **Bad Examples:**
- \`password123\` - Dictionary word + obvious number
- \`welcome2024\` - Predictable pattern
- \`JohnSmith1985\` - Personal information
- \`qwerty\` - Keyboard pattern
- Using same password everywhere

### What Makes a Strong Password?

✅ **Length**: Minimum 16 characters (longer = stronger)
✅ **Complexity**: Mix of uppercase, lowercase, numbers, symbols
✅ **Unpredictability**: No dictionary words or personal info
✅ **Uniqueness**: Different password for every account

## The Math Behind Password Strength

### Character Pool Size:
- Lowercase only (26 chars): **Very Weak**
- + Uppercase (52 chars): **Weak**
- + Numbers (62 chars): **Moderate**
- + Symbols (92 chars): **Strong**

### Password Length Impact:
- 8 characters: ~6 hours to crack
- 12 characters: ~2 centuries to crack
- 16 characters: ~34,000 centuries to crack
- 20 characters: ~2 billion centuries to crack

*Based on modern cracking hardware*

## How CyberSuite Password Manager Helps

### 1. Password Generation
Click "Generate Password" in CyberSuite to create:
- 20-character passwords by default
- Mix of all character types
- Cryptographically random (truly unpredictable)

**Example generated password:**
\`\`\`
mK9$pL2@nW5#qR8!jT3%vX7
\`\`\`

### 2. Secure Storage
Your passwords are encrypted with **AES-256-GCM**:
- Unbreakable with current technology
- Each password has unique encryption key
- Even CyberSuite developers can't read your passwords
- Passwords never stored in plain text

### 3. Strength Analysis
The Password Manager shows you:
- **Weak** (Red): Change immediately
- **Moderate** (Yellow): Could be stronger
- **Strong** (Green): Good security
- **Very Strong** (Dark Green): Excellent!

### 4. Organization
Sort passwords by:
- **Category**: Social, Banking, Work, Shopping, etc.
- **Strength**: Find weak passwords to update
- **Date**: Recently added or modified
- **Alphabetical**: Easy searching

## Password Strategy

### High-Security Accounts (Use Longest Passwords)
- Banking and financial accounts
- Email (used for password resets)
- CyberSuite account
- Work accounts
- Cloud storage

### Medium-Security Accounts
- Social media
- Shopping sites
- Forums
- Subscriptions

### Low-Security Accounts
- One-time registrations
- Throwaway accounts
- Public forums

**Important**: Even low-security accounts should have unique passwords!

## The Master Password

Your CyberSuite account password is the **MOST IMPORTANT** password you'll ever create.

### Master Password Requirements:
- ✅ At least 16 characters
- ✅ Mix of all character types
- ✅ Memorable to you (you'll type it often)
- ✅ Never used anywhere else
- ✅ Never written down or shared

### Creating a Memorable Master Password

**Technique: Passphrase Method**
1. Think of 4-5 random words
2. Add numbers and symbols
3. Use capitalization

**Example:**
\`\`\`
Correct Horse Battery Staple
↓ Add complexity ↓
C0rrect!H0rse#Battery$Staple2024
\`\`\`

This is:
- 35 characters long
- Easy to remember
- Extremely strong
- Unique to you

## Password Reset Safety

### If You Forget a Password:
1. Use CyberSuite to retrieve it (if stored)
2. If not stored, use the site's reset function
3. Always create a NEW strong password
4. Save it in CyberSuite immediately

### Red Flags for Phishing:
- Email asking for your password
- Urgent "verify your account" messages
- Links that don't match the company domain
- Poor grammar or spelling

**Remember**: Legitimate companies NEVER ask for passwords via email!

## Practical Exercise

Let's practice with CyberSuite:

1. **Open Password Manager** from the sidebar
2. **Click "Add Credential"**
3. **Enter**:
   - Website: "practice.example.com"
   - Username: "testuser"
   - Click "Generate Password"
   - Select Category: "Other"
4. **Save the credential**
5. **View the strength indicator** - should be "Very Strong"

## Quick Reference

### Do's ✅
- Use Password Manager for all accounts
- Generate random passwords
- Use unique password per site
- Enable 2FA when available
- Update weak passwords immediately

### Don'ts ❌
- Reuse passwords
- Share passwords with anyone
- Write passwords on paper
- Use personal information
- Save passwords in browser without encryption

## Next Steps

In the next lesson, you'll learn how to:
- Add credentials to CyberSuite
- Use the password generator
- Organize passwords by category
- Find and update weak passwords

Click "Next Lesson" when ready!`,
            duration: 20,
            videoUrl: null
          }
        ]
      },
      {
        id: 2,
        title: 'Mastering the Password Manager',
        description: 'Learn to use CyberSuite Password Manager effectively',
        lessons: [
          {
            id: 1,
            title: 'Using the Password Manager',
            content: `# Using the Password Manager 🔑

## Dashboard Overview

When you open the Password Manager, you'll see:

### Top Section:
- **Add Credential** button (+ icon)
- **Search bar** - Find passwords quickly
- **Category filter** - View specific types
- **Sort options** - By name, date, or strength

### Password List:
Each credential shows:
- **Website/Service name**
- **Username**
- **Category** (color-coded badge)
- **Strength indicator** (Weak/Moderate/Strong/Very Strong)
- **Action buttons** (View, Edit, Delete, Copy)

## Adding Your First Credential

### Step-by-Step Guide:

1. **Click "Add Credential"** (top right)

2. **Fill in the form**:
   - **Website**: Full URL (e.g., \`https://facebook.com\`)
   - **Username**: Your email or username
   - **Password**: 
     - **Option A**: Click "Generate Password" (recommended)
     - **Option B**: Type your own (not recommended)
   - **Category**: Choose from:
     - Social Media
     - Banking
     - Email
     - Shopping
     - Work
     - Entertainment
     - Other
   - **Notes** (optional): Security questions, account details

3. **Click "Save"**

4. **Verify**: Credential appears in your list

## Using the Password Generator

### Generator Options:

Click "Generate Password" to see:
- **Length slider**: 8-32 characters (default: 20)
- **Include uppercase**: A-Z
- **Include lowercase**: a-z
- **Include numbers**: 0-9
- **Include symbols**: !@#$%^&*

### Recommended Settings:
- ✅ Length: 20+ characters
- ✅ All options enabled
- ✅ Copy password immediately after generation

### Behind the Scenes:
CyberSuite uses **cryptographically secure random generation**:
- Not predictable like "random" number generators
- Same standard used by banks
- Each password is truly unique

## Managing Credentials

### Viewing Passwords

1. Click the **eye icon** next to any password
2. Password is temporarily revealed
3. Click **copy icon** to copy to clipboard
4. Password automatically hides after 30 seconds

**Security Tip**: Never leave passwords visible on screen when others can see!

### Editing Credentials

1. Click the **edit icon** (pencil)
2. Modify any field:
   - Update website URL
   - Change username
   - Regenerate password
   - Update category
   - Add/edit notes
3. Click "Update"

**Best Practice**: Update passwords every 3-6 months for important accounts

### Deleting Credentials

1. Click the **delete icon** (trash)
2. Confirm deletion
3. Credential is permanently removed

**Warning**: Deleted passwords cannot be recovered! Make sure you've changed the password on the actual website first.

## Searching and Filtering

### Search Bar:
- Type any part of website name, username, or notes
- Results update in real-time
- Case-insensitive

**Example searches:**
- \`facebook\` - Finds Facebook account
- \`gmail\` - Finds email accounts
- \`john@\` - Finds all accounts with that email

### Category Filter:
Click category badges to view:
- All Social Media accounts
- All Banking accounts
- All Email accounts
- etc.

### Sorting Options:
- **Name (A-Z)**: Alphabetical order
- **Date Added**: Newest first
- **Strength**: Weakest first (find passwords to update!)

## Password Strength Analyzer

CyberSuite analyzes each password and shows:

### 🔴 Weak (0-40%)
- **Problem**: Easy to crack (hours/days)
- **Action**: Update immediately!
- **Common causes**:
  - Too short (<12 characters)
  - Dictionary words
  - Predictable patterns

### 🟡 Moderate (41-70%)
- **Problem**: Could be stronger
- **Action**: Update when convenient
- **Common causes**:
  - Decent length but low complexity
  - Missing symbol characters

### 🟢 Strong (71-90%)
- **Status**: Good security
- **Action**: Acceptable for most accounts
- **Characteristics**:
  - 12-16 characters
  - Good complexity

### 🟢 Very Strong (91-100%)
- **Status**: Excellent security
- **Action**: Keep using
- **Characteristics**:
  - 16+ characters
  - High complexity
  - Truly random

## Best Practices Workflow

### For New Accounts:
1. When signing up for new service
2. Open CyberSuite Password Manager
3. Click "Add Credential"
4. Enter website and username
5. Click "Generate Password"
6. Copy password to clipboard
7. Paste into signup form
8. Save credential in CyberSuite
9. Done! ✓

### For Existing Accounts:
1. Log into existing account
2. Go to "Change Password" settings
3. Open CyberSuite Password Manager
4. Find existing credential or create new
5. Generate new strong password
6. Copy to clipboard
7. Paste into password change form
8. Update credential in CyberSuite
9. Done! ✓

## Security Features Explained

### AES-256-GCM Encryption

**What it means:**
- Your passwords are encrypted before storage
- Encryption key derived from your master password
- Each password has unique initialization vector (IV)
- Authentication tag prevents tampering

**In simple terms:**
Even if someone steals the database, they see:
\`\`\`
Actual Password: MyBankPassword123
What Hackers See: X8#mK$2@pL9#qR5!nW3T7%vY4
\`\`\`

Without your master password, the data is gibberish!

### Zero-Knowledge Architecture

CyberSuite developers **cannot** see your passwords because:
- Encryption happens on YOUR device
- Keys never leave your browser
- Server only stores encrypted data
- No backdoors or master keys

**You are in complete control!**

## Organizing Your Vault

### Recommended Categories:

**Banking & Finance:**
- Banks
- Credit cards
- Investment accounts
- PayPal, Venmo

**Email:**
- Gmail
- Outlook
- Yahoo Mail
- Work email

**Social Media:**
- Facebook, Instagram
- Twitter, LinkedIn
- TikTok, Snapchat

**Shopping:**
- Amazon
- eBay
- Online stores

**Work:**
- Company accounts
- Project management tools
- Communication platforms

**Entertainment:**
- Netflix, Hulu
- Gaming accounts
- Music streaming

**Other:**
- Everything else

## Common Questions

### Q: What if I forget my master password?
**A**: Unfortunately, it cannot be recovered. This is the tradeoff for zero-knowledge security. **Write it down and store in a safe place** (like a safe or lockbox).

### Q: Can I access passwords on multiple devices?
**A**: Yes! Log into CyberSuite from any device. Your encrypted passwords sync automatically.

### Q: Should I save my master password in browser?
**A**: **NO!** Your master password is the key to everything. Memorize it or store it securely offline.

### Q: What if CyberSuite gets hacked?
**A**: Your passwords remain safe because they're encrypted. Hackers would need your master password to decrypt them.

## Practice Exercise

Let's add 3 sample credentials:

### Exercise 1: Social Media Account
1. Click "Add Credential"
2. Website: \`https://facebook.com\`
3. Username: your email
4. Generate 20-character password
5. Category: Social Media
6. Save

### Exercise 2: Email Account
1. Add new credential
2. Website: \`https://gmail.com\`
3. Username: your Gmail
4. Generate password
5. Category: Email
6. Notes: "Recovery email: alternate@email.com"
7. Save

### Exercise 3: Banking Account
1. Add new credential
2. Website: Your bank's URL
3. Username: account number or email
4. Generate 24-character password (max security!)
5. Category: Banking
6. Notes: "Security questions: [your answers]"
7. Save

### Now Practice:
- Search for "facebook"
- Filter by "Banking" category
- Sort by "Strength"
- Copy a password to clipboard
- Edit a credential and update notes

## Quick Reference Card

### Adding Credentials:
1. Click "Add Credential"
2. Fill in details
3. Generate password
4. Choose category
5. Save

### Finding Passwords:
- Use search bar
- Filter by category
- Sort by strength/date

### Updating Passwords:
1. Click edit icon
2. Generate new password
3. Copy to clipboard
4. Update on actual website
5. Save in CyberSuite

### Security Rules:
- ✅ Use generated passwords
- ✅ Unique password per site
- ✅ Update weak passwords
- ✅ Enable 2FA everywhere
- ❌ Never share master password

## Next Lesson

You've mastered the Password Manager! 🎉

Next, you'll learn about the **Encrypted File Vault** and how to protect sensitive documents.

Click "Next Lesson" to continue!`,
            duration: 25,
            videoUrl: null
          }
        ]
      }
    ]
  },
  {
    courseId: 'file-vault-encryption',
    title: 'File Vault & Encryption Mastery',
    description: 'Learn how to protect your sensitive files with AES-256 encryption and organize them securely in CyberSuite.',
    level: 'Beginner',
    duration: '2 hours',
    icon: 'FolderLock',
    modules: [
      {
        id: 1,
        title: 'Understanding File Encryption',
        description: 'Learn why and how encryption protects your files',
        lessons: [
          {
            id: 1,
            title: 'Why Encrypt Files?',
            content: `# Why Encrypt Files? 📦

## The Risks of Unencrypted Files

### Real-World Scenarios:

**Scenario 1: Lost Laptop**
- Sarah's laptop is stolen from her car
- Contains tax returns with Social Security numbers
- Client contracts with confidential information
- Family photos she doesn't want shared

**Without Encryption:**
- Thief has full access to all files
- Identity theft risk
- Business data compromised
- Privacy violated

**With CyberSuite Encryption:**
- Files are unreadable without password
- Data remains protected
- Peace of mind ✓

**Scenario 2: Ransomware Attack**
- John's computer infected with ransomware
- All files encrypted by hackers
- Demands $5,000 to decrypt

**Without CyberSuite:**
- Pay ransom or lose files
- No guarantee hackers will decrypt

**With CyberSuite:**
- Important files already encrypted and backed up
- Restore from CyberSuite after cleaning computer
- No ransom needed ✓

**Scenario 3: Cloud Storage Breach**
- Major cloud provider has data breach
- Millions of files accessed by hackers

**Without Encryption:**
- Files are readable by hackers
- Personal information exposed

**With CyberSuite:**
- Files encrypted before upload
- Hackers see encrypted gibberish
- Data stays private ✓

## What Files Should You Encrypt?

### High Priority (Encrypt Immediately):

**Financial Documents:**
- Tax returns (W-2, 1099 forms)
- Bank statements
- Investment account statements
- Credit card information
- Loan documents
- Receipts for major purchases

**Personal Identification:**
- Passport scans
- Driver's license copies
- Social Security card
- Birth certificates
- Medical records
- Insurance documents

**Legal Documents:**
- Contracts
- Wills and trusts
- Property deeds
- Legal correspondence
- Court documents

**Business Documents:**
- Client information
- Employee records
- Business plans
- Proprietary information
- Financial reports
- Trade secrets

**Personal:**
- Private photos/videos
- Personal journals
- Sensitive correspondence
- Account recovery information

### Medium Priority:

- Resumes (contain personal info)
- School records
- Certifications and licenses
- Travel documents
- Backup codes and passwords

### Low Priority:

- Public documents
- General photos
- Music and videos (purchased)
- Open-source code

## How Encryption Protects You

### What is Encryption?

Encryption is like putting your file in an unbreakable vault:

**Before Encryption (Plain Text):**
\`\`\`
Tax Return 2024
Name: John Smith
SSN: 123-45-6789
Income: $75,000
\`\`\`

**After Encryption (Cipher Text):**
\`\`\`
8f3a9c2b7d1e6h4j5k9m0p2q8r3s7t1u
5v9w3x7y1z4a8b2c6d0e4f8g2h6i0j4k
9m3n7o1p5q9r3s7t1u5v9w3x7y1z5a9b
\`\`\`

**What hackers see**: Meaningless random characters
**What you see** (with password): Original document

### CyberSuite Encryption Explained

CyberSuite uses **AES-256-GCM** - the gold standard in encryption:

**AES-256:**
- Used by: US Government, NSA, Banks
- Strength: Would take billions of years to crack
- Trust: Trusted by militaries worldwide

**GCM Mode:**
- Ensures file hasn't been tampered with
- Authenticates the encrypted data
- Extra security layer

**Process:**
1. You upload a file
2. CyberSuite generates random encryption key
3. File encrypted on your device
4. Encrypted file sent to server
5. Original file never leaves your device unencrypted

### The Math Behind It

**256-bit encryption means:**
- 2^256 possible keys
- That's 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,936 combinations
- If you tried 1 trillion keys per second, it would take:
  - **3.67 × 10^51 years** to try all combinations
  - For reference: Universe is only 13.8 billion years old

**Bottom line**: Unbreakable with current technology!

## Encryption vs. Password Protection

### Password-Protected Files (Weak):
- ❌ Often use weak encryption
- ❌ Can be cracked with tools
- ❌ Passwords can be guessed
- ❌ File format specific

**Example**: Password-protecting a ZIP file
- Uses outdated encryption
- Can be cracked in hours/days
- Not secure for sensitive data

### CyberSuite Encryption (Strong):
- ✅ Military-grade AES-256
- ✅ Impossible to crack
- ✅ Unique key per file
- ✅ Authentication prevents tampering
- ✅ Works for any file type

## Common Myths About Encryption

### Myth 1: "I have nothing to hide"
**Reality**: Everyone has sensitive information:
- Financial data
- Personal photos
- Medical records
- Login credentials

**You're not hiding, you're protecting!**

### Myth 2: "Encryption is only for criminals"
**Reality**: 
- Banks encrypt your transactions
- Hospitals encrypt medical records
- Governments encrypt communications
- You encrypt messages (WhatsApp, Signal)

**Encryption is normal and necessary!**

### Myth 3: "Encryption is complicated"
**Reality**: CyberSuite makes it simple:
1. Drag and drop file
2. Click upload
3. Done! File is encrypted

**You don't need to understand the math!**

### Myth 4: "Cloud storage is already secure"
**Reality**:
- Cloud providers can be hacked
- Employees can access your files
- Government can request data
- Terms of Service can change

**Encrypt before uploading for true privacy!**

## Legal and Ethical Considerations

### Your Right to Encrypt

In most countries, you have the right to:
- ✅ Encrypt personal files
- ✅ Use strong encryption
- ✅ Protect privacy
- ✅ Secure sensitive data

**Encryption is legal and encouraged!**

### Best Practices:

1. **Don't forget passwords** - Encrypted files cannot be recovered without password
2. **Backup encrypted files** - Store in multiple locations
3. **Encrypt sensitive data only** - Not everything needs encryption
4. **Use strong passwords** - Encryption is only as strong as your password
5. **Follow laws** - Some countries restrict encryption (rare)

## Real-World Impact

### Case Study 1: Healthcare
- Doctor's laptop stolen from car
- Contains 1,000+ patient records
- **Without encryption**: HIPAA violation, massive fines, career damage
- **With encryption**: No breach, no fines, privacy protected ✓

### Case Study 2: Business
- Employee leaves company
- Takes laptop with client data
- **Without encryption**: Trade secrets exposed, clients sue
- **With encryption**: Data unreadable, business protected ✓

### Case Study 3: Personal
- Computer virus encrypts all files (ransomware)
- Demands $10,000 payment
- **Without CyberSuite**: Pay or lose everything
- **With CyberSuite**: Restore encrypted files from vault ✓

## Encryption Checklist

Before moving to the next lesson, ask yourself:

✅ Do I understand why encryption is important?
✅ Do I know what files I should encrypt?
✅ Do I understand how CyberSuite protects my files?
✅ Am I ready to start using the File Vault?

If you answered "yes" to all questions, you're ready!

## Next Steps

In the next lesson, you'll learn:
- How to upload files to the File Vault
- Organizing files by category
- Downloading and sharing encrypted files
- Managing your encrypted storage

Click "Next Lesson" to continue!`,
            duration: 20,
            videoUrl: null
          }
        ]
      }
    ]
  },
  {
    courseId: 'network-security-basics',
    title: 'Network Security & Scanner Guide',
    description: 'Learn how to use the CyberSuite Network Scanner to identify vulnerabilities and secure your home or office network.',
    level: 'Intermediate',
    duration: '2 hours',
    icon: 'Wifi',
    modules: [
      {
        id: 1,
        title: 'Understanding Network Security',
        description: 'Learn the basics of network security and port scanning',
        lessons: [
          {
            id: 1,
            title: 'Network Security Basics',
            content: `# Network Security Basics 🕵️

## What is a Network?

A network is two or more devices connected together to share information:

### Your Home Network:
- **Router**: Central hub connecting devices
- **Devices**: Phones, laptops, smart TV, tablets
- **Internet**: Connection to the outside world

\`\`\`
Internet → Router → Your Devices
              ↓
         Smart Home Devices
\`\`\`

## Why Network Security Matters

### Your Network is Your Digital Home

Just like you lock your doors and windows, you need to secure your network!

**Unsecured Network Risks:**
- 🚨 Hackers can intercept your data
- 🚨 Neighbors can steal your WiFi
- 🚨 Malware can spread to all devices
- 🚨 Smart home devices can be hijacked
- 🚨 Personal information can be stolen

### Real Attack Scenarios:

**Scenario 1: Open Port Attack**
- Your router has port 23 (Telnet) open
- Hacker scans your network
- Finds the open port
- Gains access to your router
- Changes settings, steals data

**Scenario 2: IoT Device Vulnerability**
- Smart camera has default password
- Hacker finds it on your network
- Logs in with default credentials
- Watches your home 24/7

**Scenario 3: Man-in-the-Middle**
- Unsecured WiFi network
- Hacker on same network
- Intercepts your passwords
- Steals credit card numbers

## Understanding Ports

### What is a Port?

Think of your computer as an apartment building:
- **IP Address**: Building address (123 Main St)
- **Ports**: Individual apartment numbers (Apt 1, 2, 3)
- **Services**: Who lives in each apartment

**Example:**
- Port 80: Web server (HTTP)
- Port 443: Secure web (HTTPS)
- Port 22: SSH (remote access)
- Port 3389: Remote Desktop

### Port States:

**Open:**
- Service is running and accepting connections
- Can be legitimate (your web server)
- Can be risky (forgotten service)

**Closed:**
- Port is accessible but no service running
- Normal state for unused ports

**Filtered:**
- Firewall blocking access
- Good security practice

## The CyberSuite Network Scanner

### What It Does:

The Network Scanner checks your network for:
- **Open ports** on any device
- **Vulnerable services** (Telnet, FTP)
- **Risky configurations**
- **Unknown devices**

### How It Works:

1. You enter an IP address or hostname
2. Scanner tries to connect to 20 common ports
3. Reports which ports are open
4. Identifies the service running
5. Flags security concerns

### 20 Ports Scanned:

| Port | Service | Risk Level |
|------|---------|------------|
| 21 | FTP | ⚠️ High - Unencrypted |
| 22 | SSH | ✅ Safe if configured |
| 23 | Telnet | 🚨 Critical - Never use |
| 25 | SMTP | ⚠️ Medium |
| 53 | DNS | ✅ Normal |
| 80 | HTTP | ⚠️ Unencrypted web |
| 110 | POP3 | ⚠️ Unencrypted email |
| 143 | IMAP | ⚠️ Unencrypted email |
| 443 | HTTPS | ✅ Secure web |
| 445 | SMB | ⚠️ File sharing risk |
| 3306 | MySQL | ⚠️ Should be internal |
| 3389 | RDP | ⚠️ Remote desktop |
| 5432 | PostgreSQL | ⚠️ Should be internal |
| 5900 | VNC | ⚠️ Remote access |
| 8080 | HTTP Alt | ⚠️ Web server |
| 8443 | HTTPS Alt | ✅ Secure web alt |
| 27017 | MongoDB | ⚠️ Should be internal |

## Legal and Ethical Scanning

### ⚠️ IMPORTANT: Only scan networks you own or have permission to scan!

**Legal to Scan:**
- ✅ Your home network
- ✅ Your business network (with authorization)
- ✅ Client networks (with signed agreement)
- ✅ Your own devices
- ✅ Test environments you own

**ILLEGAL to Scan:**
- ❌ Neighbor's network
- ❌ Public WiFi networks
- ❌ Company networks without permission
- ❌ Government systems
- ❌ Any network you don't own

**Consequences of Unauthorized Scanning:**
- Criminal charges (Computer Fraud and Abuse Act)
- Fines up to $250,000
- Imprisonment up to 10 years
- Civil lawsuits
- Loss of job/career

**Always ask permission first!**

## Common Network Vulnerabilities

### 1. Weak WiFi Password
**Problem**: Easy to guess password (password123)
**Risk**: Anyone can join your network
**Fix**: Use WPA3 with 16+ character password

### 2. Default Router Credentials
**Problem**: Admin password still "admin/admin"
**Risk**: Anyone can change your router settings
**Fix**: Change immediately to strong unique password

### 3. Open Ports
**Problem**: Unnecessary services running
**Risk**: Entry points for hackers
**Fix**: Close unused ports, use firewall

### 4. Outdated Firmware
**Problem**: Router running old software
**Risk**: Known vulnerabilities
**Fix**: Update router firmware regularly

### 5. No Network Segmentation
**Problem**: All devices on same network
**Risk**: IoT devices can access computers
**Fix**: Create guest network for IoT devices

### 6. UPnP Enabled
**Problem**: Devices can open ports automatically
**Risk**: Malware can expose your network
**Fix**: Disable UPnP unless needed

## Network Security Layers

### Layer 1: Router Firewall
- First line of defense
- Blocks incoming connections
- Filters malicious traffic

### Layer 2: Strong WiFi Encryption
- WPA3 or WPA2 only
- Strong password
- Hidden SSID (optional)

### Layer 3: Device Firewalls
- Windows Firewall
- macOS Firewall
- Third-party firewalls

### Layer 4: Network Segmentation
- Main network for computers
- Guest network for visitors
- IoT network for smart devices

### Layer 5: Regular Monitoring
- Scan network weekly
- Check for unknown devices
- Update all software

## Your Home Network Security Checklist

### Router Security:
- [ ] Changed default admin password
- [ ] Using WPA3 or WPA2 encryption
- [ ] Strong WiFi password (16+ characters)
- [ ] Firmware updated to latest version
- [ ] UPnP disabled (unless needed)
- [ ] Remote admin access disabled
- [ ] Guest network enabled

### Network Monitoring:
- [ ] Run CyberSuite scan weekly
- [ ] Know all devices on network
- [ ] Check for open ports
- [ ] Review router logs monthly

### Device Security:
- [ ] All devices have strong passwords
- [ ] Firewalls enabled
- [ ] Software up to date
- [ ] Antivirus installed
- [ ] Unused services disabled

## Next Lesson Preview

Now that you understand network security basics, the next lesson will teach you:

- How to use the CyberSuite Network Scanner
- Interpreting scan results
- Identifying security risks
- Fixing common vulnerabilities

Ready to scan your network? Click "Next Lesson"!`,
            duration: 25,
            videoUrl: null
          }
        ]
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    const inserted = await Course.insertMany(coursesData);
    console.log(`✅ Successfully inserted ${inserted.length} courses`);

    console.log('\n📚 CyberSuite Education Courses:');
    inserted.forEach(course => {
      const lessonCount = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
      console.log(`   - ${course.title} (${course.level}) - ${lessonCount} lessons`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
