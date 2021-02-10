# Draft.js LaTeX Plugin

A Draft.js plugin to render and edit LaTeX. Modified this [KaTeX module](https://github.com/MunifTanjim/draft-js-modules) to make it compatible with the widely used [draft-js-plugins architecture](https://github.com/draft-js-plugins/draft-js-plugins).

## Setup

```sh
npm i draft-js-latex-plugin
```

## Usage

```javascript
import { getKaTeXPlugin } from 'draft-js-latex-plugin'
import 'draft-js-latex-plugin/katex/dist/styles.css'
import 'katex/dist/katex.min.css'

const KaTeXPlugin = getKaTeXPlugin()

const plugins = [KaTeXPlugin]
```

## Key bindings

- Press $ for starting Inline TeX
- Press CMD + M for starting Tex Block
- To write the $ character, type \\$
