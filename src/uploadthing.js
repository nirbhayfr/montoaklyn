import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers({
	url: "http://localhost:3001/api/uploadthing",
});
