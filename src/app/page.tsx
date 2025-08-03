"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-30 bg-pattern"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating-element-1"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating-element-2"></div>
        <div className="absolute -bottom-4 left-20 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse floating-element-3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2">
        <div className="w-full max-w-sm">
          {/* Enhanced Logo/Brand Section */}
          <div className="text-center mb-4 animate-fade-in">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl mb-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl opacity-20 animate-pulse"></div>
              <svg
                className="w-8 h-8 text-white relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
              INVENTORY SYSTEM
            </h1>
            <p className="text-sm text-gray-600 font-medium">SIGN IN TO YOUR ACCOUNT</p>
          </div>

          {/* Enhanced Login Card */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-xl rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
            <CardHeader className="relative space-y-1 pb-4">
              <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                WELCOME BACK
              </CardTitle>
              <CardDescription className="text-center text-sm text-gray-600 font-medium">
                ENTER YOUR CREDENTIALS TO ACCESS YOUR INVENTORY
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold text-gray-700 flex items-center">
                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    EMAIL ADDRESS
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="ENTER YOUR EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold text-gray-700 flex items-center">
                    <svg className="w-3 h-3 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="ENTER YOUR PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                      />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">REMEMBER ME</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline">
                    FORGOT PASSWORD?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>SIGNING IN...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>SIGN IN</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </Button>
              </form>

              <Separator className="my-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

             
            </CardContent>
          </Card>

          {/* Enhanced Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 font-medium">
              © 2024 INVENTORY SYSTEM. ALL RIGHTS RESERVED.
            </p>
            <div className="flex justify-center space-x-4 mt-1">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200">PRIVACY POLICY</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200">TERMS OF SERVICE</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200">SUPPORT</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
