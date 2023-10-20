import { useMediaQuery } from 'usehooks-ts';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';
import { ScreensConfig } from 'tailwindcss/types/config';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const fullConfig = resolveConfig(tailwindConfig);

export default function useMedia(breakpoint: Breakpoint) {
    const screens = fullConfig.theme?.screens;
    const size = screens ? screens[breakpoint as keyof ScreensConfig] : '0px';
    return useMediaQuery(`(min-width: ${size})`);
}
