import heroImg from './assets/hero.png';
import { ArrowRight, Cable, ChartPie, Code2, Cpu, Link2, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  linkColor: string;
  iconWrap: string;
  iconColor: string;
};

const features: Feature[] = [
  {
    icon: Cpu,
    title: 'Deep AI Insights',
    description:
      "We don't just look for keywords. We analyze the context of your experience to ensure it aligns with the seniority and technical depth required.",
    linkText: 'Explore Insights',
    linkColor: 'text-[#8ea2ff]',
    iconWrap: 'bg-[#151735] border-[#343a85]',
    iconColor: 'text-[#8ea2ff]',
  },
  {
    icon: ChartPie,
    title: 'Skill Gap Analysis',
    description:
      "Instantly visualize the delta between your current stack and the job's requirements with clear, developer-friendly metrics.",
    linkText: 'View Gap Metrics',
    linkColor: 'text-[#d98cff]',
    iconWrap: 'bg-[#2b143d] border-[#6b2f8e]',
    iconColor: 'text-[#d98cff]',
  },
  {
    icon: Cable,
    title: 'Actionable Roadmap',
    description:
      'Get a prioritized list of quick wins to update on your resume, and a learning path for critical missing technologies.',
    linkText: 'See Example Roadmap',
    linkColor: 'text-[#58b7ff]',
    iconWrap: 'bg-[#10223a] border-[#255b91]',
    iconColor: 'text-[#58b7ff]',
  },
];

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-hidden bg-[#050608] text-white">
      <header className="relative z-20 px-6 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3"
            aria-label="DevSignal home"
          >
            <img src={heroImg} alt="" className="h-9 w-9 rounded-md" />
            <span className="text-xl font-bold tracking-[-0.01em]">DevSignal</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-[#a4a7b2] transition hover:text-white"
          >
            Sign In
          </button>
        </nav>
      </header>

      <section className="relative isolate px-5 pt-16 text-center sm:pt-20">
        <div className="absolute left-1/2 top-8 -z-10 h-[620px] w-[78rem] -translate-x-1/2 bg-[linear-gradient(rgba(120,104,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(120,104,255,0.09)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_0%,black_34%,transparent_72%)]" />
        <div className="absolute left-1/2 top-4 -z-10 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-[#7c4dff]/10 blur-3xl" />

        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#12131a] px-4 py-2 font-mono text-xs text-[#d7d8df] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span className="h-2 w-2 rounded-full bg-[#5966ff]" />
          v2.0 Beta AI Engine Active
        </div>

        <h1 className="mx-auto mt-9 max-w-5xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl lg:text-[86px]">
          Understand Why You&apos;re
          <span className="block bg-gradient-to-r from-[#8587ff] to-[#c37aff] bg-clip-text text-transparent">
            Not Getting Hired
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-balance text-lg font-medium leading-8 text-[#a2a6b3] sm:text-xl">
          Stop guessing. Our AI-powered analyzer parses your resume against target job
          descriptions, revealing exact missing skills, ATS blind spots, and actionable
          code-level recommendations.
        </p>

        <div className="mt-11 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-[500px] flex-col items-stretch justify-center gap-4 sm:max-w-[560px] sm:flex-row">
            <label className="flex h-14 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#101116] px-5 text-[#7f8494] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <Link2 size={18} />
              <input
                type="text"
                placeholder="Paste Job Description"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#7f8494] py-3"
              />
            </label>

            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6356ff] to-[#a93af2] px-7 text-sm font-bold text-white shadow-[0_0_30px_rgba(132,74,255,0.35)] transition hover:brightness-110"
            >
              Analyze My Resume
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="font-mono text-xs text-[#747886]">
            No credit card required. Free tier available.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-[1130px] px-5">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#06070a] shadow-[0_0_90px_rgba(82,72,194,0.16)]">
          <div className="flex h-12 items-center gap-6 border-b border-white/10 bg-[#090a0f] px-6">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#42506a]" />
              <span className="h-3 w-3 rounded-full bg-[#42506a]" />
              <span className="h-3 w-3 rounded-full bg-[#42506a]" />
            </div>
            <p className="font-mono text-xs text-[#7f8494]">
              ~/devsignal/analysis
              <span className="ml-6 text-[#7e78ff]">master*</span>
            </p>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-[290px_1fr] lg:p-10">
            <div className="flex flex-col justify-between gap-10">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-base font-semibold text-[#d4d6dd]">Match Score</p>
                  <p className="text-3xl font-extrabold">68%</p>
                </div>
                <div className="h-3 rounded-full bg-[#111218]">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#6356ff] to-[#ad45ff]" />
                </div>
              </div>

              <div className="text-center">
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-[#747886]">
                  Critical Missing
                </p>
                <div className="flex justify-center gap-3">
                  <span className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300">
                    GraphQL
                  </span>
                  <span className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-300">
                    Docker
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#101114] p-5 sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-medium text-white">
                <Sparkles size={18} className="text-[#d98cff]" />
                AI Suggestion: Experience Bullet
              </h3>

              <p className="mb-3 text-center font-mono text-sm text-red-400/75 line-through">
                - Built APIs for the frontend team.
              </p>
              <p className="mx-auto max-w-2xl text-center font-mono text-sm leading-7 text-[#2bec7f]">
                + Designed and implemented RESTful APIs using Node.js/Express, reducing
                frontend load times by 30% and supporting 10K+ daily active users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-36 max-w-[1370px] px-6 pb-56">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
            Backed by real power under the hood
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#9da1ad]">
            Our specialized LLM is trained on millions of successful engineering resumes and
            technical job descriptions to provide precise, developer-centric feedback.
          </p>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-lg border border-white/10 bg-[#0e0f12] p-7 transition hover:border-white/20"
              >
                <div
                  className={`mb-8 flex h-13 w-13 items-center justify-center rounded-lg border ${feature.iconWrap}`}
                >
                  <FeatureIcon size={25} className={feature.iconColor} />
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-4 min-h-[96px] text-base leading-7 text-[#9da1ad]">
                  {feature.description}
                </p>
                <a
                  href="#"
                  className={`mt-5 inline-flex items-center gap-1 text-base font-semibold ${feature.linkColor}`}
                >
                  {feature.linkText}
                  <ArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-6 py-8">
        <div className="mx-auto flex max-w-[1370px] flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="flex items-center gap-2 text-sm font-medium text-[#8d93a2]">
            <Code2 size={19} />
            &copy; 2026 DevSignal. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[#8d93a2]">
            <FaGithub className="transition hover:text-white" />
            <FaTwitter className="transition hover:text-white" />
            <FaDiscord className="transition hover:text-white" />
          </div>
        </div>
      </footer>
    </main>
  );
};
