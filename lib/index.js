import { getInlineTeXDecorator } from './decorator';
import { getBlockRendererFn, getHandleKeyCommand, keyBindingFn } from './utils';
import { getInternals } from './utils/getInternals';
export function getKaTeXModule(config = {}) {
    const internals = getInternals(config);
    const store = {};
    const inlineTeXDecorator = getInlineTeXDecorator(config, {
        store: store,
        internals
    });
    const decorators = [inlineTeXDecorator];
    const blockRendererFn = getBlockRendererFn(internals);
    const handleKeyCommand = getHandleKeyCommand(internals);
    function init(editorStore) {
        Object.assign(store, editorStore);
    }
    return {
        init,
        decorators,
        blockRendererFn,
        handleKeyCommand,
        keyBindingFn
    };
}
