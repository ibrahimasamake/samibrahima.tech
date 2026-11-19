import { Reveal } from "@/components/animations/reveal";
import { StepIcon } from "@/components/visuals/icons";
import { processSteps } from "@/data/process";

export function ProcessSteps({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((s, i) => (
        <Reveal as="li" key={s.n} delay={(i % 3) * 0.06} className="flex flex-col bg-surface p-7 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-accent">{s.n}</span>
            <StepIcon index={i} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-fg">{s.name}</h3>
          <p className="mt-1.5 text-[15px] text-fg/90">{s.summary}</p>
          {detailed && (
            <>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.detail}</p>
              <p className="mt-auto pt-5 text-sm text-subtle">
                <span className="font-medium text-fg">You get: </span>
                {s.output}
              </p>
            </>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
