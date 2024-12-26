// useSpeechSynthesis.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import useSpeechSynthesis from './useSpeechSynthesis';

describe('useSpeechSynthesis', () => {
  beforeAll(() => {
    // Mock the SpeechSynthesisUtterance and speechSynthesis API
    global.SpeechSynthesisUtterance = class {
      text: string;
      lang: string;
      onstart: () => void;
      onend: () => void;
      constructor(text: string) {
        this.text = text;
      }
    };
    global.speechSynthesis = {
      speak: (utterance: SpeechSynthesisUtterance) => {
        setTimeout(() => {
          utterance.onstart();
          setTimeout(() => {
            utterance.onend();
          }, 100); // Simulate speech duration
        }, 0);
      },
    };
  });

  it('should update isSpeaking state correctly', async () => {
    const { result } = renderHook(() => useSpeechSynthesis());

    act(() => {
      result.current.speak('Hello, world!');
    });

    expect(result.current.isSpeaking).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 150)); // Wait for speech to end

    expect(result.current.isSpeaking).toBe(false);
  });
});