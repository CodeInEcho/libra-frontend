"use client";
import { XIcon } from "lucide-react";
import { ProductImages } from "@/lib/types";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import type { FileWithPath } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing-generate-react-helpers";

export function ProductImageUploader(props: {
  type?: string
  newImages: ProductImages[];
  setNewImages: React.Dispatch<React.SetStateAction<ProductImages[]>>;
  // imagesToDelete: ProductImages[];
  // setImagesToDelete: React.Dispatch<React.SetStateAction<ProductImages[]>>;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const { type = "multiple" } = props;
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    startUpload(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image"]),
  });

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: (data) => {
      setFiles([]);
      if (!data) return;
      props.setNewImages(prevState => [...prevState, ...data.map((item: any) => {
        return {
          url: item.fileUrl,
          id: item.fileKey,
          alt: item.fileKey.split("_")[1],
        };
      })]);
    },
    onUploadError: () => {
      toast({
        title: "Sorry, an error occured while uploading your image(s).",
      });
    },
  });

  return (
    <div>
      <ul className={`${type === 'multiple' ? 'flex items-center justify-start' : 'inline-block'} mt-2 bg-[#F5F5F5] p-4 rounded-md  gap-2 flex-wrap`}>
        {[...props.newImages]
        .map((image) => (
          <div key={image.id}>
            <li className="relative w-36 h-36">
              <img
                src={image.url}
                alt={image.alt ?? ""}
                className="object-cover w-36 h-36 rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  const images = props.newImages.filter(item => item.id !== image.id)
                  props.setNewImages(images);
                }}
                className="absolute top-2 right-2 ml-28 bg-white rounded-full w-5 h-5 flex items-center justify-center"
              >
                <XIcon className="w-3 h-3" />
              </button>
            </li>
          </div>
        ))}
        { (type === 'multiple' || (type !== 'multiple' && props.newImages.length === 0)) && (
          <div
            {...getRootProps()}
            className="border-border border-2 rounded-md border-dashed w-36 h-36"
          >
            <p className="items-center justify-center flex relative top-[50px] flex-col text-sm">
              <span className="font-semibold mr-1">Click to upload</span>
              <span>or drag and drop.</span>
              <span className="text-xs text-muted-foreground">
                (Max {permittedFileInfo?.config.image?.maxFileSize})
              </span>
            </p>
            <input
              id="product-images"
              className="relative z-10 h-[100px] border-2 opacity-0 w-full"
              {...getInputProps()}
              style={{ display: "block" }}
            />
          </div>
        ) }
      </ul>
    </div>
  );
}