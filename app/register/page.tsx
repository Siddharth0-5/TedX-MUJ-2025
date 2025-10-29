"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, QrCode, X, CheckCircle, Sparkles, Loader2 } from "lucide-react"
import Image from "next/image"
import { supabase, type Registration } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function Page() {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    registrationNumber: "",
    transactionId: "",
    acceptTerms: false
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const heroRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({
  //       x: (e.clientX / window.innerWidth - 0.5) * 2,
  //       y: (e.clientY / window.innerHeight - 0.5) * 2,
  //     })
  //   }

  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => window.removeEventListener("mousemove", handleMouseMove)
  // }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPaymentDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: "File size must be less than 5MB" }))
        return
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, file: "Please upload an image file" }))
        return
      }
      setUploadedFile(file)
      setErrors(prev => ({ ...prev, file: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required"
    }

    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required"
    }

    if (!uploadedFile) {
      newErrors.file = "Payment proof is required"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      let paymentProofUrl = ""

      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(filePath, uploadedFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('payment-proofs')
          .getPublicUrl(filePath)

        paymentProofUrl = publicUrl
      }

      const registrationData: Omit<Registration, 'id' | 'created_at' | 'updated_at'> = {
        full_name: formData.fullName.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        registration_number: formData.registrationNumber.trim(),
        transaction_id: formData.transactionId.trim(),
        payment_proof_url: paymentProofUrl,
        accept_terms: formData.acceptTerms
      }

      const { error: insertError } = await supabase
        .from('registrations')
        .insert([registrationData])

      if (insertError) throw insertError

      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted successfully. You will receive a confirmation email shortly."
      })

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        registrationNumber: "",
        transactionId: "",
        acceptTerms: false
      })
      setUploadedFile(null)
      setErrors({})

    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-x-hidden">
    
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
       
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-40 right-1/3 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Dynamic Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                  linear-gradient(90deg, transparent 98%, rgba(239, 68, 68, 0.3) 100%),
                  linear-gradient(0deg, transparent 98%, rgba(239, 68, 68, 0.3) 100%)
                `,
              backgroundSize: "100px 100px",
              animation: "grid-flow 25s linear infinite",
            }}
          />
        </div>

        {/* Floating Ideas Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${10 + i * 6}%`,
                top: `${20 + i * 4}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-red-500/40" />
            </div>
          ))}
        </div>

        {/* TEDx Geometric Elements */}
        <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-red-500/30 transform rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/4 left-16 w-16 h-16 bg-gradient-to-br from-red-500/20 to-transparent rounded-full animate-pulse" />
      </div>

      {/* Hero Section with Enhanced TEDx Branding */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 md:pb-12 flex items-center justify-center min-h-screen"
        data-section
        id="hero-section"
      >
        {/* Hero Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-black/40" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto px-6 transition-all duration-1000 ${
            isVisible("hero-section")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          {/* Main Heading with Enhanced Typography */}
          <div className="relative mb-12">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 blur-3xl scale-150" />

            <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                REGISTER
              </span>
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent transform -translate-y-4">
                NOW
              </span>
            </h1>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-red-500/50 opacity-60 hidden md:block" />
            <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-red-500/50 opacity-60 hidden md:block" />
          </div>

          {/* Subtitle with TEDx Philosophy */}
          <div className="relative mb-12">
            {/* <p className="text-2xl md:text-3xl text-white mb-6 leading-relaxed font-light">
              Visionaries sharing
              <span className="text-red-500 font-semibold">
                {" "}
                ideas worth spreading
              </span>
            </p> */}
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Join us for an extraordinary journey through innovation,
              creativity, and transformative thinking that will challenge
              perspectives and inspire action.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Form Section */}
            <div
              data-section
              id="registration-form"
              className={`transition-all duration-1000 ${
                isVisible("registration-form")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-red-500/30 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-6"
                >
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-white font-medium"
                    >
                      Full name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={`bg-transparent border-red-500/50 text-white placeholder:text-gray-400 focus:border-red-500 transition-all duration-300 ${errors.fullName ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-white font-medium">
                      Mobile number (WhatsApp) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      className={`bg-transparent border-red-500/50 text-white placeholder:text-gray-400 focus:border-red-500 transition-all duration-300 ${errors.mobile ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.mobile && <p className="text-red-400 text-sm">{errors.mobile}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@gmail.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`bg-transparent border-red-500/50 text-white placeholder:text-gray-400 focus:border-red-500 transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                  </div>

                  {/* Registration Number */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="registrationNumber"
                      className="text-white font-medium"
                    >
                      Registration number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="registrationNumber"
                      type="text"
                      placeholder="229301576"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        handleInputChange("registrationNumber", e.target.value)
                      }
                      className={`bg-transparent border-red-500/50 text-white placeholder:text-gray-400 focus:border-red-500 transition-all duration-300 ${errors.registrationNumber ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.registrationNumber && <p className="text-red-400 text-sm">{errors.registrationNumber}</p>}
                  </div>

                  {/* Payment Button with Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      type="button"
                      onClick={() =>
                        setShowPaymentDropdown(!showPaymentDropdown)
                      }
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/25"
                    >
                      Click Here to Pay
                    </Button>

                    {/* Payment Dropdown */}
                    {showPaymentDropdown && (
                      <div className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 md:max-w-md w-auto bg-gray-900/95 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 z-50 animate-in slide-in-from-top-2 duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <QrCode className="w-5 h-5 text-red-500" />
                            Payment Instructions
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPaymentDropdown(false)}
                            className="text-white "
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col items-center space-y-4">
                          {/* Real QR Code */}
                          <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center p-2">
                            <Image
                              src="/QR.jpg"
                              alt="Payment QR Code"
                              width={240}
                              height={240}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="text-center space-y-2">
                            <p className="text-white font-medium">
                              Scan QR Code to Pay
                            </p>
                            <p className="text-white text-sm">Amount: ₹800</p>
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-4">
                              <p className="text-red-500 text-sm font-medium mb-2">
                                Instructions:
                              </p>
                              <ol className="text-white text-xs space-y-1 text-left">
                                <li>
                                  1. Scan the QR code with your payment app
                                </li>
                                <li>2. Complete the payment of ₹800</li>
                                <li>
                                  3. Take a screenshot of the payment
                                  confirmation
                                </li>
                                <li>
                                  4. Upload the screenshot in the form below
                                </li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Payment Proof */}
                  <div className="space-y-2">
                    <Label className="text-white font-medium">
                      Upload Payment Proof <span className="text-red-500">*</span>
                    </Label>
                    <div className={`border-2 border-dashed border-red-500/50 rounded-lg p-8 text-center hover:border-red-500 transition-all duration-300 ${errors.file ? 'border-red-500' : ''}`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        required
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        {uploadedFile ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-green-400" />
                            <span className="text-green-400 font-medium">
                              {uploadedFile.name}
                            </span>
                            <span className="text-white text-sm">
                              Click to change file
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-red-500" />
                            <span className="text-red-500 font-medium">
                              Click here to browse file
                            </span>
                            <span className="text-white text-sm">
                              Upload your payment screenshot
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                    {errors.file && <p className="text-red-400 text-sm">{errors.file}</p>}
                  </div>

                  {/* Transaction ID */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="transactionId"
                      className="text-white font-medium"
                    >
                      Transaction ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="transactionId"
                      type="text"
                      placeholder="123456789"
                      value={formData.transactionId}
                      onChange={(e) =>
                        handleInputChange("transactionId", e.target.value)
                      }
                      className={`bg-transparent border-red-500/50 text-white placeholder:text-gray-400 focus:border-red-500 transition-all duration-300 ${errors.transactionId ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.transactionId && <p className="text-red-400 text-sm">{errors.transactionId}</p>}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("acceptTerms", checked as boolean)
                        }
                        className="border-red-500/50 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        required
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor="terms"
                          className="text-white font-medium cursor-pointer"
                        >
                          Accept terms and conditions <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-white text-sm">
                          You agree to follow all event rules and guidelines.
                        </p>
                      </div>
                    </div>
                    {errors.acceptTerms && <p className="text-red-400 text-sm">{errors.acceptTerms}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration"
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Information Section */}
            <div
              data-section
              id="registration-info"
              className={`transition-all duration-1000 delay-300 ${
                isVisible("registration-info")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Thank you for your interest in
                  </h2>
                  <h3 className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
                    TEDx
                  </h3>
                  <h4 className="text-2xl md:text-3xl text-white mb-8">
                    Manipal University Jaipur
                  </h4>
                  <p className="text-lg text-white leading-relaxed">
                    Please fill the form to complete your registration to a day
                    full of ideas and stories designed to move and inspire.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-red-500">
                    Terms and Conditions:
                  </h3>

                  <div className="space-y-4 text-white">
                    <div className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-lg">1.</span>
                      <p className="text-sm leading-relaxed">
                        By registering for TEDxManipalUniversityJaipur, you
                        agree to be part of the event and allow
                        TEDxManipalUniversityJaipur to use your registration
                        details for event communication.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-lg">2.</span>
                      <p className="text-sm leading-relaxed">
                        Photos and videos taken during the event may be used for
                        promotional purposes across various media platforms.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-lg">3.</span>
                      <p className="text-sm leading-relaxed">
                        The event organizers are not responsible for any lost
                        personal items during the event.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-lg">4.</span>
                      <p className="text-sm leading-relaxed">
                        Please ensure you have provided accurate contact
                        information to receive event updates.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="text-red-500 font-bold text-lg">5.</span>
                      <p className="text-sm leading-relaxed">
                        The event organizers may share your provided details
                        with trusted third-party partners for services such as
                        ticketing, catering, and other promotional activities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
}