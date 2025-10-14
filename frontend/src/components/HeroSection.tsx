"use client"

import * as React from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { X } from "lucide-react"

type CardType = "left" | "top-right" | "bottom-right" | null

export function HeroSection() {
  const [expandedCard, setExpandedCard] = React.useState<CardType>(null)

  const handleCardClick = (card: CardType) => {
    setExpandedCard(card)
  }

  const handleClose = () => {
    setExpandedCard(null)
  }

  return (
    <LayoutGroup>
      <div className="w-full bg-gray-50 h-[calc(100vh-72px)] overflow-hidden relative">
        {!expandedCard && (
          <div className="h-[calc(100vh-72px)] px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Card - Large */}
              <motion.div
                layoutId="left-card"
                onClick={() => handleCardClick("left")}
                className="bg-white rounded-3xl p-12 shadow-sm h-full cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-center"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className="text-5xl font-serif mb-4 text-gray-900">Your Health, Our Priority</h2>
                <p className="text-lg text-gray-600 font-sans">
                  Comprehensive healthcare management at your fingertips. Book appointments, access records, and connect with top medical professionals.
                </p>
              </motion.div>

              {/* Right Column - Two Cards Stacked */}
              <div className="flex flex-col gap-6 h-full">
                {/* Top Right Card */}
                <motion.div
                  layoutId="top-right-card"
                  onClick={() => handleCardClick("top-right")}
                  className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12 shadow-sm flex-1 cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <h3 className="text-4xl font-serif text-white mb-3">Book Instantly</h3>
                  <p className="text-white/90 text-base font-sans">
                    Schedule appointments with specialists in minutes. Real-time availability & instant confirmations.
                  </p>
                </motion.div>

                {/* Bottom Right Card */}
                <motion.div
                  layoutId="bottom-right-card"
                  onClick={() => handleCardClick("bottom-right")}
                  className="bg-gray-900 rounded-3xl p-12 shadow-sm flex-1 cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <h3 className="text-4xl font-serif text-white mb-3">Expert Care</h3>
                  <p className="text-white/90 text-base font-sans">
                    Connect with experienced doctors across multiple specializations. Quality healthcare you can trust.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {expandedCard === "left" && (
          <motion.div
            layoutId="left-card"
            className="h-full p-6"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full h-full p-12 relative flex items-center justify-center">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl font-serif mb-6 text-center text-gray-900">Your Health Dashboard</h2>
                <p className="text-gray-600 text-center mb-8 text-lg font-sans">
                  Access your complete medical history, upcoming appointments, and health records all in one place.
                </p>
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-serif text-2xl mb-3 text-gray-900">Quick Access Features</h3>
                    <ul className="space-y-2 text-gray-600 font-sans">
                      <li>• View and manage all upcoming appointments</li>
                      <li>• Access complete medical records and visit history</li>
                      <li>• Track prescriptions and treatment plans</li>
                      <li>• Direct communication with healthcare providers</li>
                      <li>• Download medical reports and lab results</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {expandedCard === "top-right" && (
          <motion.div
            layoutId="top-right-card"
            className="h-full p-6"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-2xl w-full h-full p-12 relative text-white flex items-center justify-center">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-6xl font-serif mb-6">Book Your Appointment</h2>
                <p className="text-white/90 mb-8 max-w-md mx-auto text-lg font-sans">
                  Schedule consultations with experienced healthcare professionals. Online booking available 24/7 with instant confirmations.
                </p>
                <button className="px-8 py-3 border-2 border-white rounded-full hover:bg-white/10 transition-colors mb-6 font-sans font-medium">
                  Schedule Now
                </button>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="font-serif text-2xl mb-4">Available Services:</h3>
                  <ul className="text-white/90 space-y-2 font-sans">
                    <li>• General Consultations</li>
                    <li>• Specialist Appointments</li>
                    <li>• Emergency Care</li>
                    <li>• Follow-up Visits</li>
                    <li>• Telemedicine Options</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {expandedCard === "bottom-right" && (
          <motion.div
            layoutId="bottom-right-card"
            className="h-full p-6"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="bg-gray-900 rounded-3xl shadow-2xl w-full h-full p-12 relative text-white flex items-center justify-center">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-6xl font-serif mb-6">Connect with Healthcare Providers</h2>
                <p className="text-white/90 mb-8 max-w-md mx-auto text-lg font-sans">
                  Access our network of qualified doctors and specialists. Get expert medical advice and personalized care tailored to your needs.
                </p>
                <div className="bg-white/5 backdrop-blur rounded-lg p-6 max-w-md mx-auto border border-white/10">
                  <h3 className="font-serif text-2xl mb-4">Our Specialists</h3>
                  <div className="space-y-3 text-base text-white/80 font-sans">
                    <div className="flex items-center justify-between">
                      <span>General Practitioners</span>
                      <span className="text-white font-semibold">15+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Medical Specialists</span>
                      <span className="text-white font-semibold">12+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Combined Experience</span>
                      <span className="text-white font-semibold">200+ years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Patient Satisfaction</span>
                      <span className="text-white font-semibold">98%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </LayoutGroup>
  )
}
