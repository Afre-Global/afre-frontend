"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

type RefreshTokenHandlerProps = {
  setInterval: (time: number) => void;
};
const RefreshTokenHandler = (props: RefreshTokenHandlerProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
      const timeRemaining = Math.round(
        new Date(session.expires).getTime() - 4 * 60 * 1000 - Date.now(),
      );
      props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session, props]);

  return null;
};

export default RefreshTokenHandler;
