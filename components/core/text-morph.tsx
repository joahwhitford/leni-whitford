'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextMorphProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TextMorph({ children: text, className, as: Tag = 'span' }: TextMorphProps) {
  return (
    <Tag className={cn('relative inline-flex flex-wrap', className)} aria-label={text}>
      <AnimatePresence mode="popLayout" initial={false}>
        {text.split('').map((char, i) => (
          <motion.span
            key={`${i}-${char}`}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -6 }}
            transition={{ duration: 0.25, delay: i * 0.025, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-block"
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </Tag>
  );
}
