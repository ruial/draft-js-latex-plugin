import { EditorState } from 'draft-js';
import { useCallback, useEffect, useState } from 'react';
export function useTeXUtils(getInitialState, store, internals, key) {
    const [state, _setState] = useState(getInitialState);
    const setState = useCallback((newState) => {
        _setState((state) => ({ ...state, ...newState }));
    }, [_setState]);
    const getCaretPos = useCallback(() => {
        const editingState = internals.getEditingState();
        if (!editingState.dir || editingState.dir === 'l') {
            return state.tex.length;
        }
        return 0;
    }, [internals, state.tex.length]);
    const submitTeX = useCallback((newContentState, newSelection, needsRemoval) => {
        store.setReadOnly(false);
        const newEditorState = EditorState.push(store.getEditorState(), newContentState, needsRemoval ? 'remove-range' : 'update-tex');
        if (newSelection) {
            store.setEditorState(EditorState.forceSelection(newEditorState, newSelection));
            setTimeout(() => store.getEditor().focus(), 5);
        }
        else {
            store.setEditorState(newEditorState);
        }
    }, [store]);
    const startEditing = useCallback((key) => {
        const readOnly = store.getReadOnly();
        if (readOnly || state.editing)
            return;
        setState({ editing: true });
        if (key) {
            internals.setEditingState({ key: '' });
        }
        else {
            internals.setEditingState({ dir: 'l' });
        }
    }, [internals, setState, state.editing, store]);
    const onClickEdit = useCallback(() => {
        startEditing();
    }, [startEditing]);
    useEffect(() => {
        if (state.editing) {
            store.setReadOnly(true);
        }
    }, [state.editing, store]);
    const editingState = internals.getEditingState();
    if (editingState.key === key) {
        startEditing(editingState.key);
    }
    return {
        state,
        setState,
        getCaretPos,
        submitTeX,
        onClickEdit
    };
}
