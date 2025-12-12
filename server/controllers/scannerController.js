const net = require('net');
const dns = require('dns').promises;

// Common ports to scan with their services
const COMMON_PORTS = [
  { port: 21, service: 'FTP' },
  { port: 22, service: 'SSH' },
  { port: 23, service: 'Telnet' },
  { port: 25, service: 'SMTP' },
  { port: 53, service: 'DNS' },
  { port: 80, service: 'HTTP' },
  { port: 110, service: 'POP3' },
  { port: 143, service: 'IMAP' },
  { port: 443, service: 'HTTPS' },
  { port: 445, service: 'SMB' },
  { port: 587, service: 'SMTP (TLS)' },
  { port: 993, service: 'IMAP (SSL)' },
  { port: 995, service: 'POP3 (SSL)' },
  { port: 3306, service: 'MySQL' },
  { port: 3389, service: 'RDP' },
  { port: 5432, service: 'PostgreSQL' },
  { port: 5900, service: 'VNC' },
  { port: 8080, service: 'HTTP-Proxy' },
  { port: 8443, service: 'HTTPS-Alt' },
  { port: 27017, service: 'MongoDB' },
];

// Validate IP address format
const isValidIP = (ip) => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) return false;
  
  const parts = ip.split('.');
  return parts.every(part => {
    const num = parseInt(part);
    return num >= 0 && num <= 255;
  });
};

// Validate hostname format
const isValidHostname = (hostname) => {
  const hostnameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return hostnameRegex.test(hostname);
};

// Scan a single port
const scanPort = (host, port, timeout = 2000) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = 'closed';
    
    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
    });
    
    socket.on('timeout', () => {
      status = 'filtered';
      socket.destroy();
    });
    
    socket.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        status = 'closed';
      } else if (err.code === 'ETIMEDOUT' || err.code === 'EHOSTUNREACH') {
        status = 'filtered';
      } else {
        status = 'error';
      }
      socket.destroy();
    });
    
    socket.on('close', () => {
      resolve({ port, status });
    });
    
    socket.connect(port, host);
  });
};

// Resolve hostname to IP
const resolveHost = async (host) => {
  try {
    if (isValidIP(host)) {
      return { ip: host, hostname: null };
    }
    
    if (isValidHostname(host)) {
      const addresses = await dns.resolve4(host);
      return { ip: addresses[0], hostname: host };
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

// Main scan controller
exports.scanNetwork = async (req, res) => {
  try {
    const { host, ports } = req.body;
    
    if (!host) {
      return res.status(400).json({ 
        success: false, 
        message: 'Host (IP address or hostname) is required' 
      });
    }
    
    // Resolve hostname to IP
    const resolved = await resolveHost(host);
    if (!resolved) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid IP address or hostname format' 
      });
    }
    
    // Determine which ports to scan
    let portsToScan = COMMON_PORTS;
    if (ports && Array.isArray(ports) && ports.length > 0) {
      // Custom ports provided
      portsToScan = ports.map(p => ({ 
        port: parseInt(p), 
        service: 'Custom' 
      }));
    }
    
    // Limit to 100 ports to prevent abuse
    if (portsToScan.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Maximum 100 ports can be scanned at once' 
      });
    }
    
    // Scan all ports concurrently with rate limiting
    const BATCH_SIZE = 10; // Scan 10 ports at a time to avoid overwhelming the network
    const results = [];
    
    for (let i = 0; i < portsToScan.length; i += BATCH_SIZE) {
      const batch = portsToScan.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(({ port }) => scanPort(resolved.ip, port))
      );
      
      // Combine with service names
      batchResults.forEach((result, index) => {
        results.push({
          ...result,
          service: batch[index].service
        });
      });
    }
    
    // Calculate statistics
    const openPorts = results.filter(r => r.status === 'open');
    const filteredPorts = results.filter(r => r.status === 'filtered');
    const closedPorts = results.filter(r => r.status === 'closed');
    
    res.json({
      success: true,
      data: {
        target: {
          ip: resolved.ip,
          hostname: resolved.hostname
        },
        scanTime: new Date().toISOString(),
        results: results,
        summary: {
          total: results.length,
          open: openPorts.length,
          filtered: filteredPorts.length,
          closed: closedPorts.length
        }
      }
    });
    
  } catch (error) {
    console.error('Network scan error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Network scan failed',
      error: error.message 
    });
  }
};

// Quick scan - only check if host is up
exports.quickScan = async (req, res) => {
  try {
    const { host } = req.body;
    
    if (!host) {
      return res.status(400).json({ 
        success: false, 
        message: 'Host is required' 
      });
    }
    
    const resolved = await resolveHost(host);
    if (!resolved) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid IP address or hostname' 
      });
    }
    
    // Try to connect to common ports to check if host is up
    const quickPorts = [80, 443, 22, 445]; // HTTP, HTTPS, SSH, SMB
    const results = await Promise.all(
      quickPorts.map(port => scanPort(resolved.ip, port, 1000))
    );
    
    const isUp = results.some(r => r.status === 'open' || r.status === 'filtered');
    
    res.json({
      success: true,
      data: {
        target: {
          ip: resolved.ip,
          hostname: resolved.hostname
        },
        isUp,
        openPorts: results.filter(r => r.status === 'open').length
      }
    });
    
  } catch (error) {
    console.error('Quick scan error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Quick scan failed',
      error: error.message 
    });
  }
};
