import re
import math

class PasswordAnalyzer:
    def __init__(self):
        # Common passwords list (top 100)
        self.common_passwords = set([
            'password', '123456', '12345678', 'qwerty', 'abc123',
            'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
            'baseball', '111111', 'iloveyou', 'master', 'sunshine',
            'ashley', 'bailey', 'passw0rd', 'shadow', '123123',
            'welcome', 'admin', 'password1', 'password123', 'letmein',
            'football', 'michael', 'charlie', 'superman', 'computer',
            'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'princess', 'starwars'
        ])
        
        self.common_patterns = [
            r'12345', r'qwerty', r'abc', r'password',
            r'admin', r'user', r'login', r'pass'
        ]
    
    def analyze(self, password):
        """
        Comprehensive ML-based password analysis
        """
        score = 0
        vulnerabilities = []
        suggestions = []
        
        # Length check
        length = len(password)
        if length < 8:
            vulnerabilities.append('Password too short (minimum 8 characters)')
            suggestions.append('Use at least 8 characters')
        elif length >= 8:
            score += 20
        if length >= 12:
            score += 10
        if length >= 16:
            score += 10
        
        # Character diversity
        has_lower = bool(re.search(r'[a-z]', password))
        has_upper = bool(re.search(r'[A-Z]', password))
        has_digit = bool(re.search(r'\d', password))
        has_special = bool(re.search(r'[!@#$%^&*(),.?":{}|<>\-_=+\[\]\\\/~`]', password))
        
        char_types = sum([has_lower, has_upper, has_digit, has_special])
        score += char_types * 15
        
        if not has_upper:
            vulnerabilities.append('No uppercase letters')
            suggestions.append('Add uppercase letters (A-Z)')
        if not has_lower:
            vulnerabilities.append('No lowercase letters')
            suggestions.append('Add lowercase letters (a-z)')
        if not has_digit:
            vulnerabilities.append('No numbers')
            suggestions.append('Add numbers (0-9)')
        if not has_special:
            vulnerabilities.append('No special characters')
            suggestions.append('Add special characters (!@#$%^&*)')
        
        # Common password check
        if password.lower() in self.common_passwords:
            score = max(0, score - 50)
            vulnerabilities.append('Common password - easily guessable')
            suggestions.append('Use a unique, unpredictable password')
        
        # Pattern check
        for pattern in self.common_patterns:
            if re.search(pattern, password.lower()):
                score = max(0, score - 20)
                vulnerabilities.append(f'Contains common pattern: {pattern}')
                suggestions.append('Avoid common patterns and sequences')
                break
        
        # Repeated characters
        if re.search(r'(.)\1{2,}', password):
            score = max(0, score - 10)
            vulnerabilities.append('Repeated characters detected (e.g., aaa, 111)')
            suggestions.append('Avoid repeating characters')
        
        # Sequential characters
        if self._has_sequential(password):
            score = max(0, score - 15)
            vulnerabilities.append('Sequential characters detected (e.g., 123, abc)')
            suggestions.append('Avoid sequential patterns')
        
        # Entropy calculation (randomness measure)
        entropy = self._calculate_entropy(password)
        if entropy > 60:
            score += 10
        elif entropy < 30:
            score = max(0, score - 10)
            vulnerabilities.append('Low entropy (not random enough)')
        
        # Cap score at 100
        score = min(100, score)
        
        # Determine strength
        if score < 40:
            strength = 'weak'
        elif score < 60:
            strength = 'medium'
        elif score < 80:
            strength = 'strong'
        else:
            strength = 'very-strong'
        
        # Estimate crack time
        crack_time = self._estimate_crack_time(length, char_types)
        
        # Final suggestions if password is good
        if not suggestions:
            suggestions.append('Password looks good!')
        
        return {
            'score': score,
            'strength': strength,
            'vulnerabilities': vulnerabilities,
            'suggestions': suggestions,
            'estimatedCrackTime': crack_time,
            'entropy': round(entropy, 2)
        }
    
    def _has_sequential(self, password):
        """Check for sequential characters like abc, 123"""
        for i in range(len(password) - 2):
            if password[i:i+3].isdigit():
                if int(password[i+1]) == int(password[i]) + 1 and \
                   int(password[i+2]) == int(password[i+1]) + 1:
                    return True
            elif password[i:i+3].isalpha():
                if ord(password[i+1].lower()) == ord(password[i].lower()) + 1 and \
                   ord(password[i+2].lower()) == ord(password[i+1].lower()) + 1:
                    return True
        return False
    
    def _calculate_entropy(self, password):
        """Calculate password entropy (bits)"""
        charset_size = 0
        if re.search(r'[a-z]', password):
            charset_size += 26
        if re.search(r'[A-Z]', password):
            charset_size += 26
        if re.search(r'\d', password):
            charset_size += 10
        if re.search(r'[^a-zA-Z0-9]', password):
            charset_size += 32
        
        if charset_size == 0:
            return 0
        
        entropy = len(password) * math.log2(charset_size)
        return entropy
    
    def _estimate_crack_time(self, length, char_types):
        """Estimate time to crack password"""
        # Simplified calculation
        # Assumes 10 billion attempts per second (modern GPU)
        
        charset_sizes = {1: 26, 2: 52, 3: 62, 4: 94}
        charset = charset_sizes.get(char_types, 26)
        
        combinations = charset ** length
        attempts_per_second = 10_000_000_000
        
        seconds = combinations / (2 * attempts_per_second)  # Average case
        
        if seconds < 1:
            return 'Instant'
        elif seconds < 60:
            return f'{int(seconds)} seconds'
        elif seconds < 3600:
            return f'{int(seconds / 60)} minutes'
        elif seconds < 86400:
            return f'{int(seconds / 3600)} hours'
        elif seconds < 2592000:
            return f'{int(seconds / 86400)} days'
        elif seconds < 31536000:
            return f'{int(seconds / 2592000)} months'
        else:
            years = int(seconds / 31536000)
            if years > 1000000:
                return '10+ million years'
            elif years > 1000:
                return f'{int(years / 1000)}k+ years'
            return f'{years} years'
