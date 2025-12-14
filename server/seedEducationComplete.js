const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const coursesData = [
  {
    courseId: 'cybersuite-essentials',
    title: 'CyberSuite Security Essentials',
    description: 'Master the fundamentals of password security, file encryption, and threat protection to safely use CyberSuite and protect yourself online.',
    level: 'Beginner',
    duration: '8 hours',
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

Welcome to your personal cybersecurity toolkit! This course will teach you how to protect yourself online using CyberSuite's powerful security features.

## What You'll Learn
- Password Manager for secure credential storage
- File Vault for encrypted file protection
- Network Scanner for vulnerability detection
- Two-Factor Authentication for account security

## Getting Started
CyberSuite is designed to be simple yet powerful. Each lesson builds on the previous one, so take your time and practice as you go.

**Ready to become security-savvy? Let's begin!**`,
            duration: 5,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Understanding Password Security',
            content: `# Understanding Password Security 🔐

Passwords are your first line of defense online. Learn why strong, unique passwords matter and how CyberSuite helps you manage them securely.

## Key Concepts
- Password strength and complexity
- Why password reuse is dangerous
- How encryption protects your credentials
- Best practices for password management

## The CyberSuite Advantage
With AES-256 encryption, your passwords are protected by military-grade security that would take billions of years to crack.

**Next up: Hands-on password manager tutorial!**`,
            duration: 15,
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
            title: 'Adding and Managing Credentials',
            content: `# Adding and Managing Credentials 🔑

Learn how to add, organize, and manage your passwords in CyberSuite's Password Manager.

## Adding a Credential
1. Click "Add Credential" button
2. Enter website URL and username
3. Generate a strong password or enter your own
4. Choose a category (Banking, Social, Work, etc.)
5. Save your credential

## Organizing Your Vault
- Use categories to group similar accounts
- Search quickly using the search bar
- Sort by name, date, or password strength
- Update weak passwords identified by the strength analyzer

## Best Practices
- Generate 20+ character passwords for important accounts
- Use unique passwords for every site
- Review and update old passwords regularly
- Never share your master password

**Practice adding a few credentials now!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Password Organization Strategies',
            content: `# Password Organization Strategies 📋

Learn effective strategies for organizing your credentials so you can find them quickly and maintain good security hygiene.

## Category System
- **Banking**: Financial accounts, credit cards
- **Email**: Email providers, recovery accounts
- **Social Media**: Facebook, Twitter, LinkedIn, etc.
- **Work**: Company accounts, project tools
- **Shopping**: E-commerce sites
- **Entertainment**: Streaming services, gaming
- **Other**: Everything else

## Naming Conventions
Use clear, searchable names:
- ✅ "Gmail - Personal Account"
- ✅ "Bank of America - Checking"
- ❌ "email"
- ❌ "bank"

## Regular Maintenance
- Weekly: Review new additions
- Monthly: Check password strength
- Quarterly: Update old passwords
- Annually: Full security audit

**A well-organized password vault saves time and improves security!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Password Security Audit',
            content: `# Password Security Audit 🔍

Learn how to identify and fix weak passwords, reused credentials, and other security issues in your password vault.

## Running a Security Audit
1. Open Password Manager
2. Sort by "Strength" (weakest first)
3. Identify passwords marked "Weak" or "Moderate"
4. Check for reused passwords across accounts
5. Look for old passwords (6+ months)

## Fixing Weak Passwords
For each weak password:
1. Log into the website/service
2. Navigate to password change settings
3. Generate a new strong password in CyberSuite
4. Update password on the website
5. Update credential in CyberSuite
6. Verify the change worked

## Priority Order
1. **Critical** (fix immediately): Banking, email, work accounts
2. **High** (fix this week): Social media, shopping sites
3. **Medium** (fix this month): Entertainment, forums
4. **Low** (fix when convenient): Rarely used accounts

## Reused Passwords
Never reuse passwords! If one account is breached, all accounts with that password are at risk.

**Set a reminder to audit your passwords quarterly!**`,
            duration: 20,
            videoUrl: null
          }
        ]
      },
      {
        id: 3,
        title: 'File Vault Deep Dive',
        description: 'Master encrypted file storage and management',
        lessons: [
          {
            id: 1,
            title: 'Uploading and Managing Files',
            content: `# Uploading and Managing Files 📦

Learn how to upload, organize, and manage your encrypted files in CyberSuite's File Vault.

## Uploading Files
Two methods:
1. **Drag and Drop**: Drag files directly into the vault
2. **Upload Button**: Click "Upload File" and browse

## File Categories
- **Documents**: PDFs, Word docs, spreadsheets
- **Images**: Photos, scans, diagrams
- **Videos**: Personal recordings, backups
- **Archives**: ZIP files, backups
- **Other**: Miscellaneous files

## File Size Limits
- Maximum file size: 100 MB per file
- Larger files: Consider splitting or compressing
- Best practice: Keep individual files under 50 MB

## Encryption Process
All files are automatically encrypted with AES-256-GCM before storage. This happens instantly as you upload - no extra steps needed!

**Try uploading a test file now!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Organizing Your Vault',
            content: `# Organizing Your Vault 🗂️

Keep your encrypted files organized and easy to find with these strategies.

## View Options
- **Grid View**: Visual preview of files
- **List View**: Detailed file information
- Switch between views using the toggle button

## Sorting Options
- Name (A-Z)
- Date uploaded (newest first)
- File size (largest first)
- Category

## Search and Filter
- Search by filename
- Filter by category
- Filter by date range
- Combine filters for precise results

## Adding Descriptions
- Add meaningful descriptions to files
- Include keywords for easy searching
- Note the file's purpose or contents
- Update descriptions as needed

## Best Practices
- Create a consistent naming scheme
- Use categories properly
- Add descriptions to important files
- Regularly review and remove old files

**A well-organized vault is a secure vault!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Downloading and Sharing Files',
            content: `# Downloading and Sharing Files 🔓

Learn how to safely download your encrypted files and share them when necessary.

## Downloading Files
1. Locate the file in your vault
2. Click the download icon
3. File is automatically decrypted
4. Save to your desired location

## Decryption Process
- Happens automatically during download
- Uses your master encryption key
- File is restored to original format
- No additional steps required

## Sharing Encrypted Files
When you need to share sensitive files:

**Option 1: Share Decrypted**
- Download and decrypt the file
- Share using your preferred method
- Remember: file is no longer encrypted!

**Option 2: Share Still Encrypted**
- Download the encrypted file
- Share the encrypted version
- Recipient needs the decryption key
- Most secure method

## Security Considerations
- Only share sensitive files with trusted recipients
- Use secure channels (encrypted email, secure file transfer)
- Consider setting expiration dates
- Remove access when no longer needed

**Never share your master password with anyone!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 4,
            title: 'File Vault Backup Strategies',
            content: `# File Vault Backup Strategies 💾

Protect your encrypted files with proper backup strategies.

## The 3-2-1 Backup Rule
- **3** copies of your data
- On **2** different types of storage media
- With **1** copy stored offsite

## Backup Options for CyberSuite
1. **Cloud Backup**: Files already stored securely in CyberSuite
2. **Local Backup**: Download important files to external drive
3. **Secondary Cloud**: Export to another cloud service

## What to Backup
- Critical documents (taxes, legal, medical)
- Irreplaceable files (photos, videos)
- Important work files
- Credentials backup (export from Password Manager)

## Backup Schedule
- **Daily**: Critical, frequently changing files
- **Weekly**: Important documents
- **Monthly**: Full vault backup
- **Quarterly**: Verify backup integrity

## Testing Your Backups
Regularly verify your backups work:
1. Try restoring a file
2. Check file integrity
3. Ensure encryption/decryption works
4. Update backup strategy as needed

**The best time to test a backup is before you need it!**`,
            duration: 15,
            videoUrl: null
          }
        ]
      },
      {
        id: 4,
        title: 'Network Scanner Mastery',
        description: 'Learn to scan and secure your network',
        lessons: [
          {
            id: 1,
            title: 'Understanding Network Vulnerabilities',
            content: `# Understanding Network Vulnerabilities 🕵️

Learn what makes networks vulnerable and why regular scanning is important.

## Common Network Threats
- **Open Ports**: Entry points for attackers
- **Weak Passwords**: Default router credentials
- **Outdated Firmware**: Unpatched security holes
- **Unsecured Services**: FTP, Telnet, unencrypted connections
- **Unknown Devices**: Unauthorized access to your network

## How Attackers Exploit Networks
1. Scan for open ports
2. Identify running services
3. Check for known vulnerabilities
4. Attempt to exploit weaknesses
5. Gain unauthorized access

## Why Regular Scanning Matters
- Identify vulnerabilities before attackers do
- Monitor for unauthorized devices
- Track changes to your network
- Maintain security compliance
- Peace of mind

## Legal and Ethical Scanning
⚠️ **IMPORTANT**: Only scan networks you own or have explicit permission to scan. Unauthorized scanning is illegal and can result in serious penalties.

**Next: Learn to use the CyberSuite Network Scanner!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Using the Network Scanner',
            content: `# Using the Network Scanner 🔍

Step-by-step guide to scanning your network with CyberSuite.

## Running Your First Scan
1. Navigate to Network Scanner
2. Enter target IP address or hostname
3. Click "Start Scan"
4. Wait for results (usually 10-30 seconds)
5. Review identified open ports and services

## Understanding IP Addresses
- **Local IP**: 192.168.x.x or 10.x.x.x (internal network)
- **Public IP**: Your internet-facing address
- **Router**: Usually 192.168.1.1 or 192.168.0.1
- **Devices**: Other IPs on your network

## What Gets Scanned
CyberSuite checks 20 common ports:
- Web services (80, 443, 8080)
- Remote access (22, 23, 3389)
- File transfer (21, 445)
- Databases (3306, 5432, 27017)
- Email (25, 110, 143)
- And more...

## Reading Scan Results
- **Open** (⚠️): Port is accessible and has a service running
- **Closed**: Port is reachable but no service listening
- **Filtered**: Firewall is blocking access (good!)

## Scan Frequency
- **Weekly**: Home networks
- **Daily**: Business networks
- **After changes**: New devices or configuration updates
- **Post-incident**: After suspected security event

**Try scanning your router now!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Interpreting Scan Results',
            content: `# Interpreting Scan Results 📊

Learn what scan results mean and which ones require action.

## Port-by-Port Guide

### Critical Ports (Close Immediately)
- **Port 23 (Telnet)**: Unencrypted, extremely vulnerable
- **Port 21 (FTP)**: Unencrypted file transfer
- **Port 445 (SMB)**: File sharing, frequently exploited

### Common Ports (Should Be Closed Unless Needed)
- **Port 3389 (RDP)**: Remote Desktop - attack target
- **Port 22 (SSH)**: Secure but should be firewalled
- **Port 3306 (MySQL)**: Database should be internal only
- **Port 5432 (PostgreSQL)**: Database should be internal only

### Normal Ports (Usually Safe)
- **Port 80 (HTTP)**: Web server - normal for public sites
- **Port 443 (HTTPS)**: Secure web - good!
- **Port 53 (DNS)**: Domain name service - normal

## Security Risk Levels
🚨 **CRITICAL**: Close immediately (Telnet, FTP)
⚠️ **HIGH**: Close or restrict access (databases, RDP)
⚡ **MEDIUM**: Review and secure if open (SSH, SMB)
✅ **LOW**: Monitor but usually acceptable (HTTPS)

## What to Do About Open Ports

### For Each Open Port:
1. Identify what service is running
2. Determine if you need that service
3. If not needed: Disable the service
4. If needed: Ensure it's secured properly
5. Update any outdated software
6. Enable firewall rules

## Creating an Action Plan
1. List all open ports from scan
2. Prioritize by risk level
3. Research each service
4. Close unnecessary ports
5. Secure necessary ones
6. Document your changes
7. Re-scan to verify

**Take action on high-risk ports today!**`,
            duration: 25,
            videoUrl: null
          },
          {
            id: 4,
            title: 'Network Security Hardening',
            content: `# Network Security Hardening 🔒

Take action to secure your network based on scan results.

## Router Security Checklist
- [ ] Change default admin password
- [ ] Update to latest firmware
- [ ] Enable WPA3 or WPA2 encryption
- [ ] Use strong WiFi password (16+ characters)
- [ ] Disable WPS (WiFi Protected Setup)
- [ ] Disable remote management
- [ ] Enable router firewall
- [ ] Change default SSID (network name)

## Closing Unnecessary Ports
1. Access router admin panel
2. Navigate to firewall settings
3. Block incoming connections on risky ports
4. Set up port forwarding rules (if needed)
5. Enable SPI (Stateful Packet Inspection)
6. Save and apply changes

## Network Segmentation
Create separate networks for different purposes:
- **Main Network**: Computers and phones
- **Guest Network**: Visitors
- **IoT Network**: Smart devices, cameras
- **Work Network**: Work computers (if working from home)

## Device Security
For each device on your network:
- Update to latest software
- Enable built-in firewalls
- Install security software
- Disable unused services
- Use strong, unique passwords

## Ongoing Maintenance
- Scan weekly for changes
- Review router logs monthly
- Update firmware quarterly
- Full security audit annually

**A secure network is a maintained network!**`,
            duration: 20,
            videoUrl: null
          }
        ]
      },
      {
        id: 5,
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of account security',
        lessons: [
          {
            id: 1,
            title: 'Understanding 2FA',
            content: `# Understanding Two-Factor Authentication 🛡️

Learn why 2FA is essential and how it protects your accounts.

## What is 2FA?
Two-Factor Authentication requires two forms of verification:
1. **Something you know**: Your password
2. **Something you have**: Your phone, security key, or authentication app

## Why 2FA Matters
Even if someone steals your password, they can't access your account without the second factor.

**Real-world scenario:**
- Hacker obtains your password through phishing
- They try to log in from another device
- 2FA blocks them - they need your phone!
- You get an alert about the attempt
- You change your password
- Crisis averted! 🎉

## Types of 2FA

### SMS-Based (Least Secure)
- Codes sent via text message
- Convenient but vulnerable to SIM swapping
- Better than nothing

### Authenticator Apps (Recommended)
- Google Authenticator, Microsoft Authenticator, Authy
- Generates time-based codes
- Works offline
- Much more secure than SMS

### Hardware Keys (Most Secure)
- Physical USB devices (YubiKey, etc.)
- Requires physical possession
- Nearly impossible to phish
- Best for high-security accounts

### Biometric
- Fingerprint, Face ID
- Very convenient
- Good security
- Device-dependent

## When to Use 2FA
Enable 2FA on ALL accounts that support it, especially:
- Email (most important!)
- Banking and financial
- Social media
- Work accounts
- Password managers
- Cloud storage
- Cryptocurrency

**2FA is your safety net when passwords fail!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Setting Up 2FA on CyberSuite',
            content: `# Setting Up 2FA on CyberSuite 🔐

Secure your CyberSuite account with two-factor authentication.

## Step-by-Step Setup

### 1. Install an Authenticator App
Download one of these apps on your phone:
- Google Authenticator (iOS/Android)
- Microsoft Authenticator (iOS/Android)
- Authy (iOS/Android) - recommended for backup features

### 2. Enable 2FA in CyberSuite
1. Go to Settings → Security
2. Click "Enable Two-Factor Authentication"
3. A QR code will appear

### 3. Scan the QR Code
1. Open your authenticator app
2. Tap "Add Account" or "+"
3. Scan the QR code with your phone
4. The app will add CyberSuite to your accounts

### 4. Enter Verification Code
1. Your app will show a 6-digit code
2. Enter this code in CyberSuite
3. Click "Verify and Enable"

### 5. Save Backup Codes
- CyberSuite will show 10 backup codes
- **Download or write these down immediately**
- Store in a safe place (not on your phone!)
- Use if you lose access to your authenticator app

## Testing Your 2FA Setup
1. Log out of CyberSuite
2. Log back in with your username and password
3. You'll be prompted for 2FA code
4. Open authenticator app
5. Enter the current 6-digit code
6. Successfully logged in! ✓

## Important Notes
- Codes change every 30 seconds
- You have a small time window to enter codes
- If code expires, just wait for the next one
- Save your backup codes somewhere safe!

**Your CyberSuite account is now much more secure!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Managing 2FA and Backup Codes',
            content: `# Managing 2FA and Backup Codes 🔑

Learn how to manage your 2FA setup and recover access if needed.

## Using Backup Codes
Backup codes are single-use codes for emergency access.

**When to use them:**
- Lost or broken phone
- Authenticator app deleted
- No cell service
- App not working

**How to use:**
1. On 2FA prompt, click "Use Backup Code"
2. Enter one of your saved backup codes
3. Code is used and becomes invalid
4. Gain access to your account

## Regenerating Backup Codes
If you've used several codes or lost your list:
1. Log into CyberSuite
2. Go to Settings → Security
3. Click "Regenerate Backup Codes"
4. Old codes become invalid
5. Save new codes immediately

## Changing Your Authenticator Device
When getting a new phone:
1. Before wiping old phone: Transfer authenticator app data
   - Google Auth: No built-in transfer
   - Microsoft Auth: Has cloud backup
   - Authy: Automatically syncs to new device
2. Or disable and re-enable 2FA with new device

## Disabling 2FA
Only disable if absolutely necessary:
1. Log into CyberSuite
2. Go to Settings → Security  
3. Click "Disable Two-Factor Authentication"
4. Confirm with password
5. 2FA is turned off

**Warning**: Disabling 2FA makes your account less secure!

## 2FA Best Practices
- Keep backup codes in a safe place
- Use authenticator apps instead of SMS
- Enable 2FA on your email account first
- Don't share 2FA codes with anyone
- Update authentication method when changing devices
- Regularly review enabled devices

## Troubleshooting
**Code not working?**
- Check your phone's time is set to automatic
- Wait for next code cycle
- Try a backup code
- Contact support if still issues

**Lost phone?**
- Use backup codes to access account
- Disable and re-enable 2FA with new device
- Generate new backup codes

**Lost backup codes?**
- If you can still log in: Generate new codes
- If you can't log in: Contact support

**Keep your 2FA setup maintained and accessible!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 4,
            title: '2FA Beyond CyberSuite',
            content: `# 2FA Beyond CyberSuite 🌐

Secure all your online accounts with two-factor authentication.

## Priority Order
Enable 2FA in this order:

### 1. Email Accounts (DO THIS FIRST!)
Why first? Your email is used to reset other passwords.
- Gmail: Settings → Security → 2-Step Verification
- Outlook: Account → Security → Advanced security options
- Yahoo: Account Security → Two-step verification

### 2. Financial Accounts
- Banks
- Credit cards
- PayPal, Venmo
- Investment accounts
- Cryptocurrency exchanges

### 3. Work Accounts
- Company email
- VPN access
- Cloud storage (Google Drive, OneDrive, Dropbox)
- Project management tools

### 4. Social Media
- Facebook: Settings → Security → Two-factor authentication
- Twitter: Settings → Security → Two-factor authentication
- Instagram: Settings → Security → Two-factor authentication
- LinkedIn: Settings → Account → Two-step verification

### 5. Shopping & Services
- Amazon
- eBay
- Other frequent shopping sites

## How to Enable (General Steps)
Most sites follow similar steps:
1. Go to Account Settings
2. Find Security or Privacy section
3. Look for "Two-Factor Auth", "2FA", or "Two-Step Verification"
4. Choose your method (app recommended over SMS)
5. Scan QR code or enter setup key
6. Enter verification code
7. Save backup codes

## Recommended Settings
- **Method**: Authenticator app > SMS > nothing
- **Backup**: Always save backup codes
- **Recovery**: Set up account recovery options
- **Notifications**: Enable login alerts

## Managing Multiple 2FA Accounts
Your authenticator app will list all accounts:
- Organize with recognizable names
- Use the same app for all accounts
- Consider using Authy for multi-device sync
- Keep backup codes organized

## Special Cases

### Apple ID
- Settings → [Your Name] → Password & Security
- Uses trusted devices or phone numbers

### Google Account
- myaccount.google.com → Security → 2-Step Verification
- Can use Google Prompt, authenticator, or SMS

### Microsoft Account
- account.microsoft.com → Security → Advanced security
- Uses Microsoft Authenticator app

## Checking What Has 2FA
Make a checklist:
- [ ] Email accounts
- [ ] Banking
- [ ] Social media
- [ ] Work accounts
- [ ] Shopping sites
- [ ] Cloud storage
- [ ] Other important accounts

Go through each and enable 2FA today!

## Troubleshooting Common Issues
- **Site doesn't offer 2FA**: Consider switching providers
- **SMS not arriving**: Try authenticator app instead
- **Multiple devices**: Use Authy or Microsoft Authenticator
- **Lost codes**: Use backup codes, then regenerate

**Protect every account - enable 2FA everywhere!**`,
            duration: 25,
            videoUrl: null
          }
        ]
      },
      {
        id: 6,
        title: 'Staying Safe Online',
        description: 'Learn to recognize and avoid online threats',
        lessons: [
          {
            id: 1,
            title: 'Recognizing Phishing Attacks',
            content: `# Recognizing Phishing Attacks 🎣

Learn to identify and avoid phishing attempts that try to steal your credentials.

## What is Phishing?
Phishing is when attackers pretend to be legitimate companies to steal your information through fake emails, websites, or messages.

## Common Phishing Tactics

### Email Phishing
**Red flags:**
- Urgent language ("Account will be closed!")
- Generic greetings ("Dear Customer")
- Suspicious sender email (paypa1.com vs paypal.com)
- Requests for passwords or personal info
- Spelling and grammar errors
- Suspicious links

**Example:**
\`\`\`
From: security@bankofamerica-alert.com
Subject: URGENT: Verify your account now!

Dear Customer,

Your account has been compromised. Click here 
immediately to verify your information or your 
account will be closed within 24 hours.
\`\`\`

❌ This is phishing! Real banks:
- Never ask for passwords via email
- Use your name in greetings
- Don't use threatening language
- Send from legitimate domains

### Link Inspection
Before clicking any link:
1. Hover your mouse over it (don't click)
2. Look at the actual URL in the tooltip
3. Check if it matches the claimed destination
4. Look for misspellings in the domain

**Phishing URLs:**
- amaz0n.com (zero instead of o)
- paypa1.com (1 instead of l)
- micros0ft-security.com (fake subdomain)

### SMS Phishing (Smishing)
Text messages claiming:
- Package delivery issues
- Bank alerts
- Prize winnings
- Account problems

Never click links in unexpected text messages!

### Voice Phishing (Vishing)
Phone calls from:
- "Tech support" asking for access
- "IRS" demanding payment
- "Bank" verifying information

Hang up and call the official number yourself.

## How to Verify Legitimacy
1. **Don't use provided links** - Go to website directly
2. **Call official numbers** - From website, not email
3. **Check the URL** - Must be exact, including https://
4. **Look for SSL certificate** - Padlock icon in browser
5. **Verify sender** - Contact company through official channels

## If You Click a Phishing Link
1. **Don't enter any information**
2. **Close the page immediately**
3. **Run antivirus scan**
4. **Change passwords** on accounts mentioned
5. **Monitor accounts** for suspicious activity
6. **Report** to the impersonated company

## Reporting Phishing
- Forward to spam@uce.gov (FTC)
- Report to the impersonated company
- Gmail: Report phishing button
- Outlook: Report phishing button

**When in doubt, go directly to the website or call them!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Social Engineering Awareness',
            content: `# Social Engineering Awareness 🎭

Understand psychological manipulation tactics used by attackers.

## What is Social Engineering?
Manipulating people into revealing confidential information or performing actions that compromise security.

## Common Tactics

### Pretexting
Creating a fabricated scenario to extract information.
**Example:** "Hi, I'm from IT. We need to verify your password for system maintenance."

### Baiting
Offering something enticing to lure victims.
**Example:** Free USB drives left in parking lot (loaded with malware)

### Quid Pro Quo
Offering service in exchange for information.
**Example:** "Free tech support if you give us remote access"

### Tailgating
Following authorized person into restricted area.
**Example:** "Can you hold the door? I forgot my badge"

### Authority
Impersonating someone in power.
**Example:** "This is your CEO. I need you to wire money urgently."

## Protection Strategies

### Verify Identity
- Ask for callback number
- Verify through official channels
- Never trust caller ID (can be spoofed)
- Use company directory to verify

### Question Urgency
If someone creates false urgency:
- Take time to verify
- Consult with colleagues
- Follow normal procedures
- Don't let pressure cloud judgment

### Protect Information
Never share over phone/email:
- Passwords
- Social Security numbers
- Account numbers
- Verification codes
- Company secrets

### Trust Your Instincts
If something feels wrong:
- It probably is
- Pause and verify
- Consult with security team
- Report suspicious contacts

## Real-World Examples

### CEO Fraud
Attacker pretends to be CEO:
"I'm traveling and need you to wire $50,000 immediately for an acquisition. Keep this confidential."

✅ **Correct response:** Verify through another channel before taking any action.

### Tech Support Scam
Caller claims to be from Microsoft:
"Your computer is sending error messages. We need remote access to fix it."

✅ **Correct response:** Hang up. Microsoft never makes unsolicited calls.

### Fake HR
Email from "HR":
"Please click this link to verify your employment information and bank details for payroll."

✅ **Correct response:** Contact HR directly through official channels.

## Training Your Security Awareness
- Question unexpected requests
- Verify before acting
- Follow security procedures
- Report suspicious contacts
- Stay informed about current scams

**People are often the weakest link - stay vigilant!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Safe Browsing Practices',
            content: `# Safe Browsing Practices 🌐

Learn how to browse the internet safely and protect yourself from web-based threats.

## HTTPS vs HTTP

### Always Use HTTPS
- **HTTP**: Unencrypted - anyone can read your data
- **HTTPS**: Encrypted - data is protected
- Look for padlock icon in address bar
- Never enter passwords on HTTP sites

## Checking Website Security

### URL Inspection
Before entering sensitive info:
1. Check for https:// (not http://)
2. Look for green padlock
3. Verify exact domain name
4. Check SSL certificate (click padlock)

### Warning Signs
- Mixed content warnings
- Certificate errors or warnings
- Misspelled domain names
- Unusual URL structure
- Pop-ups requesting credentials

## Browser Security Settings

### Essential Settings
- Enable pop-up blocker
- Clear cookies regularly
- Use private/incognito for sensitive browsing
- Disable auto-fill for passwords
- Keep browser updated

### Privacy Extensions
Consider installing:
- uBlock Origin (ad/tracker blocker)
- HTTPS Everywhere (forces HTTPS)
- Privacy Badger (blocks trackers)
- Password manager extension

## Download Safety

### Safe Downloading
- Only download from official sources
- Verify file checksums when available
- Scan downloads with antivirus
- Be cautious of .exe files
- Check file extensions (avoid .exe.pdf tricks)

### Dangerous File Types
Be extra careful with:
- .exe (executables)
- .bat, .cmd (batch files)
- .scr (screen savers)
- .msi (installers)
- Office files with macros

## Public WiFi Safety

### Risks of Public WiFi
- Unencrypted connections
- Man-in-the-middle attacks
- Rogue access points
- Session hijacking

### Staying Safe on Public WiFi
1. **Use VPN** - Encrypts all traffic
2. **Verify network name** - Confirm with staff
3. **Avoid sensitive transactions** - No banking on public WiFi
4. **Disable auto-connect** - Manually choose networks
5. **Use cellular when possible** - More secure than public WiFi
6. **Enable firewall** - Extra protection
7. **Forget network after use** - Prevent auto-reconnect

## Safe Browsing Habits
- Don't click suspicious links
- Verify before downloading
- Log out when finished
- Clear browser data regularly
- Use different browsers for different purposes
- Enable click-to-play for plugins

## Website Reputation
Check before visiting unfamiliar sites:
- Google the site name + "scam" or "reviews"
- Check site age (use whois lookup)
- Look for contact information
- Verify SSL certificate details
- Use URL scanners (VirusTotal, URLVoid)

**Safe browsing is a habit - make it automatic!**`,
            duration: 25,
            videoUrl: null
          },
          {
            id: 4,
            title: 'Building Security Habits',
            content: `# Building Security Habits 🎯

Create lasting security habits that protect you every day.

## Daily Security Checklist

### Morning (5 minutes)
- [ ] Check notification for unusual logins
- [ ] Review any security alerts
- [ ] Verify scheduled scans ran
- [ ] Check backup status

### Throughout the Day
- [ ] Use password manager for all logins
- [ ] Verify URLs before entering credentials
- [ ] Think before clicking links
- [ ] Lock computer when leaving desk
- [ ] Use secure connections (HTTPS, VPN)

### Evening (5 minutes)
- [ ] Log out of accounts
- [ ] Clear browser data if using shared computer
- [ ] Check CyberSuite for any alerts
- [ ] Review the day's security decisions

## Weekly Security Tasks (30 minutes)

### Every Week
- [ ] Run full network scan
- [ ] Review new passwords added
- [ ] Check for weak passwords
- [ ] Update at least one old password
- [ ] Review file vault uploads
- [ ] Check for software updates
- [ ] Review login notifications

## Monthly Security Tasks (1 hour)

### First of Month
- [ ] Full password audit
- [ ] Update 3-5 old passwords
- [ ] Review all credentials categories
- [ ] Check 2FA status on all accounts
- [ ] Review and organize file vault
- [ ] Update software and firmware
- [ ] Review security settings
- [ ] Backup important files
- [ ] Clean up old accounts

## Quarterly Security Tasks (2-3 hours)

### Every 3 Months
- [ ] Comprehensive password audit
- [ ] Update all moderate/weak passwords
- [ ] Review and remove old credentials
- [ ] Deep clean file vault
- [ ] Test backup restoration
- [ ] Review all security settings
- [ ] Update network security
- [ ] Regenerate 2FA backup codes
- [ ] Security awareness training review

## Annual Security Tasks (4-5 hours)

### Once Per Year
- [ ] Change master password
- [ ] Update ALL passwords
- [ ] Full security audit
- [ ] Review and close old accounts
- [ ] Update emergency access procedures
- [ ] Review and update will/estate planning for digital assets
- [ ] Train family members on security basics
- [ ] Donate to security tools/organizations you use

## Security Decision Framework

### Before Any Action, Ask:
1. **Is this legitimate?** - Verify sender/source
2. **Is this urgent?** - Beware of pressure tactics
3. **What information am I sharing?** - Minimize exposure
4. **Is this connection secure?** - Check HTTPS
5. **What's the worst that could happen?** - Risk assessment

## Building Muscle Memory

### Automatic Responses
Train yourself to:
- Hover before clicking
- Check URL before entering credentials
- Use password manager, not memory
- Enable 2FA on every account
- Question unexpected requests
- Verify before trusting

## Teaching Others
Share security knowledge:
- Help family with password managers
- Show friends how to spot phishing
- Teach colleagues about 2FA
- Share security tips on social media
- Be the security-conscious friend

## Staying Current

### Keep Learning
- Follow security news
- Subscribe to security blogs
- Take refresher courses
- Learn about new threats
- Update your security practices

### Resources
- KrebsOnSecurity blog
- The Hacker News
- SANS Internet Storm Center
- Your company's security team
- CyberSuite education updates

## Motivation and Accountability

### Stay Motivated
- Set calendar reminders
- Gamify your security tasks
- Track improvements
- Celebrate milestones
- Join security communities

### Accountability
- Security buddy system
- Family security check-ins
- Team security challenges
- Share progress (not passwords!)

## Emergency Preparedness

### Have a Plan For:
- Lost/stolen devices
- Compromised accounts
- Data breaches
- Ransomware attacks
- Identity theft

### Emergency Kit
Keep accessible but secure:
- Master password (written, in safe)
- 2FA backup codes
- Recovery keys
- Important contacts
- Account numbers (encrypted)

## Congratulations! 🎉

You've completed the CyberSuite Security Essentials course!

**You now know how to:**
✅ Create and manage strong passwords
✅ Encrypt and protect sensitive files
✅ Scan and secure your network
✅ Enable two-factor authentication
✅ Recognize and avoid online threats
✅ Build lasting security habits

**Keep practicing these skills daily. Security is a journey, not a destination!**

**Next steps:**
- Apply everything you've learned
- Take the advanced courses
- Help others stay secure
- Keep learning and improving

**Stay safe online! 🛡️**`,
            duration: 30,
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
    duration: '3 hours',
    icon: 'Lock',
    modules: [
      {
        id: 1,
        title: 'Understanding File Encryption',
        description: 'Learn why and how encryption protects your files',
        lessons: [
          {
            id: 1,
            title: 'Why Encrypt Files?',
            content: `# Why Encrypt Files? 🔐

Discover why file encryption is essential in today's digital world.

## Real-World Scenarios

**Stolen Laptop:** Without encryption, thieves have access to all your files. With encryption, files are unreadable.

**Ransomware:** Encrypted backups can't be encrypted again by ransomware. Your data stays safe.

**Cloud Breaches:** Even if cloud storage is hacked, encrypted files remain protected.

## What to Encrypt
- Financial documents
- Personal identification
- Medical records
- Legal documents
- Business files
- Private photos/videos

## CyberSuite Protection
Files are encrypted with AES-256-GCM before storage:
- Military-grade security
- Unbreakable with current technology
- Automatic encryption on upload
- Easy decryption on download

**Protect your digital life - encrypt everything important!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'How Encryption Works',
            content: `# How Encryption Works 🔬

Understand the science behind file encryption in simple terms.

## Encryption Basics
Encryption converts readable files into unreadable code using complex mathematics.

**Plain text:** "My bank account number is 123456789"
**Encrypted:** "8f3a9c2b7d1e6h4j5k9m0p2q8r3s7t1u5v9w3x7y..."

## AES-256-GCM Explained
CyberSuite uses Advanced Encryption Standard with 256-bit keys:
- **AES**: Trusted by US Government, banks, military
- **256-bit**: 2^256 possible keys (practically unbreakable)
- **GCM**: Guarantees file hasn't been tampered with

## Encryption Process
1. You select a file to upload
2. CyberSuite generates unique encryption key
3. File is encrypted on your device
4. Encrypted file is uploaded to storage
5. Original file never leaves your control

## Decryption Process
1. You request file download
2. CyberSuite retrieves encrypted file
3. File is decrypted using your key
4. Original file is restored
5. Save to your device

## Why It's Secure
- Encryption happens on YOUR device
- Keys are derived from your master password
- Even CyberSuite can't decrypt your files
- Brute force would take billions of years

**Your files are protected by mathematics!**`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Encryption Best Practices',
            content: `# Encryption Best Practices ✨

Learn how to use encryption effectively for maximum security.

## What to Encrypt

### High Priority
- Tax documents and financial records
- Passports and identification scans
- Medical and health records
- Legal contracts and agreements
- Business proprietary information
- Private photographs and videos

### Medium Priority
- Resumes with personal information
- School and employment records
- Certificates and licenses
- Travel documents

### Not Necessary
- Public documents
- Already published content
- Temporary files
- Non-sensitive media

## When to Encrypt
- **Before uploading to cloud**
- **Before sending via email**
- **Before storing on external drives**
- **When storing on shared computers**
- **For any sensitive information**

## Password Protection
Your encryption is only as strong as your password:
- Use strong master password (16+ characters)
- Never share your password
- Store password safely (password manager)
- Change if ever compromised

## Backup Strategies
Encrypted files still need backups:
- Keep 3 copies (original + 2 backups)
- Store backups in different locations
- Test backups regularly
- Include encryption keys in emergency kit

## Key Management
- Never lose your master password (files become unrecoverable)
- Store backup codes safely
- Include in digital estate planning
- Have emergency access plan

**Encryption protects you - use it wisely!**`,
            duration: 15,
            videoUrl: null
          }
        ]
      },
      {
        id: 2,
        title: 'File Vault Operations',
        description: 'Master the CyberSuite File Vault',
        lessons: [
          {
            id: 1,
            title: 'Uploading and Organizing Files',
            content: `# Uploading and Organizing Files 📤

Master file uploads and organization in CyberSuite File Vault.

## Upload Methods
1. **Drag and Drop**: Drag files into the vault area
2. **Upload Button**: Click "Upload" and browse for files
3. **Bulk Upload**: Select multiple files at once

## File Organization
- Use categories: Documents, Images, Videos, Archives
- Add descriptive names
- Include relevant tags
- Add notes for context
- Set up logical folder structure

## Best Practices
- Upload immediately after creation
- Organize as you upload
- Remove old versions
- Regular vault maintenance
- Keep descriptions updated

**An organized vault is an efficient vault!**`,
            duration: 15,
            videoUrl: null
          }
        ]
      }
    ]
  },
  {
    courseId: 'network-security-basics',
    title: 'Network Security & Scanner Guide',
    description: 'Learn how to scan your network for vulnerabilities and implement proper security measures.',
    level: 'Intermediate',
    duration: '4 hours',
    icon: 'Wifi',
    modules: [
      {
        id: 1,
        title: 'Network Security Fundamentals',
        description: 'Understanding network security concepts',
        lessons: [
          {
            id: 1,
            title: 'Network Security Basics',
            content: `# Network Security Basics 🌐

Learn the fundamentals of network security and why it matters.

## Your Home Network
Understanding your network is the first step to securing it:
- Router (gateway to internet)
- Devices (computers, phones, smart home)
- Connections (WiFi, ethernet)
- Services (what's accessible from internet)

## Common Threats
- **Port Scanning**: Attackers looking for open doors
- **Weak Passwords**: Default router credentials
- **Outdated Software**: Unpatched vulnerabilities
- **Unsecured Services**: Open FTP, Telnet, etc.

## The CyberSuite Scanner
Scan your network to:
- Identify open ports
- Find vulnerable services
- Detect unauthorized devices
- Monitor security posture

## Why Regular Scanning Matters
- Catch problems before attackers do
- Maintain security compliance
- Document your security stance
- Peace of mind

**Know your network, secure your network!**`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Understanding Ports and Services',
            content: `# Understanding Ports and Services 🔌

Learn what ports are and which ones pose security risks.

## What are Ports?
Think of your network like an apartment building:
- IP address = building address
- Ports = individual apartment numbers
- Services = residents in each apartment

## Common Ports
- **Port 80** (HTTP): Web servers
- **Port 443** (HTTPS): Secure web servers
- **Port 22** (SSH): Secure remote access
- **Port 3389** (RDP): Remote Desktop
- **Port 21** (FTP): File transfer
- **Port 23** (Telnet): DANGEROUS! Unencrypted remote access

## Risk Levels
🚨 **Critical**: Close immediately (Telnet, FTP)
⚠️ **High**: Secure properly (RDP, databases)
✅ **Normal**: Usually safe (HTTPS)

## What the Scanner Checks
CyberSuite scans 20 most common ports to identify:
- Which ports are open
- What services are running
- Potential security risks
- Recommended actions

**Know your ports, know your risks!**`,
            duration: 20,
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
      course.modules.forEach(mod => {
        console.log(`      Module ${mod.id}: ${mod.title} (${mod.lessons.length} lessons)`);
      });
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
