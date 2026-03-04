"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { initMixpanel } from "@/lib/mixpanel";

export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initMixpanel();
    }, []);

    return <SessionProvider>{children}</SessionProvider>;
}
