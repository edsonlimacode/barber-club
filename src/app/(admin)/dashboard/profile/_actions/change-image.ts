/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDENARY_NAME as string,
  api_key: process.env.CLOUDENARY_API_KEY,
  api_secret: process.env.CLOUDENARY_API_SECRET
})

const types = ["image/jpg", "image/jpeg", "image/png"]

interface ResponseProps {
  secure_url: string
}

export async function changeProfileImage(file: File, userId: string) {
  try {
    if (!types.includes(file.type)) {
      return {
        error: "Formato incorreto, apenas PNG, JPG e JPEG são permitidos"
      }
    }

    const newFile = new File([file], `${userId}`, {
      type: file.type,
      lastModified: file.lastModified
    })

    const fileBuffer = await newFile.arrayBuffer()
    const buffer = new Uint8Array(fileBuffer)

    const results = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: [`${userId}`],
            public_id: newFile.name
          },
          function (error, result) {
            if (error) {
              return reject(error)
            }
            resolve(result)
          }
        )
        .end(buffer)
    })

    const uploadResult = (await results) as ResponseProps

    return {
      data: uploadResult
    }
  } catch (error: any) {
    console.log("ERROR:", error.message)
    return {
      error: error.message
    }
  }
}
