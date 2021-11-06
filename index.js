import assert from "assert";
import {merge_images_core} from "./merge_images_core.js";

console.log(process.argv)

assert(process.argv.length > 3, "参数不足")

const target_img = process.argv[process.argv.length - 1];
const source_imgs = process.argv.slice(2, process.argv.length - 1);
merge_images_core(target_img, source_imgs)
    .then(() => {
        console.log("finished")
    })