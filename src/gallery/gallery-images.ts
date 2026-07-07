const images = import.meta.glob<{ default: ImageMetadata }>(
    "../images/*.webp",
    { eager: true },
);

const captions: Record<string, string> = {
    "golden-retriever-puppy-closeup": "Those puppy eyes 🥺",
    "maria-with-nala": "Best friends from day one 💛",
    "golden-retriever-on-couch": "Home base, secured 🛋️",
    "golden-retriever-on-bed": "Off exploring (the bed) 🛰️",
    "nala-playing": "Field training in progress 🎾",
    "nala-portrait": "Official portrait 📷",
    "nala-sleeping": "Rest and recovery 💤",
    nala1: "Space cadet at ease 🌟",
    nala2: "Mission accomplished! 🚀",
    nalita: "Reporting for duty 🐕",
};

export interface GalleryImage {
    src: ImageMetadata;
    alt: string;
    caption: string;
    filename: string;
}

export const galleryImages: GalleryImage[] = Object.entries(images).map(
    ([path, module]) => {
        const filename = path.split("/").pop()?.replace(".webp", "") ?? "";
        return {
            src: module.default,
            alt: `Nala the golden retriever — ${filename.replace(/-/g, " ")}`,
            caption: captions[filename] ?? "Adventures with Nala ✨",
            filename,
        };
    },
);
