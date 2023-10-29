const GitHubLink: React.FC = () => {
    return (
        <a
            href="https://github.com/sme12/monster-movie-mate"
            target="_blank"
            className="hidden translate-x-[calc(100%-32px)] items-center justify-center gap-5 transition-transform hover:translate-x-0 hover:underline lg:inline-flex"
        >
            <picture className="h-[32px] w-[32px]">
                <img
                    src="github-mark-white.svg"
                    alt="GitHub logo"
                    className="object-fill"
                />
            </picture>
            <span className="">Check on GitHub</span>
        </a>
    );
};

export default GitHubLink;
