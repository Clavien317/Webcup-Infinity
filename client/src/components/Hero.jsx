import {IconArrowDown, IconArrowRight, IconSparkles} from "@tabler/icons-react";

const Hero = ()=>{
    return (
        <div className="h-screen carreaux-bg w-full">
            <div className="font-semibold h-full w-full flex flex-col items-center justify-center">
                <div
                    className="absolute top-10 left-10 w-80 h-80 bg-success rounded-full filter blur-3xl opacity-35 animate-blob"></div>
                <div
                    className="absolute bottom-10 right-10 w-72 h-72 bg-warning rounded-full filter blur-2xl opacity-35 animate-blob animation-delay-4000"></div>

                <p id="hero-text" className="text-center px-12 lg:text-8xl/30  text-5xl/15">Craft & <span
                    className="bg-accent px-4">build</span> highly performant application</p>
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <button className="btn btn-outline btn-primary">Get started <IconArrowRight/></button>
                    <button className="btn btn-link text-secondary">Having project in mind ? <IconSparkles/>
                    </button>
                </div>
                <div className="scroll-down-indicator">
                    <button className="arrow bg-primary-content btn btn-circle btn-soft">
                        <IconArrowDown/>
                    </button>
                </div>

            </div>
        </div>

    )
}

export default Hero;