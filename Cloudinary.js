
import { Cloudinary } from "@cloudinary/url-gen";
import {CLOUD_NAME} from "@env";

export const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });


// Cloudinary experiment:
// import { AdvancedImage } from 'cloudinary-react-native';
// import { sepia } from "@cloudinary/url-gen/actions/effect";
// myImage.effect(sepia()); // add sepia effect!

// cambiar a un atributo de activity
// const myImage = cld.image('PetPals/nbgzcrq0gafkkiafmkeq');
// console.log(myImage.toURL()) // https://res.cloudinary.com/dp7zuvv8c/image/upload/cld-sample-5?_a=DATAdtAAZAA0

