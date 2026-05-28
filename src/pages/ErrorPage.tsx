import { ArrowLeft, Home, SearchX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050608] px-6 py-12 text-white">
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c4dff]/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,104,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(120,104,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]" />

      <section className="relative z-10 w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#101116] shadow-[0_0_60px_rgba(132,74,255,0.25)]">
          <SearchX size={38} className="text-[#b884ff]" />
        </div>

        <p className="font-mono text-sm uppercase tracking-[0.35em] text-[#8ea2ff]">
          404 Route Missing
        </p>

        <h1 className="mt-5 text-balance text-5xl font-extrabold tracking-[-0.03em] sm:text-7xl">
          This page didn&apos;t pass the signal check.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#a2a6b3]">
          The route you opened does not exist, may have moved, or is still waiting to be
          built.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/DevSignal"
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6356ff] to-[#a93af2] px-7 text-sm font-bold text-white shadow-[0_0_30px_rgba(132,74,255,0.35)] transition hover:brightness-110"
          >
            <Home size={18} />
            Back Home
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#101116] px-7 text-sm font-bold text-[#d7d8df] transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </section>
    </main>
  );
};
