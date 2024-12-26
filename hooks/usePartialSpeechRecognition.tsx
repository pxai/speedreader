import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [interim, setInterim] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.interimResults = true; // Enable interim results

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            setTranscript(prev => prev + result[0].transcript);
          } else {
            //interimTranscript += result[0].transcript;
            setInterim(result[0].transcript);
          }
        }
        setTranscript(prev => prev + interimTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech Recognition Error: ', event.error);
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => {
        recognition.stop();
      };
    } else {
      console.error('Speech Recognition not supported by this browser.');
    }
  }, [isListening]);

  return { transcript, interim, isListening, setIsListening };
};

export default useSpeechRecognition;