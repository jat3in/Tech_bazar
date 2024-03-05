import {v2 as cloudnairy} from 'cloudinary'
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME, 
  api_key: process.env.CLOUDNAIRY_API_KEY, 
  api_secret: process.env.CLOUDNAIRY_API_SECRET 
});

const uploadOnCloudnairy = async (localFilePath) => {
    try{

        if(!localFilePath) return null
        // upload the file on cloudniary

      const response = await  cloudnairy.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file has been successfully uploaded
        console.log("file is uploaded on cloudnairy", response.url);
        return response;
    }catch (error){
            fs.unlinkSync(localFilePath) // remove the locallly saved file as the upload oprations got failed
            return null;
    }
}


export {uploadOnCloudnairy};