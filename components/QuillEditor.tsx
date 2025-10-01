// components/QuillEditor.tsx
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      const Quill = require("quill");
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
          ],
        },
      });

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });

      // Set the initial value
      quill.root.innerHTML = value;
    }
  }, [value, onChange]);

  return <div ref={editorRef} className="quill-editor" />;
};

export default QuillEditor;
