"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function HeroFashion() {
    return (
        <div className="min-h-screen bg-transparent">
            <div className="container mx-auto px-4 py-24 md:py-32">
                <div className="grid md:grid-cols-2 gap-0 md:gap-1 relative overflow-x-hidden items-center max-w-5xl mx-auto mt-8 md:mt-12">
                    <div className="md:order-2 relative flex justify-center">
                        <div className="absolute -z-10 w-72 h-72 rounded-full bg-stone-400 dark:bg-stone-600 blur-3xl opacity-20 -top-10 -left-10"></div>
                        <div className="relative w-11/12 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/profile.jpg"
                                alt="Serigne Diaw"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="md:order-1 flex flex-col justify-center md:pr-2">
                        <div className="flex flex-col space-y-8">
                            <h1 className="text-7xl font-bold text-stone-800 dark:text-stone-100 leading-tight tracking-tighter">
                                Serigne Diaw.
                            </h1>
                            <div>
                                <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-100">
                                    DATA SCIENTIST
                                </h2>
                                <p className="text-lg text-stone-700 dark:text-stone-300 max-w-md pt-4 tracking-tight">
                                    A data scientist with expertise in machine learning, AI engineering, and natural language processing, with experience applying advanced techniques to real-world problems in healthcare, neuroscience, and sports analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 