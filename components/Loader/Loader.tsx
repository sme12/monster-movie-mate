'use client';
import Lottie from 'lottie-react';
import loader1 from '@/public/loader1.json';
import loader2 from '@/public/loader2.json';
import loader3 from '@/public/loader3.json';

const Loader: React.FC = () => {
    const loaders = [loader1, loader2, loader3];
    const animationData = loaders[Math.floor(Math.random() * 3)];
    return (
        <div
            className="grow flex items-center justify-center w-full h-full"
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
