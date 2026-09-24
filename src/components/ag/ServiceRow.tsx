'use client';

import Link from 'next/link';
import styles from './ServiceRow.module.css';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

// Wrap Link in a functional component that accepts ref for framer-motion
const MotionLink = motion.create(
  forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(function MotionLink(props, ref) {
    return <Link ref={ref} {...props} />;
  })
);

interface ServiceRowProps {
  category: string;
  title: string;
  description: string;
  price: string;
  href: string;
  index?: number;
}

export default function ServiceRow({ category, title, description, price, href, index = 0 }: ServiceRowProps) {
  return (
    <MotionLink 
      href={href} 
      className={styles.row}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className={styles.category}>{category}</span>
      <span className={styles.title}>{title}</span>
      <span className={styles.meta}>
        <span className={styles.description}>{description}</span>
        <span className={styles.priceRow}>
          <span className={styles.priceLabel}>Ab</span>
          <span className={styles.price}>{price}</span>
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </span>
    </MotionLink>
  );
}
