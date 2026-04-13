import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { EditorState } from "lexical";
import theme from "./EditorTheme";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import ImagePlugin from "./Plugins/ImagePlugin";
import { ImageNode } from "./Nodes/ImageNode";
import "./editor.css";

const editorConfig = {
  namespace: "BlogEditor",
  theme,
  onError(error: Error) {
    console.error(error);
  },
  nodes: [ImageNode, ListNode, ListItemNode, LinkNode],
};

interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LexicalEditor({ value, onChange }: LexicalEditorProps) {
  const initialConfig = {
    ...editorConfig,
    editorState: value && value.startsWith("{") ? value : undefined,
  };

  const handleOnChange = (editorState: EditorState) => {
    const jsonString = JSON.stringify(editorState.toJSON());
    onChange(jsonString);
  };

  return (
    <div className="relative border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative min-h-[300px]">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[300px] p-4 outline-none editor-content" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">
                Start writing your blog post...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagePlugin />
          <OnChangePlugin onChange={handleOnChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}
