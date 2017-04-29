import { Position, Range, TextDocument } from 'vscode-languageserver-types';
import { Event, Disposable } from '../../application/common';

export {
    Position, Range, TextDocument
}

export const TextEditorProvider = Symbol('TextEditorProvider');

export interface TextEditorProvider {
    get(uri: string): Promise<TextEditor>;
}

export interface TextEditor extends Disposable {
    readonly node: HTMLElement;
    readonly document: TextDocument;

    cursor: Position;
    readonly onCursorPositionChanged: Event<Position>;

    selection: Range;
    readonly onSelectionChanged: Event<Range>;

    focus(): void;
    blur(): void;
    isFocused(): boolean;
    readonly onFocusChanged: Event<boolean>;

    revealPosition(position: Position): void;
    revealRange(range: Range): void;

    /**
     * Rerender the editor.
     */
    refresh(): void;
    /**
     * Resize the editor to fit its node.
     */
    resizeToFit(): void;
    setSize(size: Dimension): void;
}

export interface Dimension {
    width: number;
    height: number;
}