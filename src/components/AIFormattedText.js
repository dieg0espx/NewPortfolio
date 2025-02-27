import { useState, useEffect } from "react";

export function useTypewriterEffect(text, speed = 30, onComplete) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (!text) {
            setDisplayedText("");
            return;
        }

        let i = 0;
        setDisplayedText(""); // Reset before starting

        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1)); // ✅ Correct slicing
                i++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete(); // ✅ Only call once when finished
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]); 

    return displayedText;
}



export function AIFormattedText({ text, onComplete }) {
    const safeText = text || "";

    // Convert **bold** to <b> tags & preserve line breaks
    const formattedText = safeText
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") 
        .replace(/\n/g, "<br>");

    const animatedText = useTypewriterEffect(formattedText, 30, onComplete);

    return (
        <span 
            className="block text-gray-500 text-center sm:text-[15px] md:text-[25px] p-10 pt-3 italic "
            style={{ textAlign: "center", display: "block" }} 
            dangerouslySetInnerHTML={{ __html: animatedText }}
        />
    );
}

