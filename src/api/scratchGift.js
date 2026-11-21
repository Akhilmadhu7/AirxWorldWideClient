import { httpGet, httpPatch, httpDelete, httpPost } from "./httpMethods";

const ScratchGiftBaseUrl = `${import.meta.env.VITE_API_BASE_URL}v1/scratch-win`;

export const scratchGiftAPI = {
    createScratchGift: (data, headers={}) =>
        httpPost({url: `${ScratchGiftBaseUrl}/scratch`, data, headers}),

    claimScratchGift: (data, headers={}) =>
        httpPost({url: `${ScratchGiftBaseUrl}/claim`, data, headers})
}