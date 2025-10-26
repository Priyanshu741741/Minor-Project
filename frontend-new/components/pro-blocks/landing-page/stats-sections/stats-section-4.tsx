import { Card, CardContent } from "@/components/ui/card";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function StatsSection4() {
  return (
    <section className="bg-background section-padding-y border-b">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            <Tagline>Metrics</Tagline>
            <h2 className="heading-lg text-foreground">Data-driven insights for a healthier campus</h2>
            <p className="text-muted-foreground">
              Our system transforms raw feedback and visit data into measurable improvements in dispensary efficiency and student well-being.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3 items-center text-center">
                <h3 className="text-black font-bold">
                  Feedbacks & Remarks Analyzed
                </h3>
                <div className="bg-background flex shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)] px-6 py-3">
                  <span className="text-3xl font-bold md:text-4xl text-primary">
                    1000+
                  </span>
                </div>

                <p className="text-muted-foreground text-base">
                  Our NLP models process patient feedback and doctor remarks to identify sentiment, service quality metrics, and emerging health trends.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3 items-center text-center">
                <h3 className="text-black font-bold">Health Alerts Generated</h3>
                <div className="bg-background flex shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)] px-6 py-3">
                  <span className="text-3xl font-bold md:text-4xl text-primary">
                    10+
                  </span>
                </div>
                <p className="text-muted-foreground text-base">
                  Automated alerts for recurring symptoms like 'fever' and 'cough' help notify the community and administration of potential outbreaks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary rounded-xl border-none p-6 shadow-none">
              <CardContent className="flex flex-col gap-2 p-0 md:gap-3 items-center text-center">
                <h3 className="text-black font-bold">Sentiment Model MAE</h3>
                <div className="bg-background flex shrink-0 items-center justify-center rounded-xl border shadow-[0px_0px_0px_4px_rgba(7,46,106,0.05)] px-6 py-3">
                  <span className="text-3xl font-bold md:text-4xl text-primary">
                    0.7687
                  </span>
                </div>
                <p className="text-muted-foreground text-base">
                  Our RNN model predicts user satisfaction with a Mean Absolute Error of just 0.7687, ensuring high accuracy in understanding patient sentiment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
