import { useEffect, useRef } from 'react';

const useScrollToTop = (query: any) => {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const initialRender = useRef(true);

	const executeScroll = () =>
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

	useEffect(() => {
		if (!initialRender.current) {
			executeScroll();
		}
		initialRender.current = false;
	}, [query.skip]);

	return scrollRef;
};

export default useScrollToTop;
