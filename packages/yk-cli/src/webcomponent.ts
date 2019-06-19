import { Optional } from "./interface/option";
import { readFileList } from "./util/readFileList";
import { renderTemplate } from "./util/render";
import fs from 'fs';
import path from 'path';



function convert(type: "sass" | "css" | "less"): string {

    if (type === "sass") {
        return "scss"
    }
    else {
        return type;
    }
}

/**
 * 编译现有组件模板
 *
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export async function component(option: Optional): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const webpath = path.resolve(__dirname, "../tpl/web");
        /** 递归获取web下所有的组件文件模板 */
        const list = readFileList(webpath, []);
        list.forEach(p => {
            /** 处理所有样式 css/less/scss 模板 */
            if (p.indexOf('.css.nj') > -1) {
                let filepath: string | null = null;
                let filepath_perfix: string = path.resolve(`./${option.appname!}/web/${p.replace(webpath + "/", "").replace(".css.nj", "")}`);
                /** js 版本对应的是 *.less */
                if (option.language === "javascript") {
                    filepath = filepath_perfix + ".less";
                }
                /** ts 版本对应的是 *.module.scss */
                else if (option.language === "typescript") {
                    filepath = filepath_perfix.indexOf('assets') > -1 ? filepath_perfix + ".scss" : filepath_perfix + ".module.scss";
                }
                /** 把对应的 旧 less / module.scss 文件删除 写入新的 css / scss / less 文件 */
                if (filepath && fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                    const newfilepath = `${filepath_perfix}${option.language === "typescript" && filepath.indexOf('assets') === -1 ? ".module" : ""}.${convert(option.style!)}`
                    renderTemplate(p, newfilepath, option)
                }
            }
            /** 处理所有的react-javascript组件模板 */
            else if (p.indexOf('.js.nj') > -1 && option.language === "javascript") {
                let filepath: string = path.resolve(`./${option.appname!}/web/${p.replace(webpath + "/", "").replace(".js.nj", ".js")}`);
                renderTemplate(p, filepath, option);
            }
            /** 处理所有的react-typescript组件模板 */
            else if (p.indexOf('.tsx.nj') > -1 && option.language === "typescript") {
                let filepath: string = path.resolve(`./${option.appname!}/web/${p.replace(webpath + "/", "").replace(".tsx.nj", ".tsx")}`);
                renderTemplate(p, filepath, option);
            }
            /** 处理所有的模块类声明 */
            else if (p.indexOf('.style.d.ts.nj') > -1) {
                let filepath: string | null = null;
                let filepath_perfix: string = path.resolve(`./${option.appname!}/web/${p.replace(webpath + "/", "").replace(".style.d.ts.nj", "")}`);
                filepath = filepath_perfix + ".scss.d.ts";
                /** 替换less.d.ts || css.d.ts */
                if (filepath && fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                    const newfilepath = `${filepath_perfix}.${convert(option.style!)}.d.ts`;
                    renderTemplate(p, newfilepath, option);
                }
            }
        })
    });
}