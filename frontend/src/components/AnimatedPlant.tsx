import { motion } from 'framer-motion';

interface AnimatedPlantProps {
    stage: number; // 0: seed, 1: sprout, 2: plant
}

const AnimatedPlant = ({ stage }: AnimatedPlantProps) => {
    // Growth animation
    const scaleVariants = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
    };

    return (
        <motion.div
            className="w-32 h-32 flex items-center justify-center"
        >
            <motion.svg
                viewBox="0 0 100 120"
                className="w-full h-full"
                key={stage}
                variants={scaleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6 }}
            >
                {stage === 0 && (
                    <>
                        <ellipse cx="50" cy="95" rx="30" ry="8" fill="#4a3728" opacity="0.8" />
                        <motion.ellipse
                            cx="50"
                            cy="85"
                            rx="8"
                            ry="10"
                            fill="#8B7355"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' as const }}
                        />
                        <ellipse cx="50" cy="83" rx="4" ry="3" fill="#654321" opacity="0.6" />
                    </>
                )}

                {stage === 1 && (
                    <>
                        <ellipse cx="50" cy="100" rx="30" ry="8" fill="#4a3728" opacity="0.8" />
                        <path
                            d="M 50 100 Q 48 80 50 60"
                            stroke="#7CB342"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <motion.ellipse
                            cx="38"
                            cy="75"
                            rx="6"
                            ry="12"
                            fill="#9CCC65"
                            transform="rotate(-35 38 75)"
                            animate={{ rotateZ: [-15, -5, -15] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' as const }}
                        />
                        <motion.ellipse
                            cx="62"
                            cy="75"
                            rx="6"
                            ry="12"
                            fill="#9CCC65"
                            transform="rotate(35 62 75)"
                            animate={{ rotateZ: [15, 5, 15] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' as const }}
                        />
                        <ellipse cx="50" cy="50" rx="4" ry="8" fill="#AED581" />
                    </>
                )}

                {stage === 2 && (
                    <>
                        <ellipse cx="50" cy="105" rx="35" ry="10" fill="#4a3728" opacity="0.8" />
                        <path
                            d="M 50 105 Q 49 75 50 40"
                            stroke="#7CB342"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 50 70 Q 35 60 25 65"
                            stroke="#9CCC65"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 50 70 Q 65 60 75 65"
                            stroke="#9CCC65"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <motion.ellipse
                            cx="32"
                            cy="80"
                            rx="8"
                            ry="14"
                            fill="#7CB342"
                            transform="rotate(-40 32 80)"
                            animate={{ rotateZ: [-20, -5, -20] }}
                            transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' as const }}
                        />
                        <motion.ellipse
                            cx="68"
                            cy="80"
                            rx="8"
                            ry="14"
                            fill="#7CB342"
                            transform="rotate(40 68 80)"
                            animate={{ rotateZ: [20, 5, 20] }}
                            transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' as const }}
                        />
                        <motion.ellipse
                            cx="28"
                            cy="60"
                            rx="7"
                            ry="13"
                            fill="#9CCC65"
                            transform="rotate(-35 28 60)"
                            animate={{ rotateZ: [-15, 0, -15] }}
                            transition={{ duration: 1.6, repeat: Infinity, repeatType: 'loop' as const, delay: 0.2 }}
                        />
                        <motion.ellipse
                            cx="72"
                            cy="60"
                            rx="7"
                            ry="13"
                            fill="#9CCC65"
                            transform="rotate(35 72 60)"
                            animate={{ rotateZ: [15, 0, 15] }}
                            transition={{ duration: 1.6, repeat: Infinity, repeatType: 'loop' as const, delay: 0.2 }}
                        />
                        <motion.ellipse
                            cx="35"
                            cy="45"
                            rx="6"
                            ry="11"
                            fill="#AED581"
                            transform="rotate(-30 35 45)"
                            animate={{ rotateZ: [-10, 5, -10] }}
                            transition={{ duration: 1.4, repeat: Infinity, repeatType: 'loop' as const, delay: 0.4 }}
                        />
                        <motion.ellipse
                            cx="65"
                            cy="45"
                            rx="6"
                            ry="11"
                            fill="#AED581"
                            transform="rotate(30 65 45)"
                            animate={{ rotateZ: [10, -5, 10] }}
                            transition={{ duration: 1.4, repeat: Infinity, repeatType: 'loop' as const, delay: 0.4 }}
                        />
                        <motion.g
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' as const }}
                        >
                            <circle cx="50" cy="30" r="4" fill="#FF6B9D" />
                            <circle cx="44" cy="26" r="3" fill="#FF8FB3" />
                            <circle cx="56" cy="26" r="3" fill="#FF8FB3" />
                            <circle cx="44" cy="34" r="3" fill="#FF8FB3" />
                            <circle cx="56" cy="34" r="3" fill="#FF8FB3" />
                        </motion.g>
                    </>
                )}
            </motion.svg>
        </motion.div>
    );
};

export default AnimatedPlant;
