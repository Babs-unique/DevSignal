import { Turnstile as CloudflareTurnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { forwardRef } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
}

const Turnstile = forwardRef<TurnstileInstance, TurnstileProps>(
  ({ onVerify }, ref) => {
    return (
      <CloudflareTurnstile
        ref={ref}
        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
        onSuccess={(token) => {
          onVerify(token);
        }}
        onError={() => {
          console.log("Turnstile failed");
        }}
        onExpire={() => {
          console.log("Turnstile expired");
        }}
        options={{
          theme: "auto",
        }}
      />
    );
  }
);

Turnstile.displayName = "Turnstile";

export default Turnstile;