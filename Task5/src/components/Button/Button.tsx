import React, {memo} from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface IButton {
  secondary?: boolean;
  children: any;
}

export const Button: React.FC<any> = memo(({secondary, children, ...rest}) => {
  return (
    <button className={cn(styles.btn, {[styles.btn_secondary]: secondary, [styles.btn_primary]: !secondary})} {...rest}>
      {children}
    </button>
  );
});

export default Button;
