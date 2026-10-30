"use client";

import dynamic from "next/dynamic";

export default dynamic(() => import("./RobotHero"), { ssr: false });
