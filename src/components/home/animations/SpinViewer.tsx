import { motion } from "framer-motion";
import Image from "next/image";
import * as SpinImages from "@/data/images/SpinImages";

const SpinImagesArray = Object.values(SpinImages);

export const SpinViewer = () => {
  return (
    <div className="relative flex h-60 w-60 items-center justify-center">
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: "600px" }}
      >
        <motion.div
          className="relative flex h-full w-full items-center justify-center"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {SpinImagesArray.map((src, index) => (
            <motion.div
              key={index}
              className="absolute flex h-full w-full items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${index * (360 / SpinImagesArray.length)}deg) translateZ(${130 + index * 30}px)`,
              }}
            >
              <div className="relative h-40 w-80">
                <Image
                  src={src}
                  alt={`Client ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg border border-gray-400 shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
