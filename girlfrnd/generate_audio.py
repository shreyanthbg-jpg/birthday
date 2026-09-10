import math
import os
import wave

out_path = os.path.join('images', 'for-my-favorite-person.wav')

sample_rate = 44100
duration_seconds = 18
amplitude = 12000

samples = []
for i in range(sample_rate * duration_seconds):
    t = i / sample_rate
    # Soft melody with warm tones
    tone1 = math.sin(2 * math.pi * 220 * t)
    tone2 = math.sin(2 * math.pi * 330 * t)
    tone3 = math.sin(2 * math.pi * 440 * (t * 0.5 + 0.25))
    envelope = min(1.0, max(0.0, 1.0 - abs((t % 1.2) - 0.6) / 0.6))
    sample = (tone1 * 0.35 + tone2 * 0.28 + tone3 * 0.22) * amplitude * envelope
    samples.append(int(sample))

with wave.open(out_path, 'wb') as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)
    wav_file.writeframes(b''.join(int(v).to_bytes(2, byteorder='little', signed=True) for v in samples))

print(f'Generated: {out_path}')
