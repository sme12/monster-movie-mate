'use client';
import Lottie from 'lottie-react';
import loader1 from '@/public/loader1.json';
import loader2 from '@/public/loader2.json';
import loader3 from '@/public/loader3.json';
import loader4 from '@/public/loader4.json';
import loader5 from '@/public/loader5.json';

const Loader: React.FC = () => {
    const loaders = [loader1, loader2, loader3, loader4, loader5];
    const animationData = loaders[Math.floor(Math.random() * loaders.length)];
    return (
        <div
            className="flex h-full w-full grow items-center justify-center"
            data-testid="loader"
        >
            <Lottie
                autoplay={true}
                loop={true}
                animationData={animationData}
                style={{ width: '300px', height: '300px' }}
            />
        </div>
    );
};

export default Loader;
