declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

/**
 * Play a success sound using the web audio API.
 *
 * @param {number} [frequency1=523.25] The frequency of the first oscillator.
 * @param {number} [frequency2=659.25] The frequency of the second oscillator.
 * @param {number} [frequency3=1046.5] The frequency of the third oscillator.
 * @param {number} [startTime=audioCtx.currentTime] The start time of the sound.
 * @param {number} [stopTime=startTime + 1] The stop time of the sound.
 * @param {number} [panValue1=-0.5] The pan value of the first oscillator.
 * @param {number} [panValue2=0.5] The pan value of the second oscillator.
 * @param {number} [panValue3=0] The pan value of the third oscillator.
 * @returns {void}
 */
export function playSuccessSound(
  frequency1 = 523.25,
  frequency2 = 659.25,
  frequency3 = 1046.5,
  startTime = 0,
  stopTime: number = startTime + 1,
  panValue1 = -0.5,
  panValue2 = 0.5,
  panValue3 = 0,
): void {
  // Create a new audio context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Function to create an oscillator for a specific frequency
  function createOscillator(
    frequency: number,
    startTime: number,
    stopTime: number,
    panValue: number,
  ): void {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const panNode = audioCtx.createStereoPanner();

    oscillator.type = "sine"; // Smooth tone
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

    // Fade out the sound
    gainNode.gain.exponentialRampToValueAtTime(0.00001, stopTime);

    oscillator.connect(gainNode);
    gainNode.connect(panNode);
    panNode.connect(audioCtx.destination);

    panNode.pan.setValueAtTime(panValue, audioCtx.currentTime);

    oscillator.start(startTime);
    oscillator.stop(stopTime);
  }

  // Start and stop times
  createOscillator(frequency1, startTime, stopTime, panValue1);
  createOscillator(frequency2, startTime + 0.05, stopTime + 0.05, panValue2);
  createOscillator(frequency3, startTime + 0.32, stopTime + 0.8, panValue3);
}
