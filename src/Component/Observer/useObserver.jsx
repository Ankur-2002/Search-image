import { useRef, useState, useEffect } from 'react';

const useObserver = options => {
  const containerRef = useRef();
  const [isview, setisview] = useState(false);

  const callback = entries => {
    const [entry] = entries;
    setisview(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [options, containerRef]);

  return [containerRef, isview];
};
export default useObserver;
