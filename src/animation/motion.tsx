export function slideInFromBottom(delay: number) {
  return {
    offscreen: {
      y: 80,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeOut",
      },
    },
  };
}

export function sideBar() {
  return {
    offscreen: {
      width: "0%",
    },
    onscreen: {
      width: "50%",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
}

export function slideInFromLeftWithBounce(delay: number) {
  return {
    offscreen: {
      x: -100,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.6,
        delay: delay,
        bounce: 0.3,
      },
    },
  };
}

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const textTyping = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0,
  },
  visible: (i: number) => ({
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.3,
      ease: "easeInOut",
    },
  }),
};

