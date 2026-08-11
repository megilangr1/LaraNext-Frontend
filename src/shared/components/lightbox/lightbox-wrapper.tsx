"use client";

import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export type LightboxSlide = Slide & {
  title?: string;
  description?: string;
};

interface LightboxWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: LightboxSlide[];
  index?: number;
}

export default function LightboxWrapper({
  open,
  onOpenChange,
  slides,
  index = 0,
}: LightboxWrapperProps) {
  return (
    <Lightbox
      open={open}
      index={index}
      close={() => onOpenChange(false)}
      slides={slides}
      plugins={[Captions]}
      styles={{
        container: {
          backgroundColor: "rgba(0,0,0,.4)",
        },
      }}
    />
  );
}
