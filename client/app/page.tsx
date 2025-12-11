'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, BookOpen, Database } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">CyberSuite</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Complete
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {' '}Cybersecurity Suite
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Protect your digital life with AES-256 encryption, password management, network scanning, and more.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              Start Protecting Yourself
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <Lock className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Password Manager</h3>
            <p className="text-gray-400">
              Securely store and manage all your passwords with military-grade AES-256 encryption.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <Eye className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Network Scanner</h3>
            <p className="text-gray-400">
              Scan your network for vulnerabilities and potential security threats in real-time.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <Database className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">File Vault</h3>
            <p className="text-gray-400">
              Encrypt and protect your sensitive files with secure cloud storage.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <BookOpen className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Security Education</h3>
            <p className="text-gray-400">
              Learn best practices and stay updated on the latest cybersecurity threats.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <Shield className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Threat Dashboard</h3>
            <p className="text-gray-400">
              Monitor security metrics and get real-time alerts about potential threats.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
            <Lock className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Zero-Knowledge Architecture</h3>
            <p className="text-gray-400">
              Your data is encrypted on your device. We never have access to your passwords.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to secure your digital life?</h2>
          <p className="text-gray-300 mb-8">Join thousands of users protecting their data with CyberSuite</p>
          <Link href="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
