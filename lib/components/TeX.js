import katex from 'katex';
import React, { useMemo } from 'react';
const componentMap = {
    INLINETEX: 'span',
    TEXBLOCK: 'div'
};
function TeX({ state, onClick, onError, ...props }) {
    const { tex, type } = state;
    const Component = useMemo(() => componentMap[type], [type]);
    const displayMode = useMemo(() => type === 'TEXBLOCK', [type]);
    const __html = useMemo(() => {
        let html = '';
        try {
            html = katex.renderToString(tex, {
                displayMode,
                throwOnError: typeof onError === 'function'
            });
        }
        catch (err) {
            html = katex.renderToString(tex, { displayMode, throwOnError: false });
            onError(err, html);
        }
        return html;
    }, [displayMode, onError, tex]);
    return (React.createElement(Component, Object.assign({ className: "TeX", contentEditable: false, onClick: onClick, dangerouslySetInnerHTML: { __html } }, props)));
}
export default TeX;
