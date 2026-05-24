"use client";

import Image, { type ImageProps } from "next/image";
import { type VideoHTMLAttributes, useState } from "react";

type SmoothImageProps = ImageProps & {
  wrapperClassName?: string;
  placeholderClassName?: string;
};

type SmoothVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
  placeholderClassName?: string;
};

const placeholderBase =
  "pointer-events-none absolute inset-0 bg-foreground/[0.035] transition-opacity duration-700 ease-out motion-reduce:transition-none";

const mediaTransition =
  "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-opacity motion-reduce:scale-100";

function placeholderClass(loaded: boolean, className = "") {
  return [
    placeholderBase,
    loaded ? "opacity-0" : "opacity-100",
    className,
  ].join(" ");
}

function mediaClass(loaded: boolean, className = "") {
  return [
    className,
    mediaTransition,
    loaded ? "opacity-100" : "opacity-0",
  ].join(" ");
}

export function SmoothImage({
  wrapperClassName = "",
  placeholderClassName = "",
  className = "",
  alt,
  onLoad,
  ...props
}: SmoothImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={[
        "relative block overflow-hidden bg-background",
        wrapperClassName,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={placeholderClass(loaded, placeholderClassName)}
      />
      <Image
        {...props}
        alt={alt}
        className={mediaClass(loaded, className)}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </span>
  );
}

export function SmoothVideo({
  wrapperClassName = "",
  placeholderClassName = "",
  className = "",
  onLoadedData,
  children,
  ...props
}: SmoothVideoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={[
        "relative block overflow-hidden bg-background",
        wrapperClassName,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={placeholderClass(loaded, placeholderClassName)}
      />
      <video
        {...props}
        className={mediaClass(loaded, className)}
        onLoadedData={(event) => {
          setLoaded(true);
          onLoadedData?.(event);
        }}
      >
        {children}
      </video>
    </span>
  );
}
