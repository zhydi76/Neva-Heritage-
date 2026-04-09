import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scissors, Loader2, RefreshCw, Sparkles, Camera, CameraOff, Check } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { translations, Language } from "../translations";

interface StyleExplorerProps {
  lang: Language;
}

const BASE_IMAGE_URL = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800";

export default function StyleExplorer({ lang }: StyleExplorerProps) {
  const t = translations[lang];
  const [currentImage, setCurrentImage] = useState(BASE_IMAGE_URL);
  const [baseImage, setBaseImage] = useState(BASE_IMAGE_URL);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Camera states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const styles = [
    { id: "fade", label: t.styleExplorer.styles.fade, prompt: "Apply a clean skin fade haircut to this person. Keep the top slightly longer and textured." },
    { id: "pompadour", label: t.styleExplorer.styles.pompadour, prompt: "Give this person a classic pompadour hairstyle with high volume on top and slicked back sides." },
    { id: "buzz", label: t.styleExplorer.styles.buzz, prompt: "Give this person a uniform buzz cut. Very short hair all over." },
    { id: "long", label: t.styleExplorer.styles.long, prompt: "Give this person shoulder-length wavy hair. Natural and stylish look." },
    { id: "beard", label: t.styleExplorer.styles.beard, prompt: "Add a well-groomed, thick beard and mustache to this person. Keep their current hair style." },
  ];

  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Camera error:", err);
          const hint = lang === 'ru' ? ". Попробуйте открыть приложение в новой вкладке." : ". Try opening the app in a new tab.";
          setError(t.styleExplorer.camera.error + hint);
          setIsCameraActive(false);
        });
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive, t.styleExplorer.camera.error]);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL("image/jpeg");
        setCapturedPhoto(photo);
        setBaseImage(photo);
        setCurrentImage(photo);
        setIsCameraActive(false);
        
        // Stop stream
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const getBase64FromUrl = async (url: string): Promise<string> => {
    if (url.startsWith('data:')) {
      return url.split(',')[1];
    }
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const applyStyle = async (styleId: string, prompt: string) => {
    if (isProcessing) return;
    
    // Check for API key if needed (though gemini-2.5-flash-image might not strictly require it, 
    // it's safer to check in this environment if things "don't work")
    const aistudio = (window as any).aistudio;
    if (aistudio && !(await aistudio.hasSelectedApiKey())) {
      await aistudio.openSelectKey();
      // After opening, we assume success as per guidelines and proceed
    }

    setIsProcessing(true);
    setActiveStyle(styleId);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY || "" });
      const baseImageToUse = capturedPhoto || baseImage;
      const base64Data = await getBase64FromUrl(baseImageToUse);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: "image/jpeg",
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          setCurrentImage(`data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        // Check for text response which might contain error info from the model
        const textPart = parts.find(p => p.text);
        if (textPart) {
          throw new Error(textPart.text);
        }
        throw new Error("No image generated");
      }
    } catch (err: any) {
      console.error("Style Explorer Error:", err);
      let errorMessage = lang === 'ru' ? "Не удалось применить стиль. Попробуйте еще раз." : "Failed to apply style. Please try again.";
      
      if (err.message?.includes("Requested entity was not found")) {
        errorMessage = lang === 'ru' ? "Ошибка конфигурации API. Пожалуйста, выберите ключ заново." : "API configuration error. Please re-select your key.";
        const aistudio = (window as any).aistudio;
        if (aistudio) await aistudio.openSelectKey();
      } else if (err.message) {
        errorMessage = `${errorMessage} (${err.message.substring(0, 50)}...)`;
      }
      
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setCurrentImage(BASE_IMAGE_URL);
    setBaseImage(BASE_IMAGE_URL);
    setCapturedPhoto(null);
    setActiveStyle(null);
    setError(null);
  };

  return (
    <section id="style-explorer" className="py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Display */}
          <div className="relative group">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border-8 border-white/5 shadow-2xl relative bg-black">
              <AnimatePresence mode="wait">
                {isCameraActive ? (
                  <motion.div
                    key="camera"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full relative"
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                      <button
                        onClick={takePhoto}
                        className="bg-white text-dark p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
                      >
                        <Camera size={32} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.img
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={currentImage}
                    alt="Style Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </AnimatePresence>
              
              {isProcessing && (
                <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-4 z-10">
                  <Loader2 size={48} className="animate-spin text-gold" />
                  <span className="font-serif text-xl tracking-widest uppercase">{t.styleExplorer.processing}</span>
                </div>
              )}

              {error && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white p-3 rounded-lg text-sm text-center z-20">
                  {error}
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-gold text-white p-6 rounded-2xl shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-30">
              <Sparkles size={32} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-4 text-gold mb-6">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{t.styleExplorer.subtitle}</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-display text-white mb-8 lowercase leading-tight">{t.styleExplorer.title}</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-lg">
                {t.styleExplorer.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {!isCameraActive && (
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-xs border border-white/10"
                >
                  <Camera size={18} className="text-gold" />
                  {capturedPhoto ? t.styleExplorer.camera.retake : t.styleExplorer.camera.use}
                </button>
              )}
              {isCameraActive && (
                <button
                  onClick={() => setIsCameraActive(false)}
                  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-xl transition-all font-bold uppercase tracking-widest text-xs border border-red-500/20"
                >
                  <CameraOff size={18} />
                  {t.styleExplorer.camera.stop}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => applyStyle(style.id, style.prompt)}
                  disabled={isProcessing || isCameraActive}
                  className={`p-6 rounded-sm border transition-all duration-700 flex flex-col gap-4 group relative overflow-hidden ${
                    activeStyle === style.id
                      ? "border-gold bg-gold/5 text-gold"
                      : "border-white/5 bg-white/[0.02] text-white/40 hover:border-gold/30 hover:text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-bold uppercase tracking-[0.2em] text-[10px]">{style.label}</span>
                    <Scissors size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  <div className="h-px w-0 bg-gold transition-all duration-700 group-hover:w-full"></div>
                </button>
              ))}
            </div>

            <button
              onClick={reset}
              disabled={isProcessing || (currentImage === BASE_IMAGE_URL && !capturedPhoto)}
              className="flex items-center gap-2 text-gray-500 hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold disabled:opacity-0"
            >
              <RefreshCw size={16} />
              {lang === 'ru' ? 'Сбросить' : lang === 'en' ? 'Reset' : 'Калыбына келтирүү'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
      </div>
    </section>
  );
}
