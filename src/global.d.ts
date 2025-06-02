export {};

declare global {
  interface Window {
    PhonePeCheckout?: {
      transact: (args: {
        tokenUrl: string;
        callback: (response: string) => void;
        type: 'IFRAME' | 'REDIRECT';
      }) => void;
    };
  }
}