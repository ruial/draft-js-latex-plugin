import { inlineTeXStrategy } from './strategy';
import InlineTeX from '../components/InlineTeX';
export function getInlineTeXDecorator(config, props) {
    return {
        strategy: inlineTeXStrategy,
        component: InlineTeX,
        props
    };
}
