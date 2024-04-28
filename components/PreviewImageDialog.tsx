
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog"
import Image from "next/image"

export function PreviewImageDialog(
    { selectedFile,
        close,
        imageChange,
        setFlag
    }: {
        selectedFile: string,
        close: () => void,
        imageChange: any,
        setFlag: any
    }) {

    return (
        <Dialog open={!!selectedFile}>
            <DialogContent onInteractOutside={close} className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col">
                <DialogHeader>
                    <div className="flex items-center relative h-3/4 my-auto">
                        <Image
                            src={selectedFile}
                            alt='selected file'
                            width={400}
                            height={400}
                            className="rounded-md border mx-auto border-gray-400 object-contain"
                        />
                    </div>
                </DialogHeader>

                <DialogFooter className="mx-auto flex items-center">
                    <DialogClose asChild>
                        <Button className="rounded-full" variant={'destructive'} onClick={close} size={'sm'}>Cancel</Button>
                    </DialogClose>
                    <Button className="rounded-full" onClick={imageChange} size={'sm'}>Change</Button>
                    <Button className="rounded-full px-4 bg-green-500 hover:bg-green-400" onClick={() => setFlag && setFlag(true)} size={'sm'}>Next</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
