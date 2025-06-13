"use client"
import { ImageUp, Loader } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { changeProfileImage } from "../../_actions/change-image"
import { updateProfileImage } from "../../_actions/update-profile-image"
import { toast } from "sonner"

interface ProfileImageProps {
  image: string | null
  userId: string
}

export function ProfileImage({ image, userId }: ProfileImageProps) {
  const [imagePreview, setImagePreview] = useState(image)
  const [loading, setLoading] = useState(false)

  async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]
      const response = await changeProfileImage(image, userId)

      if (response?.data) {
        setImagePreview(response.data.secure_url)
        updateProfileImage(response.data.secure_url, userId)
      } else {
        setLoading(false)
        toast.error(response.error)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative h-20 w-20">
        <Image
          src={imagePreview ? imagePreview : "/avatar-default.png"}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
          alt="imagem de perfil"
          onLoad={() => setLoading(false)}
        />
        {loading && (
          <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center rounded-full bg-zinc-900/70">
            <Loader className="animate-spin text-zinc-400" />
          </div>
        )}
      </div>

      <label
        htmlFor="image"
        className="dark:text-default flex cursor-pointer items-center text-zinc-600"
      >
        <ImageUp className="h-5 w-5" />
        Alterar
      </label>
      <input
        type="file"
        id="image"
        className="hidden"
        onChange={handleChangeImage}
      />
    </div>
  )
}
