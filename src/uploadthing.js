import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers({
	url: "https://monto-backend.onrender.com/api/uploadthing",
});
