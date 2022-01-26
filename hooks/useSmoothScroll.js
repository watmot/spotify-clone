import GSAP from 'gsap';
import Prefix from 'prefix';
import { set } from 'lodash';
import NormalizeWheel from 'normalize-wheel';
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import useWindowSize from './useWindowSize';

const useSmoothScroll = (elementRef) => {
  const { height } = useWindowSize();
  const transformPrefix = Prefix('transform');

  const [currentScroll, setCurrentScroll] = useState(0);
  const [targetScroll, setTargetScroll] = useState(0);
  const [scrollLimit, setScrollLimit] = useState(0);

  const requestRef = useRef();

  // Determine scroll limit for clamping
  useEffect(() => {
    setScrollLimit(elementRef.current.clientHeight - height);
  }, [elementRef, height]);

  // Event Handlers
  const handleMouseWheel = (event) => {
    const { pixelY } = NormalizeWheel(event);
    const clamper = GSAP.utils.clamp(0, scrollLimit);

    setTargetScroll((prevState) => clamper(prevState + pixelY));
    console.log('Scroll Limit:', scrollLimit);
    console.log('Target Scroll:', targetScroll);
  };

  const handleSmoothScroll = useCallback(() => {
    setCurrentScroll(() =>
      Math.round(GSAP.utils.interpolate(currentScroll, targetScroll, 0.1), 2)
    );
    console.log('Current Scroll:', currentScroll);
    elementRef.current.style[
      transformPrefix
    ] = `translateY(-${currentScroll}px)`;

    requestRef.current = requestAnimationFrame(handleSmoothScroll);
  }, [currentScroll, elementRef, targetScroll, transformPrefix]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleSmoothScroll);
    return () => cancelAnimationFrame(requestRef.current);
  }, [handleSmoothScroll]);

  return { handleMouseWheel };
};

export default useSmoothScroll;
