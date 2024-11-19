import { Easing, Notifier } from "react-native-notifier";
import { ErrorToast, SuccessToast } from "@/components/feedback/toasts";

const useToast = () => {
  const success = (message: string) => {
    Notifier.showNotification({
      Component: () => <SuccessToast message={message} />,
      duration: 2000,
      easing: Easing.out(Easing.ease),
      queueMode: "standby",
      showAnimationDuration: 800,
      translucentStatusBar: true,
    });
  };
  const error = (message: string) => {
    Notifier.showNotification({
      Component: () => <ErrorToast message={message} />,
      duration: 2000,
      easing: Easing.out(Easing.ease),
      queueMode: "standby",
      showAnimationDuration: 800,
      translucentStatusBar: true,
    });
  };

  return {
    error,
    success,
  };
};

export default useToast;
