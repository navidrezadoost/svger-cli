# Technical Design Report: SVG Integration Methods in React (TDR)

# Version: 0.0.1

#  Date: 10/13/25

# Owner: engineer Ehsan jafari

# Attendees: Navid Rezadoost , Faeze Mohadespor , Amir Bazgir , Ehsan Jafari 

# Link : https://docs.google.com/document/d/1b04_V01xOvLiSMzuPdaRynANlnt2wYdJ_vjs9MAqtn4/edit?tab=t.0

## 1\. Introduction

This document compares five common methods for integrating and managing SVG icons in React projects. The goal is to provide a detailed guide for choosing the appropriate method considering **performance, maintainability, flexibility, and bundle size**.

---

## 2\. Methods

### Method 1: Loading SVGs from the Public Folder (Runtime Fetch)

SVG files are stored in public/assets/icons/svg/ and fetched at runtime.

| function SvgIcon({ name, ...props }) {  const \[svg, setSvg\] \= React.useState(null);  React.useEffect(() \=\> {    fetch(\`/assets/icons/svg/${name}.svg\`)      .then(res \=\> res.text())      .then(setSvg);  }, \[name\]);  return svg ? (    \<span {...props} dangerouslySetInnerHTML={{ \_\_html: svg }} /\>  ) : null;} |
| :---- |

**Pros:** \- ✅ Small bundle size \- ✅ Easy icon replacement without rebuild \- ✅ Suitable for dynamic icon sets

**Cons:** \- ⚠️ Network request at runtime (slower) \- ⚠️ Cannot directly apply props to SVG \- ⚠️ Requires async logic (useEffect \+ useState)

**Performance:** CPU low | RAM low | Build Time fast

---

### Method 2: Using SVGR

SVG files are converted to React components with props.

| import { ReactComponent as StarIcon } from './icons/star.svg';export const Example \= () \=\> \<StarIcon width={24} height={24} fill="gold" /\>; |
| :---- |

**Pros:** \- ✅ Direct prop manipulation \- ✅ Easy bundler integration \- ✅ Automatic SVG optimization

**Cons:** \- ⚠️ All SVGs included in bundle → increases size \- ⚠️ Rebuild can overwrite manual changes \- ⚠️ Slightly longer build time

**Performance:** CPU moderate | RAM higher during build | Build Time slightly slower

---

### Method 3: Custom svg-to-react Script

Automatically converts all SVG files to React components with new and all modes.

| yarn svg-to-react:all\# oryarn svg-to-react:new |
| :---- |

Script:

| import fs from "fs";import path from "path";import { fileURLToPath } from "url";const \_\_filename \= fileURLToPath(import.meta.url);const \_\_dirname \= path.dirname(\_\_filename);const inputDir \= path.join(\_\_dirname, "../public/assets/icons/svg");const outputDir \= path.join(\_\_dirname, "../public/assets/icons/svgComponent");if (\!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });// Get argument from command line// 'new' \=\> only new files// 'all' \=\> rebuild all files (except MANUAL\_EDIT)const mode \= process.argv\[2\] || "all";const files \= fs.readdirSync(inputDir).filter((f) \=\> f.endsWith(".svg"));for (const file of files) { const componentName \= path.basename(file, ".svg").replace(/\[^a-zA-Z0-9\]/g, "\_") \+ "Icon"; const outputPath \= path.join(outputDir, \`${componentName}.jsx\`); // Check if file exists and MANUAL\_EDIT comment if (fs.existsSync(outputPath)) {   const existingContent \= fs.readFileSync(outputPath, "utf8");   if (existingContent.includes("// MANUAL\_EDIT")) {     console.log(\`✋ Skipped manual icon: ${componentName}\`);     continue;   }   if (mode \=== "new") {     console.log(\`⏭ Skipped existing icon (new mode): ${componentName}\`);     continue;   } } let svgContent \= fs.readFileSync(path.join(inputDir, file), "utf8"); // Clean up SVG for JSX svgContent \= svgContent   .replace(/\<\\?xml.\*?\\?\>/g, "")   .replace(/\<\!DOCTYPE.\*?\>/g, "")   .replace(/\\s+xmlns(:xlink)?="\[^"\]\*"/g, "")   .replace(/\\s+xlink:\[^=\]+="\[^"\]\*"/g, "")   .replace(/\<(path|rect|circle|ellipse|line|polyline|polygon)(\[^\>\]\*?)(?\<\!\\/)\>/g, "\<$1$2 /\>")   .replace(/\\s+style="\[^"\]\*"/g, "")   .replace(/\\s+fill="\[^"\]\*"/g, "")   .replace(/\<path(\[^\>\]\*)\\/\>/g, \`\<path$1 fill="currentColor" /\>\`); svgContent \= svgContent.replace(   /\<svg(\[^\>\]\*)\>/,   \`\<svg$1 {...props} xmlns="http://www.w3.org/2000/svg"\>\` ); const component \= \`import React from "react";// MANUAL\_EDIT: remove this comment if you manually edit this iconexport const ${componentName} \= (props) \=\> ( ${svgContent.trim()});\`; fs.writeFileSync(outputPath, component, "utf8"); console.log(\`✅ Created/Updated: ${componentName}\`);}console.log(\`🎉 SVG processing done\! Mode: ${mode}\`); |
| :---- |

**Pros:** \- ✅ Full control over generation \- ✅ MANUAL\_EDIT protects custom edits \- ✅ Consistent components with unified props \- ✅ No runtime fetching

**Cons:** \- ⚠️ Requires script maintenance \- ⚠️ Initial generation for large sets can take time \- ⚠️ Must rerun when new SVGs are added

**Performance:** CPU low at runtime | RAM minimal | Build Time fast

---

### Method 4: Synchronous XMLHttpRequest Inline Loader

Loads SVGs from the public folder synchronously and allows inline manipulation.

| import React from "react";export const SvgIcon \= ({ src, width, height, fill, keepOriginalColor \= false, className }) \=\> {  let svgContent \= "";  try {    const xhr \= new XMLHttpRequest();    xhr.open("GET", src, false);    xhr.send(null);    if (xhr.status \=== 200) {      svgContent \= xhr.responseText;      if (width) svgContent \= svgContent.replace(/width="\[^"\]\*"/, \`width="${width}"\`);      if (height) svgContent \= svgContent.replace(/height="\[^"\]\*"/, \`height="${height}"\`);      if (fill && \!keepOriginalColor) {        svgContent \= svgContent          .replace(/fill="\[^"\]\*"/g, \`fill="${fill}"\`)          .replace(/\<path(?\!\[^\>\]\*fill)/g, \`\<path fill="${fill}"\`);      }    }  } catch (e) {    console.error("SvgIcon load error:", e);  }  if (\!svgContent) return null;  return \<span className={className} dangerouslySetInnerHTML={{ \_\_html: svgContent }} /\>;}; |
| :---- |

**Pros:** ✔️ Simple | ✔️ Inline control | ✔️ Suitable for low-frequency rendering **Cons:** ⚠️ Blocks main thread | ⚠️ Not for large-scale | ⚠️ SSR issues

---

### Method 5: Using react-svg Library

Dynamically loads and injects SVGs into the DOM with full control.

| import { ReactSVG } from 'react-svg';export const ExampleIcon \= () \=\> (  \<ReactSVG    src="/assets/icons/truck.svg"    beforeInjection={(svg) \=\> { svg.classList.add('svg-class-name'); svg.setAttribute('style', 'width: 200px'); }}    afterInjection={(svg) \=\> { console.log(svg); }}    className="wrapper-class-name"    loading={() \=\> \<span\>Loading...\</span\>}    fallback={() \=\> \<span\>Error\!\</span\>}    wrapper="span"    evalScripts="always"  /\>); |
| :---- |

**Performance & Features:** \- Network: fetch per icon (cached if enabled) \- Bundle Size: smaller than SVGR \- CPU: light but includes DOM parsing \- RAM: minimal

---

## 3\. Final Comparison Table

| Feature | Public Fetch | SVGR | Custom Script | XHR Sync | react-svg |
| :---- | :---- | :---- | :---- | :---- | :---- |
|  |  |  |  |  |  |
| Bundle Size | ✅ Small | ⚠️ Medium | ✅ Small | ✅ Small | ✅ Small |
|  |  |  |  |  |  |
| Runtime Performance | ⚠️ Slower | ✅ Fast | ✅ Fast | ⚠️ Moderate | ✅ Fast |
| Build Time | ✅ Fast | ⚠️ Moderate | ✅ Fast | ✅ Fast | ✅ Fast |
| Customization | ❌ Limited | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Manual Control | ❌ No | ⚠️ Partial | ✅ Full | ✅ Full | ✅ Full |
| Dynamic Updates | ✅ Easy | ❌ Needs rebuild | ⚠️ Needs rerun | ❌ Static | ✅ Dynamic |
| Setup Complexity | ✅ Simple | ✅ Simple | ⚠️ Requires Script | ✅ Simple | ✅ Simple |

## ---

## 4\. Conclusion

* For **high-performance and fully controllable projects** → **Custom svg-to-react script**

* For **fast, dynamic loading** → **react-svg** or **Public Fetch**

* For **small, simple projects** → **XHR Sync** or **Public Fetch**