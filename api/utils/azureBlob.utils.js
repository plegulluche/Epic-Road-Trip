
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} = require('@azure/storage-blob');

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const staticMapContainer = 'staticmaps';
const placeImagesContainer = 'placeimages';
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);

const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    pipeline
);



const getBlobName = originalName => {
    // Use a random number to generate a unique file name, 
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}.jpg`;
};

function uploadMapImageToAzureBlob(blob, name) {
    try {
        const containerClient = blobServiceClient.getContainerClient(staticMapContainer);
        //if container does not exist, create it
        const created = async () => await containerClient.createIfNotExists();
        created();

    } catch (error) {
        console.log(error);
    } finally {
        console.log('finally');
    }

    const blobName = getBlobName(name);
    const blobUrl = blobServiceClient.url;
    const containerName = staticMapContainer;
    const blobPromise = new Promise((resolve, reject) => {
        const blockBlobClient = blobServiceClient.getContainerClient(staticMapContainer).getBlockBlobClient(blobName);
        const uploadBlobResponse = blockBlobClient.uploadData(blob, { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
        resolve(uploadBlobResponse);
    });

    return { blobPromise, blobName, blobUrl, containerName };
}

function uploadPlaceImagesToAzureBlob(blobArray, name) {
    try {
        const containerClient = blobServiceClient.getContainerClient(placeImagesContainer);
        //if container does not exist, create it
        const created = async () => await containerClient.createIfNotExists();
        created();

    } catch (error) {
        console.log(error);
    } finally {
        console.log('finally');
    }

    // const blobName = getBlobName(name);
    // const blobUrl = blobServiceClient.url;
    // const containerName = placeImagesContainer;
    // const blobPromise = new Promise((resolve, reject) => {
    //     const blockBlobClient = blobServiceClient.getContainerClient(placeImagesContainer).getBlockBlobClient(blobName);
    //     const uploadBlobResponse = blockBlobClient.uploadData(blob, { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
    //     resolve(uploadBlobResponse);
    // });

    //blobArray is an array of images in arraybuffer format, name is the name of the place
    // the purpose of this function is to upload all the images in the array to azure blob storage
    // each image will be named with the name of the place and a number to differentiate them
    // the function will return an array of promises, each promise will resolve to the url of the image
    // the urls will be used to update the place document in the database

    const blobUrl = blobServiceClient.url;
    const containerName = placeImagesContainer;
    const blobPromises = [];
    for (let i = 0; i < blobArray.length; i++) {
        const blobName = `${name}-${i}.jpg`;
        const blobPromise = new Promise((resolve, reject) => {
            const blockBlobClient = blobServiceClient.getContainerClient(placeImagesContainer).getBlockBlobClient(blobName);
            const uploadBlobResponse = blockBlobClient.uploadData(blobArray[i], { blobHTTPHeaders: { blobContentType: "image/jpeg" } });
            resolve(uploadBlobResponse);
        });
        blobPromises.push(blobPromise);
    }
    return { blobPromises, blobUrl, containerName };
}




module.exports = { uploadMapImageToAzureBlob, uploadPlaceImagesToAzureBlob };