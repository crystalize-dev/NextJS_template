'use client';
import React, { ChangeEvent, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import classNames from 'classnames';
import { IconType } from '../Icon/icon-database';
import Icon from '../Icon/Icon';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    type: 'email' | 'password' | 'text';
    disabled?: boolean;
    placeholder?: string;
    placeholderType?: 'inner' | 'classic';
    passwordSetup?: boolean;
    onType?: (value: string) => void;
    name?: string;
    required?: boolean;
    icon?: IconType;
    layoutId?: string;
    inputClassName?: string;
    restrictedLength?: boolean;
    forgotPassword?: boolean;
}

const Input = ({
    placeholderType = 'inner',
    passwordSetup = false,
    forgotPassword = false,
    icon,
    type,
    className,
    inputClassName,
    defaultValue = '',
    disabled,
    layoutId,
    placeholder,
    hidden,
    required,
    onType,
    restrictedLength = false,
    ...otherProps
}: InputProps) => {
    const [value, setValue] = useState(defaultValue);
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [error, setError] = useState(' ');

    const changeValue = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            if (restrictedLength && newValue.length > 10) return;
            if (required && newValue.length > 0) setError(' ');

            setValue(newValue);
            onType && onType(newValue);
        },
        [restrictedLength, required, onType]
    );

    const inputType = type === 'password' && isVisiblePassword ? 'text' : type;

    const handleBlur = useCallback(() => {
        if (required) setError(!value ? 'Required!' : ' ');
    }, [required, value]);

    // Stylization
    const focusStyles =
        'outline outline-2 outline-transparent focus:outline-primary-hover';
    const disabledStyles = 'cursor-not-allowed opacity-50';

    const containerClassNames = classNames(
        'relative flex h-fit w-full flex-col gap-2 text-sm',
        {
            'items-center': icon,
            [className || '']: !!className
        }
    );

    const inputClassNames = classNames(
        'bg-light-bg dark:bg-dark-object h-12 w-full rounded-md p-4 !text-base transition-all',
        focusStyles,
        { [disabledStyles]: disabled },
        { 'pr-10': icon },
        inputClassName,
        { '!outline-red-500': error === 'Required!' }
    );

    const linkClassNames = classNames(
        'cursor-pointer self-end whitespace-nowrap text-zinc-500 outline-none transition-all hover:text-primary hover:underline focus:text-primary focus:underline dark:text-white/20',
        { 'pointer-events-none opacity-50': disabled }
    );

    const iconClassNames = classNames(
        'pointer-events-none absolute right-4 select-none text-zinc-400',
        {
            'top-[calc(50%-0.5rem)] -translate-y-1/2':
                placeholderType === 'classic',
            'bottom-[2.1rem]': placeholderType !== 'classic'
        }
    );

    const passwordSetupClassNames = classNames(
        'absolute right-4 text-zinc-400',
        {
            'top-[calc(50%-0.5rem)] -translate-y-1/2':
                placeholderType === 'classic',
            'bottom-[2.1rem]': placeholderType !== 'classic'
        }
    );

    return (
        <motion.div layout layoutId={layoutId} className={containerClassNames}>
            {placeholderType === 'inner' && (
                <p className="self-start font-semibold text-inherit">
                    {placeholder}
                </p>
            )}

            <input
                {...otherProps}
                type={inputType}
                required={required}
                onBlur={handleBlur}
                autoComplete="off"
                disabled={disabled}
                placeholder={
                    placeholderType === 'classic' ? placeholder : undefined
                }
                hidden={hidden}
                value={value}
                onChange={changeValue}
                className={inputClassNames}
            />

            {!hidden && (
                <div className="-mt-1 flex w-full items-center justify-between gap-2 text-xs">
                    <p className="text-red-500">{error}</p>
                    {forgotPassword && (
                        <Link
                            href="/forgot-password"
                            className={linkClassNames}
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>
            )}

            {icon && type !== 'password' && (
                <Icon icon={icon} className={iconClassNames} />
            )}

            {passwordSetup && type === 'password' && (
                <Icon
                    icon={isVisiblePassword ? 'eye' : 'eye-closed'}
                    className={passwordSetupClassNames}
                    onClick={() => setVisiblePassword(!isVisiblePassword)}
                />
            )}
        </motion.div>
    );
};

export default Input;
