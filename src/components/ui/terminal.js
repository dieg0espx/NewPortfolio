import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

const SequenceContext = createContext(null);
const ItemIndexContext = createContext(null);

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
};

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}) {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const reduce = useReducedMotion();
  const sequence = useContext(SequenceContext);
  const itemIndex = useContext(ItemIndexContext);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) setHasStarted(true);
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = reduce || (sequence ? hasStarted : startOnView ? isInView : true);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: reduce ? 0 : 0.3, delay: sequence || reduce ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        if (!sequence || itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TypingAnimation({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}) {
  const MotionComponent = motionElements[Component] || motion.span;
  const reduce = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const sequence = useContext(SequenceContext);
  const itemIndex = useContext(ItemIndexContext);
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const sequenceCompleteItemRef = useRef(null);
  const sequenceItemIndexRef = useRef(null);

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null;
    sequenceItemIndexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    if (reduce) {
      setDisplayedText(typeof children === "string" ? children : "");
      setStarted(true);
      return undefined;
    }

    let startTimeout = null;
    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    }

    return () => {
      if (startTimeout !== null) clearTimeout(startTimeout);
    };
  }, [
    children,
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
    reduce,
  ]);

  useEffect(() => {
    if (reduce) {
      const completeItem = sequenceCompleteItemRef.current;
      const currentItemIndex = sequenceItemIndexRef.current;
      if (completeItem && currentItemIndex !== null) completeItem(currentItemIndex);
      return undefined;
    }

    if (typeof children !== "string" || !started) return undefined;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i += 1;
        return;
      }
      clearInterval(typingEffect);
      const completeItem = sequenceCompleteItemRef.current;
      const currentItemIndex = sequenceItemIndexRef.current;
      if (completeItem && currentItemIndex !== null) completeItem(currentItemIndex);
    }, duration);

    return () => clearInterval(typingEffect);
  }, [children, duration, started, reduce]);

  return (
    <MotionComponent ref={elementRef} className={cn("text-sm font-normal tracking-tight", className)} {...props}>
      {reduce && typeof children === "string" ? children : displayedText}
    </MotionComponent>
  );
}

export function Terminal({ children, className, sequence = true, startOnView = true }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const reduce = useReducedMotion();
  const sequencing = sequence && !reduce;
  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequencing ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequencing) return null;
    return {
      completeItem: (index) => {
        setActiveIndex((current) => (index === current ? current + 1 : current));
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequencing, activeIndex, sequenceHasStarted]);

  const wrappedChildren = useMemo(() => {
    if (!sequencing) return children;
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequencing]);

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-lg overflow-hidden rounded-xl border border-[#262626] bg-black",
        className
      )}
    >
      <div className="flex flex-col gap-y-2 border-b border-[#262626] p-4">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />
        </div>
      </div>
      <pre className="m-0 p-4">
        <code className="grid gap-y-1 overflow-auto font-mono text-[13px] leading-6 text-[#e5e5e5]">
          {wrappedChildren}
        </code>
      </pre>
    </div>
  );

  if (!sequencing) return content;

  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
}
