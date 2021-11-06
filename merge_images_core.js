import mergeImg from 'merge-img';
import assert from "assert"
import fs from "fs";
import path from "path";

const QUALIFIED_IMG_TYPES = ["png", "jpg", "jpeg"];

let target_img_name = "target_img.png"
const source_imgs = [
    "/Users/mark/Pictures/截图/硅谷/sample.png",
    "/Users/mark/Pictures/截图/硅谷/sample.png"
]


// 函数实现，参数单位 毫秒 ；
function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export const merge_images_core = async (root_name, source_imgs) => {

    console.log("processing imgs…")

    assert(root_name.search(/\./) === -1, "root name can't include '.'")
    const source_dir = path.dirname(source_imgs[0])
    const root_dir = path.join(source_dir, root_name)
    assert(!fs.existsSync(root_dir), "root directory has existed");
    console.log("create root: " + root_dir)
    fs.mkdirSync(root_dir)
    console.log("create source dir in root")
    const root_source_dir = path.join(root_dir, "source")
    console.log("create target dir in root")
    const root_target_dir = path.join(root_dir, "target")
    fs.mkdirSync(root_source_dir)
    fs.mkdirSync(root_target_dir)

    const res = await mergeImg(source_imgs, {direction: true});

    // Save image as file
    const target_img_name = root_name + "." + QUALIFIED_IMG_TYPES[0]
    const target_img_path = path.join(root_target_dir, target_img_name)
    console.log("writing joined image into target path: " + target_img_path)
    await res.write(target_img_path);
    console.log("wrote")

    await sleep(1000)

    // moving imgs
    source_imgs.forEach(former_img_path => {
        console.log("moving img <" + former_img_path + ">")
        const img_name = path.basename(former_img_path)
        const target_img_path = path.join(root_source_dir, img_name);
        fs.rename(former_img_path, target_img_path, err => {
            if (err) console.warn("moving error: " + err.message);
            else console.log("moved img <" + former_img_path + ">")
        })
    })

}

export default merge_images_core
