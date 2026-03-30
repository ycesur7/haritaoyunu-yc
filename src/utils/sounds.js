// Ses efektleri için basit utility
export function playSound(soundName) {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Ses çalınamadı:', err));
  } catch (error) {
    console.log('Ses hatası:', error);
  }
}

// Web Audio API ile alkış sesi oluştur
export function playApplause() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Alkış efekti için white noise
    const duration = 2;
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(2, duration * sampleRate, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      for (let i = 0; i < buffer.length; i++) {
        // Rastgele noise ile alkış efekti
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sampleRate * 0.5));
      }
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.log('Ses efekti çalınamadı:', error);
  }
}

// Başarı sesi
export function playSuccess() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log('Ses efekti çalınamadı:', error);
  }
}
