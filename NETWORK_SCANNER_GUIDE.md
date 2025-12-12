# 🕵️ Network Scanner User Guide

## Overview

The CyberSuite Network Scanner is a real TCP port scanning tool that allows you to audit the security of networks you own or have permission to scan. It's built using Node.js's native `net` module for reliable TCP connection testing.

---

## ⚠️ Legal Notice

**IMPORTANT**: Only scan networks you own or have explicit written permission to scan. Unauthorized network scanning may be illegal in your jurisdiction and could result in:
- Criminal prosecution
- Civil liability
- Network access bans
- Violation of computer fraud laws

**Use this tool responsibly and ethically.**

---

## 🎯 Common Use Cases

### 1. Home Network Security Audit
Scan your home router and devices to identify:
- Open ports that shouldn't be exposed to the internet
- Insecure services (Telnet, unencrypted FTP)
- Unexpected services running on devices
- IoT devices with security vulnerabilities

**Example**: Scan your router at `192.168.1.1`

### 2. Personal Server Monitoring
Check your own servers to verify:
- Only intended services are accessible
- Firewall rules are working correctly
- No unexpected ports are open

**Example**: Scan your home server at `192.168.1.100`

### 3. Local Development Testing
Test your development environment:
- Verify which services are running
- Check if ports are properly exposed
- Debug network configuration issues

**Example**: Scan localhost at `127.0.0.1`

---

## 🚀 How to Use

### Step 1: Start the Application
1. Make sure both backend and frontend servers are running:
   ```bash
   # Terminal 1 - Backend
   cd server
   node index.js
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

2. Navigate to the Network Scanner page in the sidebar

### Step 2: Enter Target Information

You can scan using either:

#### Option A: IP Address
```
192.168.1.1          # Your router
192.168.1.100        # A device on your network
127.0.0.1            # Your local machine
10.0.0.5             # Another private network device
```

#### Option B: Hostname
```
localhost            # Your local machine
my-server.local      # mDNS hostname
router.home          # Custom DNS entry
```

### Step 3: Run the Scan
1. Click the **"Scan"** button
2. Watch the real-time console output
3. Review the results when complete

### Step 4: Interpret Results

The scanner reports three port states:

| Status | Symbol | Meaning |
|--------|--------|---------|
| **OPEN** | ✓ | Service is actively accepting connections on this port |
| **CLOSED** | ✗ | Port is reachable but no service is listening |
| **FILTERED** | ? | Port is unreachable (likely blocked by firewall) |

---

## 📊 Understanding Scan Results

### Normal Home Network Results

**Router (192.168.1.1)**:
```
✓ Port 80 (HTTP): OPEN          # Web admin interface
✓ Port 443 (HTTPS): OPEN        # Secure web admin
? Port 22 (SSH): FILTERED       # SSH management (good if filtered)
✗ Port 23 (Telnet): CLOSED      # Good - Telnet is insecure
```

**Smart TV or IoT Device**:
```
✓ Port 80 (HTTP): OPEN          # Device web interface
? Port 8080 (HTTP-Proxy): FILTERED
✗ Port 22 (SSH): CLOSED
```

### Security Warnings

The scanner automatically detects common security issues:

#### 🚨 **Critical Warnings**
```
Critical: Telnet (port 23) is open and insecure!
```
- **What it means**: Telnet transmits passwords in plain text
- **Action**: Disable Telnet immediately, use SSH (port 22) instead

#### ⚠️ **Moderate Warnings**
```
Warning: FTP (port 21) detected - consider using SFTP instead
```
- **What it means**: FTP sends credentials unencrypted
- **Action**: Switch to SFTP (port 22) or FTPS (port 990)

```
Warning: Multiple open ports detected. Review firewall rules.
```
- **What it means**: More than 5 ports are open
- **Action**: Review each service and close unnecessary ones

---

## 🔍 Common Ports Reference

| Port | Service | Typical Use |
|------|---------|-------------|
| 21 | FTP | File transfer (insecure) |
| 22 | SSH | Secure remote access |
| 23 | Telnet | Remote access (insecure) |
| 25 | SMTP | Email sending |
| 53 | DNS | Domain name resolution |
| 80 | HTTP | Web server |
| 110 | POP3 | Email retrieval |
| 143 | IMAP | Email access |
| 443 | HTTPS | Secure web server |
| 445 | SMB | Windows file sharing |
| 587 | SMTP (TLS) | Secure email sending |
| 993 | IMAP (SSL) | Secure email access |
| 995 | POP3 (SSL) | Secure email retrieval |
| 3306 | MySQL | Database server |
| 3389 | RDP | Windows remote desktop |
| 5432 | PostgreSQL | Database server |
| 5900 | VNC | Remote desktop |
| 8080 | HTTP-Proxy | Alternative web server |
| 8443 | HTTPS-Alt | Alternative secure web |
| 27017 | MongoDB | NoSQL database |

---

## 🛡️ Security Best Practices

### For Home Networks

1. **Minimize Open Ports**
   - Only expose ports for services you actively use
   - Close ports for services you've disabled

2. **Check Your Router**
   - Scan your router's external IP (from whatismyip.com)
   - No ports should be open unless you're running a public service
   - Use port forwarding carefully

3. **Regular Audits**
   - Scan your network monthly
   - Check after adding new IoT devices
   - Verify after changing router settings

4. **Firewall Verification**
   - Filtered ports indicate working firewall rules
   - Too many open ports may indicate firewall misconfiguration

### For Developers

1. **Development Servers**
   - Bind services to localhost (127.0.0.1) during development
   - Only expose ports to LAN when necessary
   - Use Docker network isolation

2. **Docker Containers**
   - Map only required ports
   - Don't use 0.0.0.0 for development databases
   - Use internal Docker networks

---

## 🔧 Technical Details

### Scanning Method
- **TCP Connect Scan**: Attempts full TCP three-way handshake
- **Timeout**: 2 seconds per port
- **Batch Size**: 10 concurrent connections (prevents network overload)
- **Port Limit**: Maximum 100 ports per scan

### What Gets Scanned
By default, the scanner checks 20 common ports:
- Web: 80, 443, 8080, 8443
- Remote Access: 22, 23, 3389, 5900
- Email: 25, 110, 143, 587, 993, 995
- Databases: 3306, 5432, 27017
- Other: 21, 53, 445

### DNS Resolution
- Automatically resolves hostnames to IP addresses
- Uses system DNS settings
- Falls back to direct IP scanning if resolution fails

---

## 🐛 Troubleshooting

### "Invalid IP address or hostname"
- Check your IP format: `192.168.1.1` (not `192.168.1.1.`)
- Verify hostname is resolvable: `ping hostname` in terminal
- Try using IP address instead of hostname

### "Scan failed: Unable to complete network scan"
- Check that backend server is running (port 5000)
- Verify network connection
- Try scanning localhost (127.0.0.1) first

### All Ports Show as "FILTERED"
- Target device has strict firewall
- Device may be offline
- Network route may be blocked
- Try pinging the device first: `ping 192.168.1.1`

### Scan Takes Too Long
- Large port ranges take time (2 seconds per port)
- Network congestion can slow scanning
- Consider scanning only common ports

---

## 📝 Example Scanning Scenarios

### Scenario 1: Audit Home Router
```
Target: 192.168.1.1
Expected Results:
✓ Port 80 (HTTP): OPEN
✓ Port 443 (HTTPS): OPEN
? Port 22 (SSH): FILTERED
✗ Port 23 (Telnet): CLOSED

