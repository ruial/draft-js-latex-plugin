# Draft.js LaTeX Plugin

A Draft.js plugin to render and edit LaTeX. Modified this [KaTeX module](https://github.com/MunifTanjim/draft-js-modules) to make it compatible with the widely used [draft-js-plugins architecture](https://github.com/draft-js-plugins/draft-js-plugins).

## Setup

```sh
npm i draft-js-latex-plugin
```

## Usage

```javascript
import { getLaTeXPlugin } from 'draft-js-latex-plugin'
import 'draft-js-latex-plugin/lib/styles.css'
import 'katex/dist/katex.min.css'

const LaTeXPlugin = getLaTeXPlugin()

const plugins = [LaTeXPlugin]
```

## Key bindings

- Press $ for starting Inline TeX
- Press CMD + M for starting Tex Block
- To write the $ character, type \\$
