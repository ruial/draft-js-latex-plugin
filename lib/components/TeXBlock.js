import React, { useCallback } from 'react';
import { saveTeXBlock } from '../modifiers/saveTeX';
import { useTeXUtils } from '../utils/useTeXUtils';
import TeX from './TeX';
import TeXInput from './TeXInput';
const getInitialState = (block) => {
    const { tex, type } = block.getData().toObject();
    return {
        editing: tex.length === 0,
        tex,
        type
    };
};
function TeXBlock({ block, blockProps: { store, internals }, contentState }) {
    const blockKey = block.getKey();
    const { state, setState, getCaretPos, submitTeX, onClickEdit } = useTeXUtils(getInitialState.bind(null, block), store, internals, blockKey);
    const finishEditing = useCallback((after) => {
        setState({ editing: false });
        const { tex, type } = state;
        const [newContentState, newSelection, needsRemoval] = saveTeXBlock({
            contentState,
            tex,
            type,
            after,
            block
        });
        submitTeX(newContentState, newSelection, needsRemoval);
    }, [block, contentState, setState, state, submitTeX]);
    return (React.createElement("div", { className: `draft-js-modules-katex TEXBLOCK${state.editing ? ' editing' : ''}` },
        state.editing && (React.createElement(TeXInput, { state: state, setState: setState, getCaretPos: getCaretPos, finishEditing: finishEditing })),
        React.createElement(TeX, { state: state, onClick: onClickEdit })));
}
export default TeXBlock;
