'use client';

import React, { ButtonHTMLAttributes, forwardRef, useRef } from 'react';
import cn from 'classnames';
import { mergeRefs } from 'react-merge-refs';

import * as Icons from '@/components/icons';
import styles from './subscription-button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat';
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const CustomButton = forwardRef<HTMLButtonElement, Props>(
  (props, buttonRef) => {
    const {
      className,
      variant = 'flat',
      children,
      active,
      width,
      loading = false,
      disabled = false,
      style = {},
      Component = 'button',
      ...rest
    } = props;
    const ref = useRef(null);
    const rootClassName = cn(
      styles.root,
      {
        [styles.slim]: variant === 'slim',
        [styles.loading]: loading,
        [styles.disabled]: disabled,
      },
      className,
    );
    return (
      <Component
        aria-pressed={active}
        data-variant={variant}
        ref={mergeRefs([ref, buttonRef])}
        className={rootClassName}
        disabled={disabled}
        style={{
          width,
          ...style,
        }}
        {...rest}
      >
        {children}
        {loading && (
          <i className="m-0 flex pl-2">
            <Icons.Ellipsis />
          </i>
        )}
      </Component>
    );
  },
);
CustomButton.displayName = 'CustomButton';

export default CustomButton;
