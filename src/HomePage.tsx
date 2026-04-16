import heroImg from './assets/hero.png'


export const HomePage = () => {
  return (
    <main className="bg-black h-full text-white">
        <header className='p-5'>
            <nav>
                <ul className='flex justify-between'>
                    <li className='flex gap-2'>
                        <img src={heroImg} alt="" />
                        <p className='font-bold'>DevSignal</p>
                    </li>
                    <li className='text-gray-400 font-medium'>Sign In</li>
                </ul>
            </nav>
        </header>
        <section className='p-5 flex flex-col gap-5 items-center text-center'>
            <div className='border pt-2 pb-2 p-4 rounded-full bg-black-800 border-gray-700'>
                <p className='text-xs text-gray-200'>v2.0 Beta AI Engine Active</p>
            </div>
            <div>
                <h1 className='font-bold text-5xl'>Understand Why You’re 
                <span className='bg-gradient-to-r from-[#9494ed] to-[#b385fb] bg-clip-text text-transparent'> Not Getting Hired</span>
                </h1>
            </div>
            <div>
                <p className='text-gray-400 font-bold leading-7'>Stop guessing. Our AI-powered analyzer parses your resume against target job descriptions, revealing exact missing skills, ATS blind spots, and actionable code-level recommendations.</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
                <input type="text" placeholder="Paste Job Description URL..." className='border py-2 px-4 w-full border-gray-700 rounded-lg' />
                <button className='bg-gradient-to-r from-[#5644e6] to-[#9034e9]  w-full  p-4 rounded-lg'>Analyze My Resume</button>
                <p className='text-nowrap text-gray-400 text-sm'>No credit card required. Free tier available.</p>
            </div>

        </section>
    </main>
  )
}
