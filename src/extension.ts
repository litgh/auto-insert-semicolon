'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.auto-insert-semicolon', (editor, textEdit) => {
        return semicolonCommand(editor, textEdit);
    }));
}

export function deactivate() {
}

function semicolonCommand(textEditor, textEditorEdit) {
    const line = textEditor.document.lineAt(textEditor.selection.active);

    if (line.text[line.text.length - 1] !== ';') {
        textEditorEdit.insert(line.range.end, ';');
    }

    let position = new vscode.Position(line.lineNumber, line.range.end.character);
    textEditor.selection = new vscode.Selection(position, position);
}