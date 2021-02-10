import React, { useCallback } from 'react';
import { saveInlineTeX } from '../modifiers/saveTeX';
import { useTeXUtils } from '../utils/useTeXUtils';
import TeX from './TeX';
import TeXInput from './TeXInput';
const getInitialState = (contentState, entityKey) => {
    const entity = contentState.getEntity(entityKey);
    const { tex, type } = entity.getData();
    return {
        editing: tex.length === 0,
        tex,
        type
    };
};
function InlineTeX({ children, contentState, entityKey, offsetKey, store, internals }) {
    const { state, setState, getCaretPos, submitTeX, onClickEdit } = useTeXUtils(getInitialState.bind(null, contentState, entityKey), store, internals, entityKey);
    const finishEditing = useCallback((after) => {
        setState({ editing: false });
        const { tex, type } = state;
        const blockKey = offsetKey.split('-')[0];
        const startPos = React.Children.toArray(children)[0].props.start;
        const [newContentState, newSelection, needsRemoval] = saveInlineTeX({
            contentState,
            tex,
            type,
            after,
            blockKey,
            entityKey,
            startPos
        });
        submitTeX(newContentState, newSelection, needsRemoval);
    }, [children, contentState, entityKey, offsetKey, setState, state, submitTeX]);
    return (React.createElement("span", { className: `draft-js-modules-katex INLINETEX${state.editing ? ' editing' : ''}` },
        state.editing && (React.createElement(TeXInput, { state: state, setState: setState, getCaretPos: getCaretPos, finishEditing: finishEditing })),
        React.createElement(TeX, { state: state, onClick: onClickEdit, "data-offset-key": offsetKey })));
}
export default InlineTeX;
