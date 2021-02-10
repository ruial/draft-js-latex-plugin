import { EditorState, Modifier } from 'draft-js';
import { insertInlineTeX, insertTeXBlock } from './insertTeX';
export const getHandleKeyCommand = (internals) => (command, editorState, timestamp, store) => {
    if (command === 'insert-texblock') {
        const newEditorState = insertTeXBlock(editorState);
        store.setEditorState(newEditorState);
        return 'handled';
    }
    if (command === 'insert-inlinetex') {
        const newEditorState = insertInlineTeX(editorState);
        store.setEditorState(newEditorState);
        return 'handled';
    }
    if (command.slice(0, 16) === 'update-inlinetex') {
        const dir = command.slice(17, 18);
        const entityKey = command.slice(19);
        internals.setEditingState({ dir, key: entityKey });
        // force re-render
        store.setEditorState(EditorState.forceSelection(editorState, editorState.getSelection()));
        return 'handled';
    }
    if (command.slice(0, 15) === 'update-texblock') {
        const dir = command.slice(16, 17);
        const blockKey = command.slice(18);
        internals.setEditingState({ dir, key: blockKey });
        // force re-render
        store.setEditorState(EditorState.forceSelection(editorState, editorState.getSelection()));
        return 'handled';
    }
    if (command.slice(0, 17) === 'replace-prev-char') {
        const char = command.slice(18);
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const startOffset = selection.getStartOffset();
        const prevCharSelection = selection.merge({
            anchorOffset: startOffset - 1,
            focusOffset: startOffset
        });
        const newContentState = Modifier.replaceText(contentState, prevCharSelection, char);
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        store.setEditorState(newEditorState);
        return 'handled';
    }
    return 'not-handled';
};
