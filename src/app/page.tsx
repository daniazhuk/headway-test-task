import Link from 'next/link';

import { Button, Typography } from '@/shared/components';
import styles from './page.module.css';
import Thumb from '@/shared/images/svg/Thumb.svg';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home__content}>
        <Thumb className={styles.home__image} />
        <div className={styles.home__wrapper}>
          <Typography as="h1" fontWeight="bold" className={styles.home__text}>
            Who wants to be a millionaire?
          </Typography>
          <Link href="/game" className={styles.home__button}>
            <Button fullWidth>Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
