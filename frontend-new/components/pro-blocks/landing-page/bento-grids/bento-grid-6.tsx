"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function BentoGrid6() {
  return (
    <section className="bg-background section-padding-y border-b" id="features">
      <div className="container-padding-x container mx-auto flex flex-col gap-10 md:gap-12">
        {/* Section Title */}
        <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
          {/* Tagline */}
          <Tagline>Features</Tagline>
          {/* Main Heading */}
          <h2 className="heading-lg">
            Streamline, organize, and analyze dispensary operations
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* Wide Feature Card - Top Left */}
          <Card className="bg-muted/80 gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-2">
            <img
              src="/ai-meeting-notes.png"
              alt="AI Meeting Notes"
              width={813}
              height={332}
              className="hidden h-auto w-full object-cover md:block md:h-[332px]"
            />
            <img
              src="/ai-meeting-notes_mobile.png"
              alt="AI Meeting Notes"
              width={480}
              height={332}
              className="block h-auto w-full md:hidden"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-foreground text-lg font-semibold">
                AI Feedback Analysis
              </h3>
              <p className="text-muted-foreground">
                Automatic sentiment analysis of patient feedback to identify key concerns
              </p>
            </CardContent>
          </Card>
          {/* Regular Feature Card - Top Right */}
          <Card className="bg-muted/80 gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-1">
            <img
              src="/universal-search.png"
              alt="Universal Search"
              width={480}
              height={332}
              className="h-auto w-full object-cover md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-foreground text-lg font-semibold">
                Comprehensive Patient Search
              </h3>
              <p className="text-muted-foreground">
                Instantly find patient visit history, prescriptions, and feedback
              </p>
            </CardContent>
          </Card>
          {/* Regular Feature Card - Bottom Left */}
          <Card className="bg-muted/80 gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-1">
            <img
              src="/smart-tags.png"
              alt="AI Meeting Notes"
              width={480}
              height={332}
              className="h-auto w-full object-cover md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-foreground text-lg font-semibold">
                Smart Categorization
              </h3>
              <p className="text-muted-foreground">
                Automatically tag feedback by topic, department, or urgency
              </p>
            </CardContent>
          </Card>
          {/* Wide Feature Card - Bottom Right */}
          <Card className="bg-muted/80 gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-2">
            <img
              src="/team-insights.png"
              alt="Team Insights"
              width={813}
              height={332}
              className="hidden h-[332px] w-full object-cover md:block"
            />
            <img
              src="/team-insights_mobile.png"
              alt="Team Insights"
              width={480}
              height={332}
              className="block h-auto w-full object-cover md:hidden md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-foreground text-lg font-semibold">
                Health & Operational Insights
              </h3>
              <p className="text-muted-foreground">
                Disease outbreak identification, alert generation, and dispensary efficiency metrics
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
