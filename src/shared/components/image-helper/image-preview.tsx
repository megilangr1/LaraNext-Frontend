"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SingleLightboxWrapper from "../lightbox/single-lightbox-wrapper";

export function ImagePreview({ file }: { file: File }) {
  const [preview, setPreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      requestAnimationFrame(() => setPreview(objectUrl));

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return preview ? (
    <SingleLightboxWrapper src={preview}>
      <Image
        src={preview}
        alt=""
        className="aspect-square rounded-lg object-cover"
        width={128}
        height={128}
      />
    </SingleLightboxWrapper>
  ) : (
    <div className="w-32 flex items-center justify-center rounded-lg">
      <ImageOff className="shrink-0 size-4" />
    </div>
  );
}
