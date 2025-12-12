const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const coursesData = [
  {
    courseId: 'cyber-fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the basics of cybersecurity, threats, and protection methods essential for anyone working with digital systems.',
    level: 'Beginner',
    duration: '4 hours',
    icon: 'Shield',
    modules: [
      {
        id: 1,
        title: 'Introduction to Cybersecurity',
        description: 'Understanding the landscape of cybersecurity',
        lessons: [
          {
            id: 1,
            title: 'What is Cybersecurity?',
            content: `# What is Cybersecurity?

## Overview
Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes.

## Why is Cybersecurity Important?
- **Data Protection**: Protects sensitive information from unauthorized access
- **Business Continuity**: Prevents disruptions to operations
- **Financial Security**: Protects against monetary loss
- **Reputation**: Maintains trust with customers and partners

## Key Principles (CIA Triad)
1. **Confidentiality**: Ensuring information is accessible only to authorized users
2. **Integrity**: Maintaining accuracy and completeness of data
3. **Availability**: Ensuring systems are accessible when needed

## Types of Cybersecurity
- Network Security
- Application Security
- Information Security
- Operational Security
- Disaster Recovery and Business Continuity

## Common Threats
- Malware
- Phishing
- Ransomware
- Social Engineering
- DDoS Attacks`,
            duration: 15,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Common Cyber Threats',
            content: `# Common Cyber Threats

## Malware
Malicious software designed to harm or exploit devices, services, or networks.

### Types of Malware:
- **Viruses**: Attach to clean files and spread
- **Trojans**: Disguise as legitimate software
- **Worms**: Self-replicate and spread across networks
- **Spyware**: Secretly observes user activity
- **Ransomware**: Encrypts files and demands payment

## Phishing
Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.

### How to Identify Phishing:
- Suspicious sender email addresses
- Urgent or threatening language
- Requests for personal information
- Poor grammar and spelling
- Unexpected attachments or links

## Social Engineering
Manipulating people into breaking security procedures or divulging confidential information.

### Common Tactics:
- **Pretexting**: Creating false scenarios
- **Baiting**: Offering something enticing
- **Quid Pro Quo**: Offering service for information
- **Tailgating**: Physical unauthorized access

## DDoS Attacks
Overwhelming systems with traffic to make them unavailable.

## Man-in-the-Middle (MitM)
Intercepting communication between two parties without their knowledge.

## Prevention Best Practices:
1. Stay informed about current threats
2. Use security software and keep it updated
3. Be skeptical of unsolicited communications
4. Verify identities before sharing information
5. Report suspicious activity immediately`,
            duration: 20,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Password Security Best Practices',
            content: `# Password Security Best Practices

## Why Password Security Matters
Passwords are the first line of defense. Weak passwords are one of the easiest ways for attackers to gain unauthorized access.

## Creating Strong Passwords

### Characteristics of Strong Passwords:
- **Length**: Minimum 12 characters (longer is better)
- **Complexity**: Mix of uppercase, lowercase, numbers, and symbols
- **Unpredictability**: Avoid dictionary words and personal information
- **Uniqueness**: Different password for each account

### Example Strong Password:
\`\`\`
Tr0pic@lT3mp3st!92$Moon
\`\`\`

## Password Don'ts ❌
- Don't use personal information (birthdays, names, addresses)
- Don't reuse passwords across multiple accounts
- Don't share passwords with anyone
- Don't write passwords on sticky notes
- Don't use common passwords like "password123"

## Password Management

### Use a Password Manager
- **Benefits**:
  - Generates strong, unique passwords
  - Securely stores all passwords
  - Auto-fills login forms
  - Encrypts your password database

### Recommended Password Managers:
- Bitwarden (Open Source)
- 1Password
- LastPass
- Dashlane

## Two-Factor Authentication (2FA)
Always enable 2FA when available. It adds an extra layer of security beyond just passwords.

### Types of 2FA:
1. **SMS Codes**: Text message verification
2. **Authenticator Apps**: TOTP codes (Google Authenticator, Authy)
3. **Hardware Keys**: Physical USB devices (YubiKey)
4. **Biometric**: Fingerprint or facial recognition

## Password Reset Security
- Use security questions with non-obvious answers
- Verify password reset emails carefully
- Change passwords immediately if you suspect compromise

## Regular Password Hygiene
- Change passwords every 3-6 months for sensitive accounts
- Immediately update compromised passwords
- Audit old accounts and close unused ones
- Check if your passwords have been breached using services like HaveIBeenPwned`,
            duration: 25,
            videoUrl: null
          },
          {
            id: 4,
            title: 'Secure Browsing Practices',
            content: `# Secure Browsing Practices

## HTTPS vs HTTP
Always look for the padlock icon (🔒) in your browser's address bar.

### HTTPS Benefits:
- Encrypts data in transit
- Verifies website authenticity
- Protects against eavesdropping
- Required for secure transactions

## Browser Security Settings

### Enable These Features:
1. **Pop-up Blocker**: Prevents malicious pop-ups
2. **Tracking Protection**: Blocks tracking cookies
3. **Safe Browsing**: Warns about dangerous sites
4. **Automatic Updates**: Keeps browser secure
5. **Password Manager**: Built-in or extension

### Disable These:
- Auto-download of files
- Remember passwords for sensitive sites
- Location sharing on untrusted sites

## Private Browsing
Use incognito/private mode for:
- Public computers
- Shared devices
- Sensitive transactions
- Testing websites

**Note**: Private mode doesn't make you anonymous to websites or ISPs.

## Browser Extensions Safety

### Trusted Extensions:
- uBlock Origin (Ad blocker)
- HTTPS Everywhere (Force HTTPS)
- Privacy Badger (Tracker blocker)
- Bitwarden (Password manager)

### Extension Security Tips:
- Only install from official stores
- Check permissions carefully
- Read reviews before installing
- Remove unused extensions
- Keep extensions updated

## Avoiding Malicious Websites

### Warning Signs:
- Suspicious URLs (typos, extra characters)
- Unsolicited pop-ups
- Requests for unnecessary personal information
- Too-good-to-be-true offers
- Poor website design or numerous ads

## Public Wi-Fi Security
- Avoid accessing sensitive accounts
- Use a VPN (Virtual Private Network)
- Turn off file sharing
- Forget network after use
- Enable firewall

## Cookie Management
- Regularly clear cookies and cache
- Block third-party cookies
- Use cookie auto-delete extensions
- Review site permissions

## Download Safety
1. Only download from trusted sources
2. Verify file integrity (checksums)
3. Scan downloads with antivirus
4. Be wary of .exe files from unknown sources
5. Check file extensions carefully`,
            duration: 20,
            videoUrl: null
          }
        ]
      },
      {
        id: 2,
        title: 'Data Protection',
        description: 'Learn how to protect your sensitive information',
        lessons: [
          {
            id: 1,
            title: 'Encryption Basics',
            content: `# Encryption Basics

## What is Encryption?
Encryption is the process of encoding information so that only authorized parties can access it. It converts readable data (plaintext) into an unreadable format (ciphertext).

## Why Encrypt Data?

### Benefits:
- **Confidentiality**: Keeps data private
- **Integrity**: Detects tampering
- **Authentication**: Verifies identity
- **Non-repudiation**: Proves origin

## Types of Encryption

### 1. Symmetric Encryption
Uses the same key for encryption and decryption.

**Algorithms**: AES, DES, 3DES, Blowfish

**Pros**:
- Fast and efficient
- Good for large data volumes
- Less computational overhead

**Cons**:
- Key distribution challenge
- Key must remain secret

**Use Cases**: File encryption, database encryption

### 2. Asymmetric Encryption
Uses a pair of keys: public key (encryption) and private key (decryption).

**Algorithms**: RSA, ECC, ElGamal

**Pros**:
- Secure key exchange
- Digital signatures
- No shared secret needed

**Cons**:
- Slower than symmetric
- More complex

**Use Cases**: SSL/TLS, email encryption, digital signatures

## Common Encryption Standards

### AES (Advanced Encryption Standard)
- **Key Sizes**: 128, 192, 256 bits
- **Status**: Current standard
- **Security**: Very secure when properly implemented
- **Usage**: Governments, banks, secure communications

### RSA (Rivest-Shamir-Adleman)
- **Key Sizes**: 2048, 3072, 4096 bits
- **Type**: Asymmetric
- **Usage**: Digital signatures, key exchange

## Hashing vs Encryption

### Hashing:
- One-way function
- Cannot be reversed
- Fixed output size
- Used for: passwords, integrity verification

**Algorithms**: SHA-256, SHA-3, bcrypt, Argon2

### Encryption:
- Two-way function
- Can be reversed with key
- Variable output size
- Used for: data protection, secure communication

## Practical Encryption Applications

### Full Disk Encryption (FDE):
- **Windows**: BitLocker
- **macOS**: FileVault
- **Linux**: LUKS

### File/Folder Encryption:
- 7-Zip with AES-256
- VeraCrypt
- Cryptomator

### Communication Encryption:
- Signal (End-to-end encryption)
- WhatsApp (E2EE)
- ProtonMail (Email encryption)

## Encryption Best Practices

1. **Use Strong Algorithms**: AES-256, RSA-2048+
2. **Protect Keys**: Store securely, never hardcode
3. **Use Random IVs**: For symmetric encryption
4. **Update Regularly**: Replace deprecated algorithms
5. **Encrypt in Transit & at Rest**: Comprehensive protection
6. **Use Certified Libraries**: Don't implement crypto yourself

## Encryption Pitfalls to Avoid

❌ **Don't**:
- Use ECB mode for symmetric encryption
- Reuse keys or IVs
- Store keys with encrypted data
- Use MD5 or SHA-1 for security
- Implement your own crypto algorithms

## Real-World Example: HTTPS

When you visit a secure website:
1. Your browser requests the site's public key
2. Browser verifies the SSL certificate
3. Browser generates a session key
4. Session key is encrypted with public key
5. All communication uses encrypted session key
6. Connection is secure end-to-end

## Quantum Computing Threat

Current encryption may become vulnerable to quantum computers. Organizations are developing post-quantum cryptography (PQC) to address this future threat.`,
            duration: 30,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Data Backup Strategies',
            content: `# Data Backup Strategies

## The 3-2-1 Backup Rule

### Rule Breakdown:
- **3**: Keep 3 copies of your data
- **2**: Store backups on 2 different media types
- **1**: Keep 1 backup copy offsite

## Types of Backups

### 1. Full Backup
Complete copy of all data.

**Pros**: Complete restoration, simple
**Cons**: Time-consuming, large storage needed
**When**: Weekly or monthly

### 2. Incremental Backup
Only backs up changes since last backup.

**Pros**: Fast, efficient storage
**Cons**: Complex restoration
**When**: Daily

### 3. Differential Backup
Backs up changes since last full backup.

**Pros**: Faster than full, simpler restoration than incremental
**Cons**: Grows until next full backup
**When**: Daily or weekly

## Backup Storage Solutions

### Local Backups:
- External hard drives
- NAS (Network Attached Storage)
- USB flash drives (for smaller data)

### Cloud Backups:
- Google Drive
- Microsoft OneDrive
- Dropbox
- Backblaze
- AWS S3

### Hybrid Approach (Recommended):
Combine local and cloud for redundancy

## Automated Backup Tools

### Windows:
- Windows Backup
- Acronis True Image
- EaseUS Todo Backup

### macOS:
- Time Machine (built-in)
- Carbon Copy Cloner
- Super Duper

### Cross-Platform:
- Duplicati (Free, Open Source)
- Restic
- Rclone

## Backup Best Practices

1. **Automate**: Set up scheduled backups
2. **Verify**: Regularly test restorations
3. **Encrypt**: Protect sensitive backups
4. **Version**: Keep multiple versions
5. **Document**: Maintain backup procedures
6. **Monitor**: Check backup logs
7. **Secure**: Protect backup credentials

## What to Back Up

### Critical Data:
- Personal documents
- Photos and videos
- Financial records
- Work files
- System configurations
- Application data
- Email archives

### Don't Forget:
- Browser bookmarks
- Application licenses
- 2FA backup codes
- Password manager database

## Disaster Recovery Plan

1. **Assess Risks**: Identify potential threats
2. **Prioritize Data**: What's most critical?
3. **Set RPO/RTO**: 
   - RPO: Recovery Point Objective (data loss tolerance)
   - RTO: Recovery Time Objective (downtime tolerance)
4. **Document Procedures**: Step-by-step recovery
5. **Test Regularly**: Practice restoration
6. **Update Plan**: Review quarterly

## Common Backup Mistakes

❌ **Avoid**:
- Relying on a single backup
- Not testing restorations
- Storing backups in same location as originals
- Ignoring encryption
- Irregular backup schedules
- Not backing up phones/tablets
- Forgetting about cloud service limits`,
            duration: 25,
            videoUrl: null
          }
        ]
      }
    ]
  },
  {
    courseId: 'network-security',
    title: 'Network Security Essentials',
    description: 'Understanding network protocols, firewalls, and secure architectures to protect digital communications.',
    level: 'Intermediate',
    duration: '6 hours',
    icon: 'Wifi',
    modules: [
      {
        id: 1,
        title: 'Network Fundamentals',
        description: 'Core networking concepts',
        lessons: [
          {
            id: 1,
            title: 'TCP/IP Protocol Suite',
            content: `# TCP/IP Protocol Suite

## The OSI Model vs TCP/IP Model

### OSI Model (7 Layers):
1. **Physical**: Hardware, cables, signals
2. **Data Link**: MAC addresses, switches
3. **Network**: IP addresses, routing
4. **Transport**: TCP/UDP, ports
5. **Session**: Connection management
6. **Presentation**: Data formatting, encryption
7. **Application**: HTTP, FTP, DNS

### TCP/IP Model (4 Layers):
1. **Network Access**: Physical + Data Link
2. **Internet**: IP routing
3. **Transport**: TCP/UDP
4. **Application**: All application protocols

## Common Protocols

### Transport Layer:
- **TCP** (Transmission Control Protocol)
  - Connection-oriented
  - Reliable delivery
  - Error checking
  - Used by: HTTP, HTTPS, FTP, SSH

- **UDP** (User Datagram Protocol)
  - Connectionless
  - Fast but unreliable
  - No error correction
  - Used by: DNS, VoIP, streaming

### Application Layer:
- **HTTP/HTTPS**: Web traffic (80/443)
- **FTP**: File transfer (20/21)
- **SSH**: Secure shell (22)
- **DNS**: Name resolution (53)
- **SMTP**: Email sending (25)
- **POP3/IMAP**: Email receiving (110/143)

## IP Addressing

### IPv4:
- 32-bit addresses
- Format: 192.168.1.1
- ~4.3 billion addresses
- Exhausted in most regions

### IPv6:
- 128-bit addresses
- Format: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- 340 undecillion addresses
- Future of internet addressing

### Private IP Ranges:
- Class A: 10.0.0.0 to 10.255.255.255
- Class B: 172.16.0.0 to 172.31.255.255
- Class C: 192.168.0.0 to 192.168.255.255

## Subnetting
Dividing networks into smaller segments for security and efficiency.

### Benefits:
- Reduces broadcast traffic
- Improves security (segregation)
- Efficient IP address allocation
- Better network management

## Network Security Concepts

### Defense in Depth:
Multiple layers of security controls

### Segmentation:
Dividing network into zones based on trust levels

### Zero Trust:
"Never trust, always verify" - No implicit trust

## Common Network Attacks

1. **Packet Sniffing**: Intercepting network traffic
2. **IP Spoofing**: Faking source IP addresses
3. **ARP Poisoning**: Manipulating address resolution
4. **DNS Spoofing**: Redirecting domain lookups
5. **Man-in-the-Middle**: Intercepting communications

## Network Monitoring Tools

- **Wireshark**: Packet analysis
- **tcpdump**: Command-line packet capture
- **Nmap**: Network scanner
- **Netstat**: Connection statistics
- **iptables**: Linux firewall`,
            duration: 35,
            videoUrl: null
          },
          {
            id: 2,
            title: 'Firewalls and VPNs',
            content: `# Firewalls and VPNs

## Firewalls

### What is a Firewall?
A security system that monitors and controls network traffic based on predetermined security rules.

### Types of Firewalls:

#### 1. Packet-Filtering Firewalls
- Examines packet headers
- Filters based on: IP, port, protocol
- Fast but limited inspection

#### 2. Stateful Inspection Firewalls
- Tracks connection state
- More intelligent filtering
- Better security than packet-filtering

#### 3. Application-Layer Firewalls (WAF)
- Inspects application data
- Understands protocols (HTTP, FTP)
- Can detect application-level attacks

#### 4. Next-Generation Firewalls (NGFW)
- All above features plus:
- Intrusion Prevention System (IPS)
- Deep packet inspection
- Application awareness
- SSL/TLS inspection

### Firewall Rules Best Practices:

1. **Default Deny**: Block everything, allow only necessary
2. **Least Privilege**: Minimal access required
3. **Specific Rules**: Avoid overly broad permissions
4. **Regular Review**: Audit and update rules
5. **Logging**: Monitor all blocked attempts

### Example Firewall Rules:
\`\`\`
# Allow HTTP and HTTPS
ALLOW TCP FROM any TO webserver:80,443

# Allow SSH from admin network only
ALLOW TCP FROM 192.168.1.0/24 TO any:22

# Block all other incoming
DENY TCP FROM any TO any

# Allow all outgoing
ALLOW TCP FROM internal TO any
\`\`\`

## VPNs (Virtual Private Networks)

### What is a VPN?
Creates an encrypted tunnel between your device and VPN server, hiding your internet activity.

### VPN Benefits:
- **Privacy**: Hides IP address and location
- **Security**: Encrypts all internet traffic
- **Access**: Bypass geo-restrictions
- **Remote Access**: Secure connection to corporate networks

### VPN Protocols:

#### OpenVPN:
- Open-source
- Very secure
- Flexible
- Good performance

#### WireGuard:
- Modern protocol
- Faster than OpenVPN
- Simpler codebase
- Growing adoption

#### IPSec:
- Industry standard
- Built into many devices
- Complex configuration
- Very secure when properly configured

#### L2TP/IPSec:
- Good compatibility
- Decent security
- Slower than others

#### PPTP (Avoid):
- Old protocol
- Known vulnerabilities
- Not recommended

### VPN Types:

#### 1. Remote Access VPN
- Individual users to network
- Work from home scenarios
- Client software required

#### 2. Site-to-Site VPN
- Connects entire networks
- Branch offices to headquarters
- Router-to-router connection

#### 3. SSL VPN
- Browser-based access
- No client software needed
- Limited functionality

### Choosing a VPN Service:

**Look For**:
- No-logs policy
- Strong encryption (AES-256)
- Kill switch feature
- Multiple server locations
- Good speeds
- Reputable company

**Red Flags**:
- Free VPNs (usually sell your data)
- Based in 5/9/14 Eyes countries
- Poor reviews
- Keeps extensive logs

### Setting Up a Personal VPN:

**Options**:
1. Use a VPN service (ExpressVPN, NordVPN, ProtonVPN)
2. Set up your own (WireGuard on a cloud server)
3. Use your router's built-in VPN

## Combining Firewalls and VPNs

### Corporate Network Setup:
\`\`\`
Internet → Firewall → VPN Gateway → Internal Network
\`\`\`

### Personal Security Stack:
1. Router firewall (hardware)
2. Computer firewall (software)
3. VPN for all traffic
4. Antivirus/antimalware

## Common Misconfigurations

❌ **Avoid**:
- Leaving default firewall rules
- Opening unnecessary ports
- Using weak VPN protocols
- Not updating firewall firmware
- Allowing split-tunneling without need
- Trusting free VPN services`,
            duration: 30,
            videoUrl: null
          },
          {
            id: 3,
            title: 'Wireless Network Security',
            content: `# Wireless Network Security

## Wi-Fi Security Protocols

### WEP (Wired Equivalent Privacy) ❌
- **Status**: OBSOLETE - DO NOT USE
- **Encryption**: RC4
- **Key**: 64 or 128 bit
- **Weakness**: Easily cracked in minutes
- **Recommendation**: Disable immediately

### WPA (Wi-Fi Protected Access)
- **Status**: Deprecated
- **Encryption**: TKIP
- **Key**: 256 bit
- **Weakness**: Vulnerable to attacks
- **Recommendation**: Upgrade to WPA2/WPA3

### WPA2 (Current Standard)
- **Status**: Widely used, secure when properly configured
- **Encryption**: AES (CCMP)
- **Modes**: Personal (PSK) and Enterprise (802.1X)
- **Weakness**: Vulnerable to KRACK attack (patched)

### WPA3 (Latest Standard)
- **Status**: Most secure, gradually replacing WPA2
- **Improvements**:
  - Stronger encryption (192-bit)
  - Protection against offline dictionary attacks
  - Forward secrecy
  - Easier IoT device setup (WPA3-Easy Connect)
- **Recommendation**: Use if available

## Securing Your Wi-Fi Network

### Router Security Checklist:

1. **Change Default Credentials**
   - Admin username and password
   - Never use default "admin/admin"

2. **Use Strong Wi-Fi Password**
   - Minimum 16 characters
   - Mix of characters, numbers, symbols
   - Unique, not used elsewhere

3. **Enable WPA3 or WPA2**
   - Disable WEP and WPA
   - Use AES encryption only

4. **Hide SSID (Optional)**
   - Doesn't prevent attacks but reduces visibility
   - May cause compatibility issues

5. **Disable WPS**
   - Convenient but vulnerable
   - Can be brute-forced easily

6. **Update Router Firmware**
   - Check manufacturer site regularly
   - Enable auto-updates if available

7. **Use Strong Admin Password**
   - Separate from Wi-Fi password
   - Disable remote admin access

8. **Enable Firewall**
   - Most routers have built-in firewall
   - Configure to block incoming connections

9. **Disable UPnP**
   - Potential security risk
   - Enable only if specifically needed

10. **Set Up Guest Network**
    - Separate network for visitors
    - Isolate from main network
    - Use different password

## MAC Address Filtering

**How it works**: Only allows specific device MAC addresses

**Pros**:
- Additional layer of security
- Control which devices connect

**Cons**:
- MAC addresses can be spoofed
- Management overhead
- Not a substitute for strong encryption

**Recommendation**: Use as supplement, not primary security

## Rogue Access Point Detection

### What is a Rogue AP?
Unauthorized wireless access point connected to your network

### Detection Methods:
- Network scanning tools
- Wireless IDS (Intrusion Detection System)
- Physical walkthroughs
- Router's connected devices list

### Prevention:
- Physical security of network ports
- 802.1X authentication
- Regular network audits
- Employee education

## Public Wi-Fi Security

### Risks:
- **Man-in-the-Middle attacks**: Interception of data
- **Evil Twin attacks**: Fake access points
- **Packet sniffing**: Capturing unencrypted traffic
- **Malware distribution**: Compromised networks

### Protection Measures:

1. **Use a VPN** (Most Important!)
   - Encrypts all traffic
   - Hides activity from attackers

2. **Verify Network Name**
   - Ask staff for official name
   - Avoid generic names like "Free WiFi"

3. **Disable Auto-Connect**
   - Prevents connecting to suspicious networks
   - Manual connection preferred

4. **Use HTTPS Only**
   - Check for padlock in browser
   - Use browser extensions (HTTPS Everywhere)

5. **Turn Off Sharing**
   - File and printer sharing
   - AirDrop (iOS/macOS)
   - Make network "Public" not "Home"

6. **Enable Firewall**
   - OS firewall should be active
   - Extra protection layer

7. **Forget Network After Use**
   - Prevents auto-reconnection
   - Reduces risk

### What to Avoid on Public Wi-Fi:
❌ Banking transactions
❌ Accessing sensitive work data
❌ Entering passwords (without VPN)
❌ Online shopping
❌ Any unencrypted activities

## Home Network Segmentation

### VLAN Setup Example:
\`\`\`
VLAN 10: Primary (computers, phones)
VLAN 20: IoT devices (smart home)
VLAN 30: Guest network
VLAN 40: Work devices (if WFH)
\`\`\`

**Benefits**:
- Isolates IoT devices (often insecure)
- Protects main network from compromised guests
- Separates work and personal devices

## Wireless Attack Types

### 1. Deauthentication Attack
- Disconnects users from network
- Used to capture handshakes for cracking

### 2. Evil Twin Attack
- Fake AP with legitimate-looking name
- Users unknowingly connect
- Traffic intercepted

### 3. Packet Injection
- Injects malicious packets
- Can compromise devices

### 4. Brute Force
- Attempts to crack Wi-Fi password
- WPA3 resistant to this attack

## Wireless Security Tools

**For Network Admins**:
- **Aircrack-ng**: Wi-Fi security auditing
- **Kismet**: Wireless network detector
- **Wireshark**: Packet analysis
- **WiFi Analyzer**: Channel selection

**For Users**:
- **NetSpot**: WiFi survey and analysis
- **Fing**: Network scanner
- **WiFi Protector**: iOS security app`,
            duration: 35,
            videoUrl: null
          }
        ]
      }
    ]
  },
  {
    courseId: 'ethical-hacking',
    title: 'Ethical Hacking & Penetration Testing',
    description: 'Learn to think like a hacker and identify vulnerabilities in systems and networks.',
    level: 'Advanced',
    duration: '8 hours',
    icon: 'Bug',
    modules: [
      {
        id: 1,
        title: 'Introduction to Ethical Hacking',
        description: 'Foundations of ethical hacking and penetration testing',
        lessons: [
          {
            id: 1,
            title: 'What is Ethical Hacking?',
            content: `# What is Ethical Hacking?

## Definition
Ethical hacking is the practice of intentionally probing computer systems, networks, and applications to find security vulnerabilities that malicious hackers could exploit.

## Key Differences: Ethical vs Malicious Hackers

### Ethical Hackers (White Hats):
- **Permission**: Authorized by organization
- **Intent**: Improve security
- **Disclosure**: Report vulnerabilities
- **Legal**: Operate within law
- **Ethics**: Follow code of conduct

### Malicious Hackers (Black Hats):
- **Permission**: Unauthorized access
- **Intent**: Steal, damage, or exploit
- **Disclosure**: Keep exploits secret
- **Legal**: Criminal activity
- **Ethics**: No ethical guidelines

### Gray Hats:
- Between ethical and malicious
- May discover vulnerabilities without permission
- Usually disclose responsibly
- Legal gray area

## Types of Penetration Testing

### 1. Black Box Testing
- **Knowledge**: No prior information
- **Approach**: Simulate external attacker
- **Advantage**: Realistic attack scenario
- **Challenge**: Time-consuming

### 2. White Box Testing
- **Knowledge**: Full system knowledge
- **Approach**: Thorough internal review
- **Advantage**: Comprehensive coverage
- **Challenge**: May miss obvious external flaws

### 3. Gray Box Testing
- **Knowledge**: Partial information
- **Approach**: Simulates insider threat
- **Advantage**: Balanced approach
- **Challenge**: Depends on information quality

## Penetration Testing Methodology

### 1. **Reconnaissance** (Information Gathering)
- Passive: OSINT, social media, public records
- Active: Network scanning, port scanning

### 2. **Scanning**
- Port scanning
- Vulnerability scanning
- Network mapping

### 3. **Gaining Access**
- Exploit vulnerabilities
- Password attacks
- Social engineering

### 4. **Maintaining Access**
- Installing backdoors
- Creating user accounts
- Privilege escalation

### 5. **Covering Tracks**
- Clearing logs
- Hiding files
- Removing evidence

### 6. **Reporting**
- Document findings
- Risk assessment
- Remediation recommendations

## Common Hacking Tools

### Information Gathering:
- **Nmap**: Network scanner
- **Shodan**: IoT search engine
- **theHarvester**: OSINT tool
- **Maltego**: Data mining and analysis

### Vulnerability Assessment:
- **Nessus**: Vulnerability scanner
- **OpenVAS**: Open-source scanner
- **Nikto**: Web server scanner
- **OWASP ZAP**: Web app scanner

### Exploitation:
- **Metasploit**: Exploitation framework
- **Burp Suite**: Web app testing
- **SQLmap**: SQL injection tool
- **John the Ripper**: Password cracker

### Post-Exploitation:
- **Empire**: Post-exploitation framework
- **Mimikatz**: Credential dumping
- **BloodHound**: AD attack paths

## Legal and Ethical Considerations

### You MUST Have:
1. **Written Permission**: Signed authorization
2. **Clear Scope**: Define targets and boundaries
3. **Compliance**: Follow laws and regulations
4. **Non-Disclosure**: Protect client information

### Legal Framework:
- Computer Fraud and Abuse Act (CFAA) - USA
- Computer Misuse Act - UK
- European Cybercrime laws
- Local jurisdiction laws

### Ethical Guidelines:
- Do no harm
- Respect privacy
- Maintain confidentiality
- Disclose responsibly
- Stay within scope

## Certifications

### Entry Level:
- CompTIA Security+
- CEH (Certified Ethical Hacker)

### Intermediate:
- OSCP (Offensive Security Certified Professional)
- GPEN (GIAC Penetration Tester)

### Advanced:
- OSCE (Offensive Security Certified Expert)
- GXPN (GIAC Exploit Researcher and Advanced Penetration Tester)

## Career Paths

1. **Penetration Tester**: Conduct security assessments
2. **Security Consultant**: Advise on security strategy
3. **Bug Bounty Hunter**: Find vulnerabilities for rewards
4. **Red Team Member**: Simulate real-world attacks
5. **Security Researcher**: Discover new vulnerabilities

## Getting Started

### Practice Legally:
- **HTB (Hack The Box)**: Pentesting labs
- **TryHackMe**: Guided cybersecurity training
- **VulnHub**: Vulnerable VMs
- **PentesterLab**: Web app security
- **DVWA**: Deliberately Vulnerable Web App

### Learning Resources:
- **Books**: "The Web Application Hacker's Handbook", "Metasploit: The Penetration Tester's Guide"
- **YouTube**: IppSec, NetworkChuck, John Hammond
- **Podcasts**: Darknet Diaries, Paul's Security Weekly
- **Communities**: Reddit r/netsec, Discord servers

## Responsible Disclosure

When you find a vulnerability:
1. **Don't Exploit**: Don't cause damage
2. **Document**: Take notes and screenshots
3. **Report**: Contact organization securely
4. **Give Time**: Allow 90 days for fix
5. **Follow Up**: Verify patching
6. **Disclose**: Publish responsibly after fix

## Important Warning

⚠️ **Never test systems without explicit permission!**

Unauthorized hacking is:
- Illegal
- Can lead to prosecution
- May result in significant fines
- Could result in imprisonment
- Damages professional reputation

Always operate within legal and ethical boundaries!`,
            duration: 40,
            videoUrl: null
          }
        ]
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses');

    // Insert new courses
    const inserted = await Course.insertMany(coursesData);
    console.log(`✅ Successfully inserted ${inserted.length} courses`);

    console.log('\n📚 Courses added:');
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

// Run the seed function
seedDatabase();
