import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Star,
  MapPin,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const steps = ["Choose Tailor", "Choose Service", "Select Date", "Select Time", "Confirm"];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [services, setServices] = useState([]);
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId) {
      setCurrentStep(1);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/services`
        );
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };

    fetchServices();
  }, []);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      alert("Appointment booked successfully!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="info" className="mb-4 bg-white/20 text-white border-0">
              Book Appointment
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Schedule Your Visit
            </h1>
            <p className="text-white/80 text-lg mt-4">
              Book a tailoring service in just a few steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROGRESS BAR */}
      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      i <= currentStep
                        ? "bg-primary-500 text-white"
                        : "bg-surface-200 text-surface-400"
                    }`}
                  >
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium hidden sm:block ${
                      i <= currentStep ? "text-primary-600" : "text-surface-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 bg-surface-200">
                    <div
                      className="h-full bg-primary-500 transition-all"
                      style={{ width: i < currentStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEP CONTENT */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={fadeUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: Choose Tailor */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    Select a Tailor
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {tailors.length === 0 ? (
                      <p className="text-surface-500 col-span-2 text-center py-12">
                        No tailors available at the moment
                      </p>
                    ) : (
                      tailors.map((tailor) => (
                        <Card
                          key={tailor._id}
                          onClick={() => {
                            setSelectedTailor(tailor);
                            nextStep();
                          }}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-8 h-8 text-primary-500" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-surface-900">
                                {tailor.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                                <span className="text-sm font-semibold">4.9</span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-surface-400" />
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Service */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    Select a Service
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Card
                        key={service._id}
                        onClick={() => {
                          setSelectedService(service);
                          nextStep();
                        }}
                        className="cursor-pointer"
                      >
                        {service.image && (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-40 object-cover rounded-xl mb-3"
                          />
                        )}
                        <h3 className="font-bold text-surface-900">
                          {service.title}
                        </h3>
                        <p className="text-sm text-surface-500 mt-1">
                          {service.description}
                        </p>
                        <p className="text-lg font-bold text-primary-500 mt-2">
                          ₹{service.price}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Select Date */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    Choose a Date
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Array.from({ length: 14 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i + 1);
                      const dateStr = date.toISOString().split("T")[0];
                      const dayName = date.toLocaleDateString("en-US", {
                        weekday: "short",
                      });
                      const dayNum = date.getDate();

                      return (
                        <button
                          key={dateStr}
                          onClick={() => {
                            setSelectedDate(dateStr);
                            nextStep();
                          }}
                          className={`p-4 rounded-xl border-2 font-semibold text-center transition-all ${
                            selectedDate === dateStr
                              ? "border-primary-500 bg-primary-50 text-primary-600"
                              : "border-surface-200 hover:border-primary-300"
                          }`}
                        >
                          <p className="text-xs text-surface-500">{dayName}</p>
                          <p className="text-2xl font-bold">{dayNum}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Select Time */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    Choose a Time Slot
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          nextStep();
                        }}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                          selectedTime === time
                            ? "border-primary-500 bg-primary-50 text-primary-600"
                            : "border-surface-200 hover:border-primary-300"
                        }`}
                      >
                        <Clock className="w-5 h-5 mx-auto mb-2" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Confirm */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-surface-900">
                    Confirm Booking
                  </h2>
                  <Card>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-surface-100">
                        <span className="text-surface-500">Service</span>
                        <span className="font-semibold text-surface-900">
                          {selectedService?.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-4 border-b border-surface-100">
                        <span className="text-surface-500">Date</span>
                        <span className="font-semibold text-surface-900">
                          {selectedDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-4 border-b border-surface-100">
                        <span className="text-surface-500">Time</span>
                        <span className="font-semibold text-surface-900">
                          {selectedTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-surface-500">Price</span>
                        <span className="text-xl font-bold text-primary-500">
                          ₹{selectedService?.price}
                        </span>
                      </div>
                    </div>
                  </Card>
                  <Button
                    onClick={handleSubmit}
                    loading={loading}
                    size="lg"
                    className="w-full"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Confirm Booking
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                variant="secondary"
                onClick={prevStep}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Button>
            )}
            <div />
          </div>
        </div>
      </section>
    </div>
  );
}