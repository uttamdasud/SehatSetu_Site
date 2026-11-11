/**
 * Telemedicine WebRTC & Media Consultation Service for SehatSetu
 * Manages real camera, microphone, screen sharing, STUN/TURN configuration,
 * and peer signaling for doctor-patient video consultations.
 */

export interface MediaConstraints {
  video: boolean | MediaTrackConstraints;
  audio: boolean | MediaTrackConstraints;
}

export interface VideoSessionConfig {
  roomName: string;
  userName: string;
  isDoctor: boolean;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
];

class VideoService {
  private localStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;

  /**
   * Requests camera and microphone permissions from browser
   */
  async getLocalMedia(constraints: MediaConstraints = { video: true, audio: true }): Promise<MediaStream | null> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
        return this.localStream;
      }
    } catch (err) {
      console.warn('[VideoService] Camera/Microphone access not granted or unavailable:', err);
    }
    return null;
  }

  /**
   * Initializes WebRTC peer connection with STUN server configuration
   */
  createPeerConnection(onRemoteTrack: (stream: MediaStream) => void): RTCPeerConnection {
    const pc = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    });

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        if (this.localStream) {
          pc.addTrack(track, this.localStream);
        }
      });
    }

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        onRemoteTrack(event.streams[0]);
      }
    };

    this.peerConnection = pc;
    return pc;
  }

  /**
   * Initiates screen sharing for sharing lab reports or prescriptions
   */
  async startScreenShare(): Promise<MediaStream | null> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        return displayStream;
      }
    } catch (err) {
      console.warn('[VideoService] Screen sharing rejected or unsupported:', err);
    }
    return null;
  }

  /**
   * Toggles local microphone mute/unmute
   */
  toggleMicrophone(enabled: boolean): boolean {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = enabled;
      });
      return enabled;
    }
    return false;
  }

  /**
   * Toggles local camera video feed on/off
   */
  toggleCamera(enabled: boolean): boolean {
    if (this.localStream) {
      const videoTracks = this.localStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = enabled;
      });
      return enabled;
    }
    return false;
  }

  /**
   * Cleanly closes and stops all hardware tracks
   */
  stopSession(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }
}

export const videoService = new VideoService();
