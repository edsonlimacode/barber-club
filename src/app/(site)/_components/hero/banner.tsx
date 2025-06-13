import Image from "next/image"

export function Banner() {
  return (
    <>
      <div className="relative z-10 h-full w-full bg-black/90" />
      <Image
        src="/hero4.jpg"
        fill
        priority
        className="object-cover"
        quality={100}
        alt="hero "
      />
    </>
  )
}
