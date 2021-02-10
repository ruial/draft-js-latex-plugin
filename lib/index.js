import { getInlineTeXDecorator } from './decorator';
import { getBlockRendererFn, getHandleKeyCommand, keyBindingFn } from './utils';
import { getInternals } from './utils/getInternals';
export function getLaTeXPlugin(config = {}) {
    const internals = getInternals(config);
    const store = {};
    const inlineTeXDecorator = getInlineTeXDecorator(config, {
        store: store,
        internals
    });
    const decorators = [inlineTeXDecorator];
    const blockRendererFn = getBlockRendererFn(internals);
    const handleKeyCommand = getHandleKeyCommand(internals);
    function initialize(editorStore) {
        Object.assign(store, editorStore);
    }
    return {
        initialize,
        decorators,
        blockRendererFn,
        handleKeyCommand,
        keyBindingFn
    };
}
