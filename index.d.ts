declare module 'react-native-callkeep' {
  export type Events =
    | 'didReceiveStartCallAction'
    | 'answerCall'
    | 'endCall'
    | 'didActivateAudioSession'
    | 'didDeactivateAudioSession'
    | 'didDisplayIncomingCall'
    | 'didToggleHoldCallAction'
    | 'didPerformDTMFAction'
    | 'didResetProvider'
    | 'checkReachability'
    | 'didPerformSetMutedCallAction';

  type HandleType = 'generic' | 'number' | 'email';

  interface IOptions {
    ios: {
      appName: string;
      imageName?: string;
      supportsVideo?: boolean;
      maximumCallGroups?: string;
      maximumCallsPerCallGroup?: string;
      ringtoneSound?: string;
    };
    android: {
      alertTitle: string;
      alertDescription: string;
      cancelButton: string;
      okButton: string;
      imageName?: string;
      additionalPermissions: string[];
    };
  }

  export type DidReceiveStartCallActionPayload = { handle: string };
  export type AnswerCallPayload = { callUUID: string };
  export type EndCallPayload = AnswerCallPayload;
  export type DidDisplayIncomingCallPayload = string | undefined;
  export type DidPerformSetMutedCallActionPayload = boolean;

  export default class RNCallKeep {
    static addEventListener(type: Events, handler: (args: any) => void): void;

    static removeEventListener(
      type: Events,
      handler: (args: any) => void
    ): void;

    static setup(options: IOptions): Promise<void>;

    static hasDefaultPhoneAccount(): boolean;

    static displayIncomingCall(
      uuid: string,
      handle: string,
      localizedCallerName?: string,
      handleType?: HandleType,
      hasVideo?: boolean
    ): void;

    static startCall(
      uuid: string,
      handle: string,
      contactIdentifier?: string,
      handleType?: HandleType,
      hasVideo?: boolean
    ): void;
    static updateDisplay(
      uuid: string,
      displayName: string,
      handle: string
    ): void;

    /**
     * @description reportConnectedOutgoingCallWithUUID method is available only on iOS.
     */
    static reportConnectedOutgoingCallWithUUID(uuid: string): void;

    /**
     * @description reportConnectedOutgoingCallWithUUID method is available only on iOS.
     */
    static reportConnectingOutgoingCallWithUUID(uuid: string): void;
    static reportEndCallWithUUID(uuid: string, reason: number): void;

    static rejectCall(uuid: string): void;

    static endCall(uuid: string): void;

    static endAllCalls(): void;

    static setReachable(): void;

    /**
     * @description supportConnectionService method is available only on Android.
     */
    static supportConnectionService(): boolean;

    /**
     * @description hasPhoneAccount method is available only on Android.
     */
    static hasPhoneAccount(): Promise<boolean>;

    static hasOutgoingCall(): Promise<boolean>;

    static getActiveCallId(): Promise<string>;

    /**
     * @description setMutedCall method is available only on iOS.
     */
    static setMutedCall(uuid: string, muted: boolean): void;

    static setOnHold(uuid: string, held: boolean): void;

    /**
     * @descriptions sendDTMF is used to send DTMF tones to the PBX.
     */
    static sendDTMF(uuid: string, key: string): void;

    static checkIfBusy(): Promise<boolean>;

    static checkSpeaker(): Promise<boolean>;

    /**
     * @description setAvailable method is available only on Android.
     */
    static setAvailable(active: boolean): void;

    static setCurrentCallActive(): void;

    static backToForeground(): void;
  }
}
