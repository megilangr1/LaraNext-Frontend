"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Zoom } from "yet-another-react-lightbox/plugins";

interface SingleLightboxWrapperProps {
  src: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function SingleLightboxWrapper({
  src,
  title,
  description,
  children,
}: SingleLightboxWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Lightbox
        open={open}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .6)" } }}
        close={() => setOpen(false)}
        plugins={[Captions, Zoom]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
        }}
        slides={[
          {
            src,
            title,
            description,
          },
        ]}
      />
    </>
  );
}
