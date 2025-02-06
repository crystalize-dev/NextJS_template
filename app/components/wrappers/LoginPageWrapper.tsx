import { motion } from 'framer-motion';
import React from 'react';

const LoginPageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            layoutId="mainWin"
            className="border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg flex h-full w-full items-center border-solid backdrop-blur-md lg:h-fit lg:w-fit lg:min-w-96 lg:rounded-xl lg:border"
        >
            {children}
        </motion.div>
    );
};

export default LoginPageWrapper;
