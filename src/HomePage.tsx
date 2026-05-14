import type React from 'react';
import heroImg from './assets/hero.png'
import {Cpu, ChartPie ,Cable } from 'lucide-react'
import {
    FaGithub,
    FaTwitter,
    FaDiscord,

} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


type Feature = {
    icon: React.FC<React.SVGProps<SVGSVGElement>>   ;
    title: string;
    description: string;
    linkText: string;
    link?: string;
}
export const HomePage = () => {
    const features: Feature[] = [
        {
            icon: Cpu , 
            title: 'Deep AI Insights',
            description : 'We dont just look for keywords.We analyse the context of your experience to ensure its aligns with the seniority and technical depth required.',
            linkText: 'Explore Insights',
            link: '#'
        },
        {
            icon: ChartPie,
            title: 'Skill Gap Analysis',
            description : 'Instantly visualize the delta between your current stack and the job requirements with clear, developer-friendly metrics.',
            linkText: 'View Gap Metrics',
            link: '#'
        },
        {
            icon: Cable,
            title: 'Actionable Roadmap',
            description : 'Get a personalized list of quick wins to update your resume, and a learning path to critical missing technologies.',
            linkText: 'See example roadmap',
            link: '#'
        }
    ]
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    }
  return (
    <main className="bg-black h-full text-white">
        <header className='p-5'>
            <nav>
                <ul className='flex justify-between'>
                    <li className='flex gap-2'>
                        <img src={heroImg} alt="" />
                        <p className='font-bold'>DevSignal</p>
                    </li>
                    <li className='text-gray-400 font-medium' onClick={navigateToLogin}>
                        Sign In
                    </li>
                </ul>
            </nav>
        </header>
        <section className='p-5 flex flex-col gap-5 items-center text-center sm:'>
            <div
                    className="
                    absolute
                    top-[80px]
                    left-1/2
                    -translate-x-1/2
                    w-[900px]
                    h-[300px]
                    bg-gradient-to-b
                    from-[#7C3AED]/40
                    via-[#7C3AED]/10
                    to-transparent
                    blur-3xl
                    opacity-80
                    "
                />

            <div className='border pt-2 pb-2 p-4 rounded-full bg-black-800 border-gray-700'>
                <p className='text-xs text-gray-200'>v2.0 Beta AI Engine Active</p>
            </div>
            <div className='sm:w-xl'>
                <h1 className='font-bold text-5xl'>Understand Why You’re 
                <span className='bg-gradient-to-r from-[#9494ed] to-[#b385fb] bg-clip-text text-transparent'> Not Getting Hired</span>
                </h1>
            </div>
            <div className='sm:w-2xl'>
                <p className='text-gray-400 font-bold leading-7'>Stop guessing. Our AI-powered analyzer parses your resume against target job descriptions, revealing exact missing skills, ATS blind spots, and actionable code-level recommendations.</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className = 'flex flex-col gap-2 sm:flex-row sm:gap-4 '>
                <input type="text" placeholder="&#128279; Paste Job Description URL..." className='border py-2 px-4 w-full border-gray-700 rounded-lg text-xs' />
                <button className='bg-gradient-to-r from-[#5644e6] to-[#9034e9]  w-full  p-4 rounded-lg text-nowrap'>Analyze My Resume</button>
                </div>
                <p className='text-nowrap text-gray-400 text-sm'>No credit card required. Free tier available.</p>
            </div>
        </section>
        <section className="w-full flex justify-center px-5 mt-10">
  <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#07070B] overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.12)]">

    {/* Top Bar */}
    <div className="h-12 border-b border-white/10 flex items-center px-5 gap-3 bg-[#0B0B12]">

      {/* Mac Dots */}
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#4B5563]" />
        <div className="w-3 h-3 rounded-full bg-[#4B5563]" />
        <div className="w-3 h-3 rounded-full bg-[#4B5563]" />
      </div>

      {/* Path */}
      <div className="flex items-center text-sm font-mono flex-wrap">
        <span className="text-gray-500">
          ~/devsignal/analysis
        </span>

        <span className="text-[#8B5CF6]">
          master*
        </span>
      </div>
    </div>

    {/* Body */}
    <div className="sm:grid sm:grid sm:grid-cols-[1fr_2fr] sm:gap-8 p-4 flex flex-col gap-8 ">

      {/* Left */}
      <div className="flex flex-col gap-8">

        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-300 text-xl">
              Match Score
            </p>

            <h3 className="text-2xl font-bold text-white">
              68%
            </h3>
          </div>

          {/* Progress */}
          <div className="w-full h-3 rounded-full bg-[#111118] overflow-hidden">
            <div className="w-[68%] h-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7]" />
          </div>
        </div>

        {/* Missing */}
        <div className="flex flex-col items-center gap-5">

          <p className="tracking-[0.3em] text-xs text-gray-500 uppercase font-mono">
            Critical Missing
          </p>

          <div className="flex gap-4">
            <span className="border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-2 rounded-md text-sm font-mono">
              GraphQL
            </span>

            <span className="border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-2 rounded-md text-sm font-mono">
              Docker
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="bg-[#0B0B12] border border-white/10 rounded-2xl p-2">

        <h3 className="text-white text-lg mb-4 flex items-center gap-2">
          <span className="text-[#A855F7]">
            ✨
          </span>AI Suggestion: Experience Bullet
        </h3>

        {/* Old Text */}
        <p className="text-center text-red-400/70 line-through font-mono mb-2 text-small ">
          - Built APIs for the frontend team.
        </p>

        {/* New Text */}
        <p className="text-[#22C55E] text-center font-mono text-small">
          + Designed and implemented RESTful APIs using
          Node.js/Express, reducing frontend load times
          by 30% and supporting 10K+ daily active users.
        </p>
      </div>
    </div>
  </div>
</section>
        <section className = 'flex flex-col items-center p-5 gap-2 sm:mt-8 gap-8'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-2xl text-center'>Backed by real power under the hood</h2>
                <p className='text-center text-gray-400 leading-7 sm:w-xl mx-auto '>Our specialized LLM is trained on millions of successful engineering resumes and technical job descriptions to provide precise, developer-centric feedback</p>
            </div>
            <div className='flex gap-4 flex-wrap sm:flex sm:flex-row sm:flex-nowrap'>
        {features.map((item, index) => {
            const FeatureIcon = item.icon
            return (
                    <div
                    key={index}
                    className='p-5 rounded-lg flex flex-col gap-3 bg-[#0F0F14] border border-white/10'
                    >
                    <div className='w-fit p-3 rounded-lg bg-[#171726]'>
                        <FeatureIcon className='text-[#8B5CF6]' size={24} />
                    </div>

                    <h3 className='font-bold text-xl'>
                        {item.title}
                    </h3>

                    <p className='text-gray-400 leading-7'>
                        {item.description}
                    </p>

                    <a
                        href={item.link}
                        className='text-[#8B5CF6] hover:underline'
                    >
                        {item.linkText} &#8594;
                    </a>
                    </div>
                )
                })
            }
    </div>
        </section>
        <footer className='mt-4 border-t border-white/10 flex flex-col items-center px-5 gap-2 sm:flex-row sm:justify-between m-0 bg-[#07070B]'>
            <p className='text-center text-gray-400 text-sm py-5'>
                &copy; 2026 DevSignal. All rights reserved.
            </p>
            <div className='flex gap-4 items-center'>
                <FaGithub/>
                <FaTwitter/>
                <FaDiscord/>
            </div>
    </footer>
    </main>
    
)
}
