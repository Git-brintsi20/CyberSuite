'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, BookOpen, Database } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-primary/20 to-background">
      <div className="w-full px-6 py-6">
        {/* Header */}
        <nav className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CyberSuite</span>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Your Complete
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              {' '}Cybersecurity Suite
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Protect your digital life with AES-256 encryption, password management, network scanning, and more.
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Protecting Yourself
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Password Manager</h3>
            <p className="text-muted-foreground">
              Securely store and manage all your passwords with military-grade AES-256 encryption.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Eye className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Network Scanner</h3>
            <p className="text-muted-foreground">
              Scan your network for vulnerabilities and potential security threats in real-time.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Database className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">File Vault</h3>
            <p className="text-muted-foreground">
              Encrypt and protect your sensitive files with secure cloud storage.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Security Education</h3>
            <p className="text-muted-foreground">
              Learn best practices and stay updated on the latest cybersecurity threats.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Threat Dashboard</h3>
            <p className="text-muted-foreground">
              Monitor security metrics and get real-time alerts about potential threats.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Lock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Zero-Knowledge Architecture</h3>
            <p className="text-muted-foreground">
              Your data is encrypted on your device. We never have access to your passwords.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 pb-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to secure your digital life?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of users protecting their data with CyberSuite</p>
          <Link href="/register">
            <Button size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