Action: Good! Web interface accessible, SSH protected, Telnet disabled
```

### Scenario 2: Check Gaming Console
```
Target: 192.168.1.150
Expected Results:
✓ Port 80 (HTTP): OPEN
✗ Port 443 (HTTPS): CLOSED
✗ Port 3389 (RDP): CLOSED

Action: Normal for gaming console with web interface
```

### Scenario 3: Verify Home Server
```
Target: my-server.local
Expected Results:
✓ Port 22 (SSH): OPEN
✓ Port 443 (HTTPS): OPEN
✓ Port 3306 (MySQL): OPEN
⚠ Warning: MySQL port exposed!

Action: Consider using MySQL over SSH tunnel for security
```

---

## 🎓 Educational Notes

### What is Port Scanning?
Port scanning is a method of determining which network ports are open, closed, or filtered on a system. It's essential for:
- Network security auditing
- Troubleshooting connectivity issues
- Verifying firewall configurations
- Identifying running services

### Why TCP Connect Scan?
This scanner uses TCP connect scanning:
- **Most reliable**: Full three-way handshake
- **Most accurate**: Definitive open/closed status
- **Most compatible**: Works through most firewalls
- **Trade-off**: Easier to detect in logs

### Port States Explained
1. **OPEN**: A service actively accepts connections
2. **CLOSED**: System responds but no service listening
3. **FILTERED**: Firewall drops packets (no response)

---

## ❓ FAQ

**Q: Can I scan my entire subnet (192.168.1.0/24)?**  
A: Currently, you need to scan each IP individually. Subnet scanning may be added in future updates.

**Q: Is this as powerful as Nmap?**  
A: No, this is a basic TCP connect scanner. Nmap offers advanced techniques like SYN scanning, OS detection, and service version detection.

**Q: Will this work on public IP addresses?**  
A: Technically yes, but **DON'T DO IT** unless you own that IP address. Scanning public IPs without permission is illegal.

**Q: Can I add custom ports?**  
A: Not yet in the UI, but you can modify the backend `scannerController.js` to add ports to the `COMMON_PORTS` array.

**Q: Why does my ISP block this?**  
A: Some ISPs block outbound port scanning to prevent abuse. This is why you should only scan local networks (192.168.x.x, 10.x.x.x).

---

## 🔐 Privacy & Security

### What Data is Logged?
- Scan target (IP/hostname)
- Scan timestamp
- Port scan results

### What Data is NOT Logged?
- No scan data is stored in database
- No scan history is kept
- Results are only shown in browser
- Session-only data (cleared on logout)

### Backend Security
- All scanner endpoints require authentication
- Rate limiting prevents abuse
- Input validation prevents injection attacks
- 100-port scan limit prevents resource exhaustion

---

## 📞 Support

If you encounter issues:
1. Check that both backend (port 5000) and frontend (port 3000) are running
2. Try scanning localhost (127.0.0.1) first
3. Check browser console for error messages
4. Verify network connectivity with `ping`

For bug reports or feature requests, refer to the project documentation.

---

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Custom port selection in UI
- [ ] Subnet scanning (scan entire network range)
- [ ] Service version detection
- [ ] OS fingerprinting
- [ ] Scan history and reports
- [ ] Scheduled periodic scans
- [ ] Email alerts for changes
- [ ] Comparison with previous scans
- [ ] Export results to CSV/PDF

---

**Remember**: With great power comes great responsibility. Use this tool ethically and legally! 🛡️
