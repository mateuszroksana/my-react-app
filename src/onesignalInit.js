import OneSignal from 'react-onesignal';

export async function initOneSignal() {
  await OneSignal.init({
    appId: '0ef2ec63-6dc0-47e6-9aeb-0fafaa7a386c',
    allowLocalhostAsSecureOrigin: true,
    autoPrompt: false,
    promptOptions: {
      slidedown: {
        prompts: [
          {
            type: "push",
            autoPrompt: true,
            text: {
              actionMessage: "Chcesz otrzymywać powiadomienia o nowościach?",
              acceptButton: "Tak, chcę!",
              cancelButton: "Nie, dzięki"
            },
            delay: { timeDelay: 5, pageViews: 1 }
          }
        ]
      }
    }
  });

  // Wywołaj prompt ręcznie:
  OneSignal.showSlidedownPrompt();
}
