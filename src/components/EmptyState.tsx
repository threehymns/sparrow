import { motion } from "framer-motion";

const EmptyState = () => {
  return (
    <li className="pointer-events-none absolute left-1/2 top-0 h-screen w-screen max-w-sm -translate-x-1/2">
      <motion.div
        className="absolute left-12 top-36 w-44 -translate-y-1/2 text-center text-zinc-400"
        transition={{ delay: 0.5 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        You can edit the title of your list here.
        <svg
          className="absolute -top-20 size-20 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 62.3 93"
          stroke="currentColor"
        >
          <g fill="none" strokeLinecap="round" strokeWidth="2">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              d="M50.4 83c-5-6.3-23.4-25-30.1-37.2C13.5 33.6 11.6 15.9 10 10m42.3 71.9C47.8 75.7 29 59 22.3 47.3c-6.6-11.7-8-29.9-9.9-35.9"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              d="M22.4 27.2a82.9 82.9 0 0 0-10-15.8m10 15.8c-3.7-4.9-7-9-10-15.8"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              d="M9.9 30c0-5.7 1-9.2 2.5-18.6M10 29.9c.2-5.7.8-10.7 2.5-18.5"
            />
          </g>
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 text-center text-zinc-400 fade-in"
        initial={{ opacity: 0, scale: 0.5, translate: "-50% -90%" }}
        animate={{ opacity: 1, scale: 1, translate: "-50% -50%" }}
        exit={{ opacity: 0 }}
      >
        <h1 className="pb-2 text-2xl font-bold">Welcome to Sparrow</h1>
        <svg
          className="absolute -top-14 right-3 -z-10 size-36 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 152.2 55.4"
          stroke="currentColor"
        >
          <motion.path
            fill="none"
            strokeLinecap="round"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            d="M103.8 12.1a116 116 0 0 1 27.3 5.7c6.4 2.4 10.4 6 11.2 8.9.9 2.9-1.5 5.5-6.2 8.3a70 70 0 0 1-21.8 8.2c-9 1.6-21 1.5-32.2 1.5-11.2 0-25 0-35-1.4-10-1.3-19-4-25.3-6.4-6.3-2.4-11.2-5.3-12.2-8-1.1-2.8 1.1-5.7 5.9-8.4a87 87 0 0 1 22.7-7.8c9.2-1.8 20.6-3.2 32.7-3 12 0 32.2 3 39.8 3.8 7.6.8 6.3.9 5.8 1M49.8 10c9-1.6 22.2-1.3 33.3-.7a248 248 0 0 1 33.3 4.3 59.9 59.9 0 0 1 19.8 6.7c4.3 2.8 6.5 7.2 5.6 10.1-.8 3-4.2 5.5-10.8 7.8a199.5 199.5 0 0 1-62.2 8c-11-.4-23.8-3-32.7-4.8A78 78 0 0 1 15.3 35c-4.4-2.6-6.7-6.4-5.5-9.3C11 23 15.6 20.1 22.4 18c6.7-2.1 23.4-3.9 28-5.1 4.7-1.3-.6-2.6-.3-2.4"
          />
        </svg>

        <p className="text-sm">
          A simple and clean todo list app.
          <svg
            className="absolute -top-10 left-1/2 size-56 -translate-x-1/2 text-primary/50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 117.6 25.4"
            stroke="currentColor"
          >
            <motion.path
              fill="none"
              strokeLinecap="round"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              d="M102.8 14.3c-4.4-.4-11.4.6-26.6.3-15.2-.3-53.6-1.8-64.6-2.2m96-.8c-4.5 0-16-2.1-32.3-1.5-16.3.7-54.4 4.6-65.3 5.3"
            />
          </svg>
        </p>
      </motion.div>
      <motion.div
        className="absolute bottom-44 right-1/2"
        transition={{ delay: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        Try it out!
        <svg
          className="absolute left-10 top-6 size-20 rotate-180 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 62.3 93"
          stroke="currentColor"
        >
          <g fill="none" strokeLinecap="round" strokeWidth="2">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              d="M50.4 83c-5-6.3-23.4-25-30.1-37.2C13.5 33.6 11.6 15.9 10 10m42.3 71.9C47.8 75.7 29 59 22.3 47.3c-6.6-11.7-8-29.9-9.9-35.9"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
              d="M22.4 27.2a82.9 82.9 0 0 0-10-15.8m10 15.8c-3.7-4.9-7-9-10-15.8"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
              d="M9.9 30c0-5.7 1-9.2 2.5-18.6M10 29.9c.2-5.7.8-10.7 2.5-18.5"
            />
          </g>
        </svg>
      </motion.div>
    </li>
  );
};

export default EmptyState;
