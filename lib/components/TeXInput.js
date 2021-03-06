import React, { useCallback, useEffect, useRef, useState } from 'react';
const endDelimiter = {
    '{': '}',
    '(': ')',
    '[': ']',
    '|': '|'
};
function indent({ text, start, end }, unindent = false) {
    const nl0 = text.slice(0, start).split('\n').length - 1;
    const nl1 = nl0 + (text.slice(start, end).split('\n').length - 1);
    let newStart = start;
    let newEnd = end;
    const newText = text
        .split('\n')
        .map((line, index) => {
        if (index < nl0 || index > nl1) {
            return line;
        }
        if (!unindent) {
            if (index === nl0) {
                newStart += 2;
            }
            newEnd += 2;
            return `  ${line}`;
        }
        if (line.startsWith('  ')) {
            if (index === nl0) {
                newStart -= 2;
            }
            newEnd -= 2;
            return line.slice(2);
        }
        if (line.startsWith(' ')) {
            if (index === nl0) {
                newStart -= 1;
            }
            newEnd -= 1;
            return line.slice(1);
        }
        return line;
    })
        .join('\n');
    return { text: newText, start: newStart, end: newEnd };
}
function TeXInput({ state, setState, getCaretPos, finishEditing }) {
    const teXInput = useRef(null);
    const [caretPos, setCaretPos] = useState(() => {
        const pos = getCaretPos();
        return { start: pos, end: pos };
    });
    const onChange = useCallback(() => {
        setState({ tex: teXInput.current.value });
    }, [setState]);
    const onSelect = useCallback(() => {
        const { selectionStart: start, selectionEnd: end } = teXInput.current;
        setCaretPos({ start, end });
    }, [setCaretPos]);
    const insertGroupDelimiter = useCallback((startDelimiter) => {
        let value = state.tex;
        let { start, end } = caretPos;
        value = `${value.slice(0, start)}${startDelimiter}${start !== end ? value.slice(start, end) : ''}${endDelimiter[startDelimiter]}${value.slice(end)}`;
        start = end + 1;
        if (start < 0) {
            start = 0;
        }
        else if (start > value.length) {
            start = value.length;
        }
        end = start;
        setState({ tex: value });
        setTimeout(() => setCaretPos({ start, end }), 0);
    }, [caretPos, setCaretPos, setState, state.tex]);
    const onBlur = useCallback(() => finishEditing(true), [finishEditing]);
    const handleKey = useCallback((event) => {
        const key = event.key;
        const { start, end } = caretPos;
        const { tex, type } = state;
        const isCollapsed = start === end;
        const isInline = type === 'INLINETEX';
        if (key === '$') {
            if (isInline) {
                event.preventDefault();
            }
            return;
        }
        if (key === 'Escape') {
            event.preventDefault();
            finishEditing(true);
            return;
        }
        if (key === 'ArrowLeft') {
            const atStart = isCollapsed && end === 0;
            if (atStart) {
                event.preventDefault();
                finishEditing(false);
            }
            return;
        }
        if (key === 'ArrowRight') {
            const atEnd = isCollapsed && start === tex.length;
            if (atEnd) {
                event.preventDefault();
                finishEditing(true);
            }
            return;
        }
        if (endDelimiter.hasOwnProperty(key)) {
            event.preventDefault();
            insertGroupDelimiter(key);
            return;
        }
        if (key === 'Tab') {
            const lines = tex.split('\n');
            if (isInline || lines.length <= 1) {
                event.preventDefault();
                finishEditing(event.shiftKey ? false : true);
                return;
            }
            const { text, start: newStart, end: newEnd } = indent({ text: tex, start, end }, event.shiftKey);
            event.preventDefault();
            setState({ tex: text });
            setTimeout(() => setCaretPos({ start: newStart, end: newEnd }), 0);
        }
    }, [finishEditing, insertGroupDelimiter, caretPos, setCaretPos, setState, state]);
    useEffect(() => {
        setTimeout(() => teXInput.current.focus(), 0);
    }, []);
    useEffect(() => {
        const { start, end } = caretPos;
        teXInput.current.setSelectionRange(start, end);
    }, [caretPos]);
    const teXArray = state.tex.split('\n');
    const rows = teXArray.length;
    const cols = Math.max(1, ...teXArray.map((row) => row.length)) + 2;
    return (React.createElement("textarea", { className: "TeXInput", ref: teXInput, rows: rows, cols: cols, value: state.tex, onBlur: onBlur, onChange: onChange, onSelect: onSelect, onKeyDown: handleKey }));
}
export default TeXInput;
