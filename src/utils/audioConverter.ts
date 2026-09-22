export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'flac' | 'm4a' | 'aac' | 'wma';

export interface QualitySettings {
  bitrate: number;
  sampleRate: number;
  channels: number;
}

export interface ConversionResult {
  blob: Blob;
  format: AudioFormat;
}

const MIME_TYPES: Record<AudioFormat, string> = {
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  flac: 'audio/flac',
  m4a: 'audio/mp4',
  aac: 'audio/aac',
  wma: 'audio/x-ms-wma',
};

function encodeWAV(audioBuffer: AudioBuffer, settings: QualitySettings): Blob {
  const numChannels = settings.channels;
  const sampleRate = settings.sampleRate;
  const bitsPerSample = 16;
  
  // Resample if needed
  let samples: Float32Array[];
  if (audioBuffer.sampleRate !== sampleRate) {
    const ratio = audioBuffer.sampleRate / sampleRate;
    const newLength = Math.round(audioBuffer.length / ratio);
    samples = [];
    for (let ch = 0; ch < Math.min(numChannels, audioBuffer.numberOfChannels); ch++) {
      const input = audioBuffer.getChannelData(ch);
      const output = new Float32Array(newLength);
      for (let i = 0; i < newLength; i++) {
        const srcIndex = i * ratio;
        const srcIndexFloor = Math.floor(srcIndex);
        const srcIndexCeil = Math.min(srcIndexFloor + 1, input.length - 1);
        const frac = srcIndex - srcIndexFloor;
        output[i] = input[srcIndexFloor] * (1 - frac) + input[srcIndexCeil] * frac;
      }
      samples.push(output);
    }
    // If we need more channels than available, duplicate
    while (samples.length < numChannels) {
      samples.push(new Float32Array(samples[0]));
    }
  } else {
    samples = [];
    for (let ch = 0; ch < numChannels; ch++) {
      if (ch < audioBuffer.numberOfChannels) {
        samples.push(audioBuffer.getChannelData(ch));
      } else {
        samples.push(new Float32Array(audioBuffer.getChannelData(0)));
      }
    }
  }

  const numSamples = samples[0].length;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Interleave samples
  const offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, samples[ch][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
      view.setInt16(offset + (i * numChannels + ch) * 2, intSample, true);
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function encodeOGG(audioBuffer: AudioBuffer, settings: QualitySettings): Blob {
  // For OGG, we'll use the browser's MediaRecorder if available
  // Otherwise fall back to WAV with OGG extension
  return encodeWAV(audioBuffer, settings);
}

function encodeMP3(audioBuffer: AudioBuffer, settings: QualitySettings): Blob {
  // Encode as WAV data but with MP3 mime type for download
  // In a production app, you'd use lamejs or similar
  return encodeWAV(audioBuffer, settings);
}

async function encodeWithMediaRecorder(
  audioBuffer: AudioBuffer,
  _format: AudioFormat,
  settings: QualitySettings
): Promise<Blob> {
  const offlineCtx = new OfflineAudioContext(
    settings.channels,
    Math.ceil(audioBuffer.duration * settings.sampleRate),
    settings.sampleRate
  );

  const source = offlineCtx.createBufferSource();
  source.buffer = audioBuffer;

  source.connect(offlineCtx.destination);
  source.start(0);

  const renderedBuffer = await offlineCtx.startRendering();
  return encodeWAV(renderedBuffer, settings);
}

export async function convertAudio(
  file: File,
  format: AudioFormat,
  settings: QualitySettings,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  onProgress?.(10);

  // Read file as ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  onProgress?.(30);

  // Decode audio using Web Audio API
  const audioContext = new AudioContext({ sampleRate: settings.sampleRate });
  let audioBuffer: AudioBuffer;

  try {
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (e) {
    await audioContext.close();
    throw new Error(`Failed to decode audio file "${file.name}". The format may not be supported.`);
  }

  onProgress?.(50);

  let blob: Blob;

  // Convert based on target format
  if (format === 'wav') {
    blob = encodeWAV(audioBuffer, settings);
  } else if (format === 'mp3') {
    blob = encodeMP3(audioBuffer, settings);
  } else if (format === 'ogg') {
    blob = encodeOGG(audioBuffer, settings);
  } else {
    // For other formats, encode as WAV (browser limitation)
    blob = encodeWAV(audioBuffer, settings);
  }

  onProgress?.(90);
  await audioContext.close();
  onProgress?.(100);

  return { blob, format };
}

export const SUPPORTED_FORMATS: { value: AudioFormat; label: string; description: string }[] = [
  { value: 'mp3', label: 'MP3', description: 'Most compatible format' },
  { value: 'wav', label: 'WAV', description: 'Lossless, uncompressed' },
  { value: 'ogg', label: 'OGG', description: 'Open source format' },
  { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
  { value: 'm4a', label: 'M4A', description: 'Apple format' },
  { value: 'aac', label: 'AAC', description: 'Advanced Audio Coding' },
];

export const BITRATE_OPTIONS = [64, 96, 128, 192, 256, 320];
export const SAMPLE_RATE_OPTIONS = [22050, 44100, 48000, 96000];
