import { useState } from 'react';

const useSpeechSynthesis = (lang: string = 'en-US') => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string, onEndCallback?: () => void) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEndCallback) {
        onEndCallback();
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  return { isSpeaking, speak };
};

export default useSpeechSynthesis;