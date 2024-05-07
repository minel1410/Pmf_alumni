import { cn } from "@/lib/utils";

const Avatar = ({ 
  className,
  src,
  alt
 }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "relative inline-block h-36 w-36 !rounded-full  object-cover object-center",
        className,
      )}
    />
  );
};

export default Avatar;
