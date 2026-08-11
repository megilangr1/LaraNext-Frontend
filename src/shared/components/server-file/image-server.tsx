"use client";

import Image from "next/image";
import SingleLightboxWrapper from "../lightbox/single-lightbox-wrapper";

export function ImageServer({ url }: { url: string }) {
  return (
    <SingleLightboxWrapper src={url}>
      <Image
        src={url}
        alt=""
        className="aspect-square rounded-lg object-cover"
        width={128}
        height={128}
        unoptimized
      />
    </SingleLightboxWrapper>
  );
}
