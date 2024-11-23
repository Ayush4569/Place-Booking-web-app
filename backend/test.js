// console.log(new Date().toISOString().split("T")[0]);
// console.log( new Date().toISOString());
// cloudinary.v2.api
//   .delete_resources(['viyv3heej34qz5xnjmrq', 'h75fqbcak0k8z5ynuth6', 'owcphxh0j2deawtqomsy', 'ptmqab8phep2bfrwnbah', 'ps7ofo0am6lxvllgmnju', 'jxdpqr3yohrqghsmmfcs', 'z81wspkyls3snojiugfb', 'pjrxilbfmkbmhxkxflaa', 'xlzrwji4tc6krvqmldai', 'vkkndrnsfjqc3qlgybko'], 
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);


// let title = ''
// console.log(!title?.trim());

// import {} from "./services/CountryCodes.json"
import fs from "node:fs"

fs.readFile("./services/CountryCodes.json",(err,data)=>{
    if (err) {  
        console.error('Error reading file:', err);  
        return;  
      }  
    const jsonData = JSON.parse(data);
    jsonData.forEach((country)=>{
        console.log(country.dial_code);
    })
})