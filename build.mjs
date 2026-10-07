// 使い方: npm install → npm run build で index.html を作り直します
import { build } from "esbuild";
import { readFileSync, writeFileSync } from "fs";

const out = await build({
  entryPoints: ["src/main.jsx"], bundle: true, minify: true, format: "iife", write: false,
  jsx: "automatic", loader: { ".jsx": "jsx" }, define: { "process.env.NODE_ENV": '"production"' },
});
const js = out.outputFiles[0].text.replace(/<\/script/g, "<\\/script");
const shim = readFileSync("src/shim.js", "utf8");
const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>教科書メーカー | LESSON STATION</title>
<meta name="description" content="学生と文法を入れるだけで、会話・文法・練習問題・活動の日本語教科書が作れるAIツール" />
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📘</text></svg>" />
<style>html,body{margin:0;background:#03050C}</style>
</head>
<body>
<div id="root"></div>
<script>
${shim}
</script>
<script>
${js}
</script>
</body>
</html>
`;
writeFileSync("index.html", html);
console.log("index.html を作りました");
