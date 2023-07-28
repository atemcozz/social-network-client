import {useEffect, useState} from "react";
import {Editor} from "../Editor";
import {useForceUpdate} from "./useForceUpdate";

const useEditor = (options) => {
    const [editor, setEditor] = useState(null);
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        const instance = new Editor(options);
        setEditor(instance);
        //force update hack in order to avoid implementing editor as react component
        instance.on("update", () => {
            forceUpdate();
        })
    }, [])
    return editor;
};

export default useEditor;
